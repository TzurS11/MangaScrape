import { BATOTO_OPTIONS, Chapter } from "../types";
import {
  arrayFixer,
  capitalizeEveryWord,
  getBaseURL,
  isMature,
} from "../utils";
import { fetchHTML, querySelectorAllRegex } from "../../../utils";
import { Status } from "./searchTypes";

type GetByID = {
  genres: string[];
  score: number;
  status: Status;
  id: string;
  chapters: Chapter[];
  description: string;
  mature: boolean;
  languages: {
    original: string;
    translated: string;
  };
  readDirection?: string;
  poster: string;
  authors: string[];
  artists: string[];
  title: { original: string; alt: string[] };
};

export default async function id(
  id: string,
  options?: BATOTO_OPTIONS
): Promise<GetByID> {
  const document = await fetchHTML(
    getBaseURL(options) + "/title/" + id,
    options
  );

  let data = JSON.parse(
    document.querySelector('[prefix="r20"]').getAttribute("props")
  ).data[1];
  const mangaID = (data.urlPath[1] as string).split("/")[2];
  const title = {
    original: (data.name[1] as string) || "",
    alt: arrayFixer(JSON.parse(data.altNames[1])),
  };
  const authors = arrayFixer(JSON.parse(data.authors[1]));
  const artists = arrayFixer(JSON.parse(data.artists[1]));
  let genres = arrayFixer(JSON.parse(data.genres[1]));
  genres = genres.map((genre) => capitalizeEveryWord(genre.replace(/_/g, " ")));
  const status = data.originalStatus[1];
  let readDirection: string = data.readDirection[1];
  switch (readDirection) {
    case "ltr":
      readDirection = "Left to Right";
      break;
    case "rtl":
      readDirection = "Right to Left";
      break;
    case "ttb":
      readDirection = "Top to Bottom";
      break;
    default:
      readDirection = undefined;
      break;
  }
  let description = data.summary[1].text[1];
  const poster = data.urlCoverOri[1];
  const score = data.stat_score_avg[1];

  let chaptersArray: Chapter[] = [];
  let chaptersDivs = querySelectorAllRegex(
    document.querySelector(
      "#app-wrapper > main > div:nth-child(3) > astro-island > div > div:nth-child(2) > div.scrollable-panel.border-base-300\\/50.border.border-r-2.max-h-\\[380px\\].lg\\:max-h-\\[500px\\] > div"
    ) as Element,
    "data-hk",
    /0-0-\d*-0/
  );

  for (let i = 0; i < chaptersDivs.length; i++) {
    let currentChapter = chaptersDivs[i];
    let chapter = currentChapter
      .getElementsByClassName("link-hover link-primary visited:text-accent")
      .item(0);
    if (chapter != null) {
      const chapterTime = currentChapter
        .getElementsByTagName("time")
        .item(0)
        .getAttribute("time");
      const timestamp = new Date(chapterTime).getTime();
      const id = (chapter as HTMLAnchorElement).href
        .replace("/title/", "")
        .split("/")[1]
        .split("-")[0];
      chaptersArray.push({
        title: chapter.innerHTML as string,
        id,
        timestamp: timestamp,
      });
    }
  }

  const languages = {
    original: (data.origLang[1] as string) || "",
    translated: (data.tranLang[1] as string) || "",
  };

  return {
    id: (mangaID as string) || "",
    title: title,
    languages: languages,
    description: (description as string) || "",
    authors: authors,
    artists: artists,
    poster: (poster as string) || "",
    genres: genres,
    score: (score as number) || 0,
    status: status as Status,
    readDirection: (readDirection as string) || "",
    mature: isMature(genres),
    chapters: chaptersArray,
  };
}

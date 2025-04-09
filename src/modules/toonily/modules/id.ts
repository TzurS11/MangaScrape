import { fetchHTML, findElementByText } from "../../../utils";
import { TOONLY_OPTIONS } from "../types";

type GetByID = {
  id: string;
  title: { original: string; alt: string[] };
  poster: string;
  authors: string[];
  artists: string[];
  genres: string[];
  rating: { count: string; average: number };
  views: string;
  publisher: string;
  status: Status;
  description?: string;
  chapters: Chapter[];
};

type Chapter = {
  title: string;
  id: string;
  date: string;
};

type Status = "OnGoing" | "Completed" | "Hiatus";

export default async function getByID(
  id: string,
  options?: TOONLY_OPTIONS
): Promise<GetByID> {
  const document = await fetchHTML(
    `https://toonily.com/serie/${id}`,
    options?.proxy
  );
  const body = document.body;

  const title = body
    .querySelector(".post-title > h1")
    .innerHTML.split("<")[0]
    .trim();
  //   console.log(title);
  const mangaInfoRow = body.querySelector(".manga-info-row");
  const altTitles = findElementByText(mangaInfoRow, "Alt Name(s)")
    .textContent.replace("Alt Name(s)", "")
    .split(/\/|,/g)
    .map((x) => x.trim());
  const poster = body
    .querySelector(".summary_image>a>img")
    .getAttribute("data-src")
    .replace(/-\d*x\d*/g, "");
  const authors = findElementByText(mangaInfoRow, "Author(s)")
    .textContent.replace("Author(s)", "")
    .split(",")
    .map((x) => x.trim());
  const artists = findElementByText(mangaInfoRow, "Artist(s)")
    .textContent.replace("Artist(s)", "")
    .split(",")
    .map((x) => x.trim());

  const genres = findElementByText(mangaInfoRow, "Genre(s)")
    .textContent.replace("Genre(s)", "")
    .split(",")
    .map((x) => x.trim());
  // console.log(genres);

  const ratingAverage = Number(body.querySelector("#averagerate").textContent);
  const ratingCount = body.querySelector("#countrate").textContent;
  const views = body
    .querySelector(".item > .icon.ion-md-eye")
    .parentElement.textContent.trim();

  const postStatus = body.querySelector(".post-status");
  const publisher = findElementByText(
    postStatus,
    "Published By"
  ).textContent.replace(/\n|\t|Published By/g, "");
  const status = findElementByText(postStatus, "Status")
    .textContent.replace("Status", "")
    .trim() as Status;

  const descriptionElement = body.querySelector(".summary__content > p");
  const description = descriptionElement
    ? descriptionElement.textContent
    : undefined;

  const chapArr: Chapter[] = [];
  const chapters = Array.from(body.querySelectorAll(".wp-manga-chapter"));

  for (const chapter of chapters) {
    const title = chapter.querySelector("a").textContent.replace(/\n|\t/g, "");
    const id = chapter.querySelector("a").getAttribute("href").split("/")[5];
    const date = chapter
      .querySelector(".chapter-release-date")
      .textContent.replace(/\n|\t/g, "");
    chapArr.push({ title, id, date });
  }

  return {
    id,
    title: { original: title, alt: altTitles },
    poster,
    authors,
    artists,
    genres,
    rating: { count: ratingCount, average: ratingAverage },
    views,
    publisher,
    status,
    description,
    chapters: chapArr.reverse(),
  };
}

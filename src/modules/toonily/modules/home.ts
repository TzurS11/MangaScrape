import { fetchHTML } from "../../../utils";
import { TOONLY_OPTIONS } from "../types";
export type HomeOptions = {
  offset?: number;
  mature?: boolean;
};
export default async function home(
  options: HomeOptions = {},
  base_options?: TOONLY_OPTIONS
): Promise<Home> {
  let url = `https://toonily.com`;
  const offset = options.offset || 1;
  offset == 1 ? (url += "") : (url += `/page/${offset}`);
  const reqHeaders: Record<string, string> = {};
  if (options.mature) {
    reqHeaders["Cookie"] = "toonily-mature=1";
  }
  const document = await fetchHTML(url, base_options.proxy, reqHeaders);

  const body = document.body;

  const latestDivs = Array.from(
    body.querySelectorAll(".page-item-detail.manga")
  );

  const latestManga = latestDivs.map((div) => {
    const poster = div
      .querySelector(".item-thumb.c-image-hover > a > img")
      .getAttribute("data-src")
      .replace(/-\d*x\d*/g, "");
    const title = div.querySelector(
      ".item-summary > .post-title.font-title > h3 > a"
    );
    const id = title.getAttribute("href").split("/")[4];
    const rating = Number(
      div.querySelector(
        ".item-summary > .manga-rate-view-comment > .item > span > span > #averagerate"
      ).textContent
    );

    const views = div.querySelector(
      ".item-summary > .manga-rate-view-comment > .item > .icon.ion-md-eye"
    ).parentElement.textContent;

    const chapters = Array.from(div.querySelectorAll(".chapter-item"));
    const chaptersArr = chapters.map((chapter) => {
      const title = chapter.querySelector(".btn-link");
      const upload = chapter.querySelector(".post-on.font-meta");
      return {
        title: title.textContent.trim(),
        id: title.getAttribute("href").split("/")[5],
        upload:
          upload.textContent.trim() == "UP"
            ? undefined
            : upload.textContent.trim(),
      };
    });

    return {
      poster,
      title: title.textContent,
      id,
      rating,
      views,
      lastChapters: chaptersArr,
    };
  });

  const newDivs = Array.from(body.querySelectorAll(".css-m4pt1b > ul > li"));
  const newManga: NewManga[] = newDivs.map((div) => {
    const poster = div.querySelector("img");
    const title = div.querySelector(".txt > span");
    const anchor = div.querySelector("a");
    const id = anchor.getAttribute("href").split("/")[4];
    return {
      poster: poster.getAttribute("src").replace(/-\d*x\d*/g, ""),
      title: title.textContent,
      id,
    };
  });
  return { latest: latestManga, new: newManga } as Home;
}

type NewManga = {
  title: string;
  poster: string;
  id: string;
};

type Home = { latest: LatestManga[]; new: NewManga[] };

type LatestManga = {
  poster: string;
  title: string;
  id: string;
  rating: number;
  views: string;
  lastChapters: {
    title: string;
    id: string;
    upload: string | undefined;
  }[];
};

import { fetchHTML } from "../../../utils";
import { MANGABUDDY_OPTIONS, MangaDetailed } from "../types";

export default async function id(id: string, options?: MANGABUDDY_OPTIONS) {
  const document = await fetchHTML(
    "https://mangabuddy.com/" + id,
    options?.proxy
  );
  const body = document.body;

  const box404 = body.querySelector(".box-404");
  if (box404) {
    throw new Error("Manga not found");
  }

  const titleWrapper = body.querySelector(".name.box");
  const originalTitle = body.querySelector("h1")?.textContent || "";
  const altTitles =
    titleWrapper?.querySelector("h2")?.textContent?.split(",") || [];
  const poster =
    body.querySelector(".img-cover > img")?.getAttribute("data-src") || "";

  const infoWrapper = body.querySelector(
    ".meta.box.mt-1.p-10"
  ) as HTMLDivElement;

  const authorsList: { id: string; name: string }[] = [];
  const authorsElement =
    (Array.from(infoWrapper.querySelectorAll("strong"))
      .find((el) => el.textContent === "Authors :")
      ?.parentElement?.querySelectorAll(
        "a"
      ) as NodeListOf<HTMLAnchorElement>) || [];

  authorsElement.forEach((author) => {
    if (author) {
      const authorId = author.href.split("/")[2];
      const authorName = author.title.replace(/\n/g, " ").replace(/\s\s/g, " ");
      authorsList.push({
        id: authorId,
        name: authorName,
      });
    }
  });

  const lastUpdateElement = Array.from(infoWrapper.querySelectorAll("strong"))
    .find((el) => el.textContent === "Last update: ")
    ?.parentElement?.querySelector("span");
  const lastUpdate = lastUpdateElement?.textContent || "";

  const statusElement = Array.from(infoWrapper.querySelectorAll("strong"))
    .find((el) => el.textContent === "Status :")
    ?.parentElement?.querySelector("a") as HTMLAnchorElement;
  const status = statusElement ? statusElement.href.split("/")[2] : "";

  const genres =
    (Array.from(infoWrapper.querySelectorAll("strong"))
      .find((el) => el.textContent === "Genres :")
      ?.parentElement?.querySelectorAll(
        "a"
      ) as NodeListOf<HTMLAnchorElement>) || [];

  const genresList: { id: string; name: string }[] = [];
  genres.forEach((genre) => {
    if (genre) {
      const genreId = genre.href.split("/")[2];
      const genreName = genreId.replace(/-/g, " ");
      const capitalizedGenreName =
        genreName.charAt(0).toUpperCase() + genreName.slice(1);
      genresList.push({ id: genreId, name: capitalizedGenreName });
    }
  });

  const description =
    document
      .querySelector(
        "body > div.layout > div.main-container.book-details > div > div.row.no-gutters > div.col-70.container__left > div.mt-1 > div:nth-child(5) > div.tab-content.mt-2 > div.tab-panel.active > div > p.content"
      )
      ?.textContent?.trim() || "";

  const chapterListWrapper = body.querySelector(
    ".chapter-list"
  ) as HTMLDivElement;

  const chatperList: { id: string; title: string; update: string }[] = [];
  const chapters = Array.from(chapterListWrapper.querySelectorAll("li"));
  chapters.forEach((chapter) => {
    const chapterElement = chapter.querySelector("a");
    const chapterId = chapterElement?.href.split("/")[2] || "";
    const chapterTitle =
      chapterElement?.querySelector(".chapter-title")?.textContent || "";
    const chapterUpdate =
      chapter.querySelector(".chapter-update")?.textContent || "";
    chatperList.push({
      id: chapterId,
      title: chapterTitle,
      update: chapterUpdate,
    });
  });

  return {
    id,
    title: {
      original: originalTitle,
      alt: altTitles,
    },
    poster,
    authors: authorsList,
    status,
    genres: genresList,
    lastUpdate,
    description,
    chapters: chatperList.reverse(),
  } as MangaDetailed;
}

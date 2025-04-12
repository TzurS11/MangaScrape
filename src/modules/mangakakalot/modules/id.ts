import { fetchHTML, findElementByText } from "../../../utils";
import { MANGAKAKALOT_OPTIONS, Mangakakalot_sources } from "../types";
import { idToLink } from "../utils";

type Manga = {
  poster: string;
  id: string;
  title: { original: string; alts: string[] };
  authors: string[];
  status: string;
  genres: string[];
  lastUpdate: string;
  rating: number;
  chapters: {
    title: string;
    id: string;
    update: string;
    views: string;
  }[];
  source: Mangakakalot_sources;
  description: string;
};

export default async function id(
  id: string,
  source: Mangakakalot_sources = "mangakakalot",
  options?: MANGAKAKALOT_OPTIONS
): Promise<Manga> {
  if (source === "mangakakalot") return handleMangaKakalot(id, options);
  if (source === "chapmanganato") return handleChapMangaNato(id, options);
}

async function handleMangaKakalot(
  id: string,
  options?: MANGAKAKALOT_OPTIONS
): Promise<Manga> {
  const document = await fetchHTML(idToLink(id, "mangakakalot"), options);
  const body = document.body;
  const poster = body.querySelector(".manga-info-pic > img");
  const altTitles = body
    .querySelector(".story-alternative")
    .textContent.replace("Alternative : ", "")
    .split(";")
    .map((x) => x.trim());

  const infoContainer = body.querySelector(".manga-info-text");
  const authors = findElementByText(infoContainer, "Author(s) :");
  const authorsArr = authors.textContent
    .replace("Author(s) :", "")
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x !== "");

  const status = findElementByText(infoContainer, "Status :")
    .textContent.replace("Status :", "")
    .trim();

  const lastUpdate = findElementByText(infoContainer, "Last updated :")
    .textContent.replace("Last updated :", "")
    .trim();

  const genres = findElementByText(infoContainer, "Genres :");

  const genresArr = genres.textContent
    .replace("Genres :", "")
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x !== "");

  const rating = Number(
    findElementByText(infoContainer, "Mangakakalot.com rate :")
      .textContent.replace("Mangakakalot.com rate :", "")
      .split("/")[0]
      .trim()
  );

  const descriptionWrapper = body.querySelector("#noidungm").textContent;
  const description = descriptionWrapper
    .replace(`${poster.getAttribute("alt")} summary:`, "")
    .trim();

  const chaptersWrapper = Array.from(
    body.querySelectorAll(".chapter-list > .row")
  );
  const chaptersArr: {
    title: string;
    id: string;
    update: string;
    views: string;
  }[] = [];
  for (const chapter of chaptersWrapper) {
    const anchor = chapter.querySelector("a");
    const views = anchor.parentElement.nextElementSibling.textContent;
    const update =
      anchor.parentElement.nextElementSibling.nextElementSibling.textContent;
    chaptersArr.push({
      title: anchor.textContent,
      id: anchor.getAttribute("href").split("/")[5],
      update,
      views,
    });
  }

  return {
    id,
    source: "mangakakalot",
    poster: poster.getAttribute("src"),
    title: {
      original: poster.getAttribute("alt"),
      alts: altTitles,
    },
    authors: authorsArr,
    status,
    lastUpdate,
    genres: genresArr,
    rating,
    chapters: chaptersArr.reverse(),
    description,
  };
}

async function handleChapMangaNato(
  id: string,
  options?: MANGAKAKALOT_OPTIONS
): Promise<Manga> {
  const document = await fetchHTML(idToLink(id, "chapmanganato"), options);
  const body = document.body;
  const poster = body
    .querySelector(".info-image > .img-loading")
    .getAttribute("src");
  const title = body.querySelector(".story-info-right > h1").textContent;
  const altLabel = body.querySelector(".info-alternative");
  const altWrapper = altLabel.parentElement.parentElement;
  const alt = altWrapper
    .querySelector("h2")
    .textContent.split(";")
    .map((x) => x.trim());

  const authorsLabel = body.querySelector(".info-author");
  const authorsWrapper = authorsLabel.parentElement.parentElement;
  const authors = Array.from(authorsWrapper.querySelectorAll(`a`));
  const authorsArr: string[] = [];
  for (const author of authors) {
    authorsArr.push(author.textContent);
  }

  const statusLabel = body.querySelector(".info-status");
  const statusWrapper = statusLabel.parentElement.parentElement;
  const status = statusWrapper.querySelector(".table-value").textContent;

  const genresLabel = body.querySelector(".info-genres");
  const genresWrapper = genresLabel.parentElement.parentElement;
  const genres = Array.from(genresWrapper.querySelectorAll(`a`));
  const genresArr: string[] = [];
  for (const genre of genres) {
    genresArr.push(genre.textContent);
  }

  const updateLabel = body.querySelector(".info-time");
  const updateWrapper = updateLabel.parentElement.parentElement;
  const update = updateWrapper.querySelector(".stre-value").textContent;

  const rating = Number(
    body.querySelector(`em[property="v:average"]`).textContent
  );

  const chaptersWrapper = body.querySelector(".row-content-chapter");
  const chapters = Array.from(
    chaptersWrapper.querySelectorAll(`li[class="a-h"]`)
  );
  const chaptersArr: {
    title: string;
    id: string;
    update: string;
    views: string;
  }[] = [];
  for (const chapter of chapters) {
    const chatperAnchor = chapter.querySelector(`.chapter-name.text-nowrap`);
    const views = chapter.querySelector(
      `.chapter-view.text-nowrap`
    ).textContent;
    const update = chapter.querySelector(
      `.chapter-time.text-nowrap.fn-cover-item-time`
    ).textContent;
    chaptersArr.push({
      title: chatperAnchor.textContent,
      id: chatperAnchor.getAttribute("href").split("/")[4],
      update,
      views,
    });
  }
  const descriptionWrapper = document.getElementById(
    "panel-story-info-description"
  );
  const description = descriptionWrapper.textContent
    .replace(/Description :/g, "")
    .trim();
  return {
    poster,
    id,
    source: "chapmanganato",
    title: { original: title, alts: alt },
    authors: authorsArr,
    status,
    genres: genresArr,
    lastUpdate: update,
    rating,
    chapters: chaptersArr.reverse(),
    description,
  };
}

import { fetchHTML } from "../../../utils";
import { MANGAKAKALOT_OPTIONS, Mangakakalot_sources } from "../types";
import { idToLink } from "../utils";

export default async function chapter(
  mangaID: string,
  chapterID: string,
  source: Mangakakalot_sources,
  options?: MANGAKAKALOT_OPTIONS
) {
  let link = idToLink(mangaID, source) + `/${chapterID}`;

  if (source == "mangakakalot") link = link.replace("/manga/", "/chapter/");

  const document = await fetchHTML(link, options?.proxy);

  const body = document.body;

  const pages = Array.from(
    body.querySelectorAll(".container-chapter-reader > img")
  ).map((x) => x.getAttribute("src") as string);
  return pages;
}

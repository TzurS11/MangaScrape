import { Manga } from "./types";

export function scrapeItems(body: HTMLElement): Manga[] {
  const items = Array.from(
    body.getElementsByClassName("book-detailed-item")
  ) as HTMLDivElement[];
  return items.map((item) => {
    const img = item.querySelector(".thumb>a>img");
    const poster = img?.getAttribute("data-src") || "";
    const title = img?.getAttribute("alt") || img?.getAttribute("title") || "";
    const id =
      item.querySelector(".thumb>a")?.getAttribute("href")?.split("/")[1] || "";
    const genres = Array.from(item.querySelectorAll(".genres>span"))
      .map((ele) => ele.textContent || "")
      .filter((ele) => ele !== "");
    const description = item.querySelector(".summary > p")?.textContent || "";
    const score = Number(item.querySelector(".score")?.textContent) || NaN;
    return { poster, id, title, genres, description, score };
  });
}

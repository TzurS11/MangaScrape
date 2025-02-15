import { fetchHTML, findElementByText } from "../../../utils";
import { MANGAKAKALOT_OPTIONS } from "../types";
import { linkToID } from "../utils";

export default async function search(
  query: string,
  options?: MANGAKAKALOT_OPTIONS
) {
  const sanitizedQuery = query
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, ""); // Also removes leading/trailing underscores

  const document = await fetchHTML(
    "https://mangakakalot.com/search/story/" + sanitizedQuery,
    options?.proxy
  );
  const body = document.body;
  const resultsWrapper = Array.from(body.querySelectorAll(".story_item"));

  const results: any[] = [];

  resultsWrapper.forEach((result) => {
    const title = result.querySelector("img").getAttribute("alt");
    const link = result.querySelector("a").getAttribute("href");
    const poster = result.querySelector("img").getAttribute("src");
    const id = linkToID(link);

    const chapters = Array.from(result.querySelectorAll(".story_chapter > a"));

    const chaptersArr: any[] = [];
    chapters.forEach((chapter) => {
      if (chapter.textContent.trim() != "") {
        chaptersArr.push({
          title: chapter.textContent.trim(),
          id:
            chapter.getAttribute("href").split("/")[5] ||
            chapter.getAttribute("href").split("/")[4],
        });
      }
    });
    const rightInfoContainer = result.querySelector(".story_item_right");

    const authors = findElementByText(rightInfoContainer, "Author(s) : ")
      .textContent.replace("Author(s) : ", "")
      .trim();
    const lastUpdate = findElementByText(rightInfoContainer, "Updated :")
      .textContent.replace("Updated :", "")
      .trim();
    const views = findElementByText(rightInfoContainer, "View : ")
      .textContent.replace("View :", "")
      .trim();

    results.push({
      title,
      authors,
      id: id[0],
      source: id[1],
      poster,
      lastUpdate,
      views,
      lastChapters: chaptersArr,
    });
  });
  return results;
}

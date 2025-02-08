import { fetchHTML } from "../../../utils";
import { MANGABUDDY_OPTIONS } from "../types";
import { scrapeItems } from "../utils";

export default async function search(
  query: string,
  options?: MANGABUDDY_OPTIONS
) {
  const document = await fetchHTML(
    `https://mangabuddy.com/search?q=${query}`,
    options?.proxy
  );
  const body = document.body;
  const searchResults = scrapeItems(body);
  return searchResults;
}

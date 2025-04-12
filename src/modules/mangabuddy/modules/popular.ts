import { fetchHTML } from "../../../utils";
import { MANGABUDDY_OPTIONS } from "../types";
import { scrapeItems } from "../utils";

export default async function popular(options?: MANGABUDDY_OPTIONS) {
  const document = await fetchHTML("https://mangabuddy.com/popular", options);
  const body = document.body;
  const populars = scrapeItems(body);
  return populars;
}

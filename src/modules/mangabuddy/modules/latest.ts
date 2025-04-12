import { fetchHTML } from "../../../utils";
import { MANGABUDDY_OPTIONS } from "../types";
import { scrapeItems } from "../utils";

export default async function latest(options?: MANGABUDDY_OPTIONS) {
  const document = await fetchHTML("https://mangabuddy.com/latest", options);
  const body = document.body;
  const latests = scrapeItems(body);
  return latests;
}

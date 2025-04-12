import { fetchHTML } from "../../../utils";
import { MANGABUDDY_OPTIONS } from "../types";
import { scrapeItems } from "../utils";

export type StatusOptions = "Ongoing" | "Completed";

export default async function status(
  options: StatusOptions,
  baseOptions?: MANGABUDDY_OPTIONS
) {
  const document = await fetchHTML(
    `https://mangabuddy.com/status/${options}`,
    baseOptions
  );
  const body = document.body;

  const statuses = scrapeItems(body);
  return statuses;
}

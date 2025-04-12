import { fetchHTML } from "../../../utils";
import { MANGABUDDY_OPTIONS } from "../types";
import id from "./id";

export default async function chapter(
  mangaID: string,
  chatperID: string,
  options?: MANGABUDDY_OPTIONS
) {
  const document = await fetchHTML(
    `https://mangabuddy.com/${mangaID}/${chatperID}`,
    options
  );
  const body = document.body;

  const scriptTag = Array.from(body.querySelectorAll("script")).find((script) =>
    script.textContent?.includes("chapImages")
  );

  if (!scriptTag) {
    throw new Error("Script tag with chapImages not found");
  }

  const scriptContent = scriptTag.textContent || "";

  const chapImages = scriptContent
    .trim()
    .split(" ")[3]
    .replace(/'/g, "")
    .split(",");

  return chapImages;
}

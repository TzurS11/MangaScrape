import { Mangakakalot_sources } from "./types";

export function linkToID(link: string): [string, Mangakakalot_sources] {
  if (link.includes("mangakakalot.com")) {
    const id = link.split("/")[4];
    return [id, "mangakakalot"];
  }
  if (link.includes("chapmanganato.to")) {
    const id = link.split("/")[3].split("-")[1];
    return [id, "chapmanganato"];
  }
  return ["", undefined];
}

export function idToLink(id: string, source: Mangakakalot_sources): string {
  if (source === "mangakakalot") {
    return `https://mangakakalot.com/manga/${id}`;
  }
  if (source === "chapmanganato") {
    return `https://chapmanganato.to/manga-${id}`;
  }
  return "";
}

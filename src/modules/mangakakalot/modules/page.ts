import { MANGAKAKALOT_OPTIONS, Mangakakalot_sources } from "../types";
import axios from "axios";

function sourceToURL(source: Mangakakalot_sources) {
  switch (source) {
    case "mangakakalot":
      return "https://mangakakalot.com/";
    case "chapmanganato":
      return "https://chapmanganato.to/";
  }
}

export default async function page(
  url: string,
  source: Mangakakalot_sources,
  options?: MANGAKAKALOT_OPTIONS
): Promise<Buffer> {
  const response = await axios({
    method: "GET",
    url: url,
    headers: {
      accept:
        "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua": '"Opera";v="116", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "image",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-site": "cross-site",
      referer: sourceToURL(source),
    },
    responseType: "arraybuffer",
    proxy:
      options?.proxy?.host && options.proxy.port ? options.proxy : undefined,
  });

  return Buffer.from(response.data as ArrayBuffer);
}

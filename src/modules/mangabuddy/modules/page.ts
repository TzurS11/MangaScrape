import axios from "axios";
import { MANGABUDDY_OPTIONS } from "../types";

export default async function page(
  url: string,
  options: MANGABUDDY_OPTIONS
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
      referer: "https://mangabuddy.com/",
    },
    responseType: "arraybuffer",
    proxy:
      options?.proxy?.host && options.proxy.port ? options.proxy : undefined,
  });

  return Buffer.from(response.data as ArrayBuffer);
}

import { url } from "inspector";
import { BATOTO_OPTIONS, Metadata } from "../types";
import { getBaseURL, isMature } from "../utils";
import {
  ArtworkStyle,
  ContentTag,
  Order,
  OrderMap,
  ArtworkStyleMap,
  ContentTagMap,
  ExplicitContent,
  ExplicitContentMap,
  Theme,
  ThemeMap,
  Genre,
  handleGenres,
  Languages,
  handleLanguages,
  Status,
  StatusMap,
} from "./searchTypes";
import { buildUrl, fetchHTML, querySelectorAllRegex } from "../../../utils";

export type SearchFilters = {
  query?: string;
  order?: Order;
  page?: number;
  genres?: { include?: Genre; exclude?: Genre };
  languages?: {
    original?: Languages[];
    translated?: Languages[];
  };
  OriginalWorkStatus?: Status;
  BatoUploadStatus?: Status;
};

type Results = {
  poster: string;
  title: string;
  id: string;
  genres: string[];
  mature: boolean;
  lastChapter: { title: string; id: string };
};

type Search = {
  results: Results[];
  metadata: Metadata;
};

export default async function search(
  filters?: SearchFilters,
  options?: BATOTO_OPTIONS
): Promise<Search> {
  const baseURL = getBaseURL(options) + "/v3x-search";
  const urlParams: Record<string, string> = {};
  if (filters?.query) urlParams.word = filters.query;
  if (filters?.order) urlParams.sort = OrderMap[filters.order];
  if (filters?.page) urlParams.page = filters.page.toString();
  const genres = handleGenres(filters?.genres);
  if (genres) urlParams.genres = genres;
  const originalLanguages = handleLanguages(filters?.languages?.original);
  if (originalLanguages) urlParams.orig = originalLanguages;
  const translatedLanguages = handleLanguages(filters?.languages?.translated);
  if (translatedLanguages) urlParams.lang = translatedLanguages;
  if (filters?.OriginalWorkStatus)
    urlParams.status = StatusMap[filters.OriginalWorkStatus];
  if (filters?.BatoUploadStatus)
    urlParams.status = StatusMap[filters.BatoUploadStatus];

  const url = buildUrl(baseURL, urlParams);
  const document = await fetchHTML(url, options?.proxy);
  const body = document.body;

  let results: Results[] = [];

  const latestReleasesWrapper = document.querySelector(
    "#app-wrapper > main > div.grid.grid-cols-1.gap-5.border-t.border-t-base-200.pt-5"
  ) as HTMLDivElement;

  const latestReleasesDivs = querySelectorAllRegex(
    latestReleasesWrapper,
    "data-hk",
    /0-0-3-\d*-0/
  );

  latestReleasesDivs.forEach((currentDiv) => {
    const currentDiv_img = currentDiv.querySelector("img");
    if (!currentDiv_img) return;

    const parent_currentDiv_img =
      currentDiv_img.parentElement as HTMLAnchorElement;
    const lastChapterAnchor = currentDiv.querySelector(
      ".link-hover.link-primary.visited\\:link-accent"
    ) as HTMLAnchorElement;
    const lastChapterText =
      lastChapterAnchor?.querySelector("span")?.innerHTML || "N/A";
    const lastChapterID = lastChapterAnchor?.href.split("/")[3].split("-")[0];

    const genres = Array.from(
      querySelectorAllRegex(currentDiv, "data-hk", /0-0-3-\d*-6-2-\d*-3-0/)
    ).map((span) => span.innerHTML);

    const id = parent_currentDiv_img.href.split("/")[2].split("-")[0];

    results.push({
      poster: currentDiv_img.src || "N/A",
      title: currentDiv_img.alt || "N/A",
      id,
      mature: isMature(genres),
      genres,
      lastChapter: { title: lastChapterText, id: lastChapterID },
    });
  });

  const description =
    document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content") || "N/A";
  const keywords =
    document.querySelector('meta[name="keywords"]')?.getAttribute("content") ||
    "N/A";

  return {
    results,
    metadata: {
      title: document.title,
      lastModified: document.lastModified,
      URL: url,
      keywords,
      description,
    },
  };
}

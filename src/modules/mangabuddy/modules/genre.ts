import { buildUrl, fetchHTML } from "../../../utils";
import { MANGABUDDY_OPTIONS } from "../types";
import { scrapeItems } from "../utils";
import {
  genresMap,
  genreSortMap,
  genreStatusMap,
  MANGABUDDY_GENRE_SORT,
  MANGABUDDY_GENRE_STATUS,
  MANGABUDDY_GENRES,
} from "./genreTypes";

export type GenreOptions = {
  genre: MANGABUDDY_GENRES;
  sort?: MANGABUDDY_GENRE_SORT;
  status?: MANGABUDDY_GENRE_STATUS;
};

export default async function genre(
  options: GenreOptions,
  baseOptions?: MANGABUDDY_OPTIONS
) {
  const urlParams: Record<string, string> = {};
  if (options.sort) urlParams.sort = genreSortMap[options.sort];
  if (options.status) urlParams.status = genreStatusMap[options.status];

  const url = buildUrl(
    `https://mangabuddy.com/genres/${genresMap[options.genre]}`,
    urlParams
  );

  const document = await fetchHTML(url, baseOptions);
  const body = document.body;
  const genres = scrapeItems(body);
  return genres;
}

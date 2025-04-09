import { buildUrl, fetchHTML } from "../../../utils";
import { TOONLY_OPTIONS } from "../types";

export type SearchOptions = {
  query?: string;
  order?: Order;
  page?: number;
  genre?: { condition?: Condition; genres?: Genre[] };
  author?: string;
  artist?: string;
  contentShown?: "all" | "mature-only" | "mature-hidden";
  status?: Status[];
};

type Status = "completed" | "ongoing" | "canceled" | "hiatus";

type Condition = "AND" | "OR";

type Genre =
  | "action"
  | "adventure"
  | "comedy"
  | "crime"
  | "drama"
  | "fantasy"
  | "gossip"
  | "historical"
  | "horror"
  | "josei"
  | "magic"
  | "mature"
  | "mystery"
  | "psychological"
  | "romance"
  | "school-life"
  | "sci-fi"
  | "seinen"
  | "shoujo"
  | "shounen"
  | "slice-of-life"
  | "sports"
  | "supernatural"
  | "thriller"
  | "tragedy"
  | "yaoi"
  | "yuri";

type Order =
  | "relevance"
  | "latest"
  | "alphabet"
  | "rating"
  | "trending"
  | "views"
  | "new-manga";

type SearchResult = {
  id: string;
  title: string;
  poster: string;
  rating: number;
  views: string;
};

export default async function search(
  options: SearchOptions,
  base_options: TOONLY_OPTIONS
): Promise<SearchResult[]> {
  options.query = "";
  const baseUrl = `https://toonily.com/search/page/${options.page || 1}/${
    options.query.replace(/ /g, "-") || ""
  }`;
  const queryOptions: Record<string, string> = {};
  if (options) {
    if (options.order) queryOptions.m_orderby = options.order;
    if (options.genre) {
      if (options.genre.condition)
        queryOptions.op = options.genre.condition == "AND" ? "1" : "0";
      if (options.genre.genres) {
        options.genre.genres.forEach((genre, index) => {
          queryOptions[`genre[${index}]`] = genre;
        });
      }
      if (options.author) queryOptions.author = options.author;
      if (options.artist) queryOptions.artist = options.artist;
      if (options.contentShown) {
        switch (options.contentShown) {
          case "mature-hidden":
            queryOptions.adult = "0";
            break;
          case "mature-only":
            queryOptions.adult = "1";
        }
      }
      if (options.status) {
        options.status.forEach((status, index) => {
          queryOptions[`status[${index}]`] = status;
        });
      }
    }
  }

  const url = buildUrl(baseUrl, queryOptions);
  //   console.log(url);
  const document = await fetchHTML(url, base_options.proxy);
  const body = document.body;
  const results = body.querySelectorAll(
    ".col-6.col-sm-3.col-lg-2 > .page-item-detail.manga"
  );

  const resultsArr: SearchResult[] = [];
  for (const result of results) {
    const firstAnchor = result.querySelector("a");
    const poster = firstAnchor.querySelector("img");
    const rating = Number(
      result.querySelector(
        ".item-summary > .manga-rate-view-comment > .item > span > span > #averagerate"
      ).textContent
    );

    const views = result.querySelector(
      ".item-summary > .manga-rate-view-comment > .item > .icon.ion-md-eye"
    ).parentElement.textContent;
    resultsArr.push({
      id: firstAnchor.href.split("/")[4],
      title: firstAnchor.title,
      poster: poster.getAttribute("data-src").replace(/-\d*x\d*/g, ""),
      rating,
      views,
    });
  }
  return resultsArr;
}

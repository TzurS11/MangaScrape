import chapter from "./modules/chapter";
import home from "./modules/home";
import id from "./modules/id";
import page from "./modules/page";
import search from "./modules/search";
import { MANGAKAKALOT_OPTIONS, Mangakakalot_sources } from "./types";

/**
 * MANGAKAKALOT module. Use this module to scrape manga from MANGAKAKALOT.
 *
 * **TO ACCESS ANY IMAGE FROM THIS WEBSITE YOU NEED TO HAVE https://chapmanganato.to/ OR https://mangakakalot.com/ AS YOUR REFERER IN YOUR REQUEST HEADERS. THIS INCLUDES CHAPTER PAGES AND MANGA THUMBNAILS. THE REFERER URL IS BASED ON WHAT THE SOURCE OF THE MANGA IS.**
 *
 *
 * Before using this source please read the [Terms Of Service](https://mangakakalot.com/z-terms-conditions.html)
 */
export class MANGAKAKALOT {
  options: MANGAKAKALOT_OPTIONS = {};
  constructor(options?: MANGAKAKALOT_OPTIONS) {
    if (options) this.options = options;
  }
  /**
   * Get the home page of the website.
   *
   * includes latest updates and popular manga. does not include detailed data.
   */
  home() {
    return home(this.options);
  }
  /**
   * Get detailed data about a manga by its ID. to get the id use any browsing or searching method.
   *
   * Keep in mind that source must be provided. source will be provided by any browsing or searching method.
   */
  id(mangaID: string, source: Mangakakalot_sources) {
    return id(mangaID, source, this.options);
  }
  /**
   * Get the pages of a chapter. does not include anything else.
   *
   * Keep in mind that source must be provided. source will be provided by any browsing or searching method.
   *
   * **You can't access any image from the array without adding a referer in the request (https://chapmanganato.to/ or https://mangakakalot.com/ based on the source selected in the function paramter)**
   */
  chapter(mangaID: string, chapterID: string, source: Mangakakalot_sources) {
    return chapter(mangaID, chapterID, source, this.options);
  }

  /**
   * Search for a manga by query. for more detailed results get the id and source and use the id method.
   */
  search(query: string) {
    return search(query, this.options);
  }

  /**
   * handle page GET requests. returns a buffer of the image.
   */
  page(
    url: string,
    source: Mangakakalot_sources,
    options?: MANGAKAKALOT_OPTIONS
  ) {
    return page(url, source, options);
  }
}

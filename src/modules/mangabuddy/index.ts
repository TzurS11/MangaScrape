import genre, { GenreOptions } from "./modules/genre";
import latest from "./modules/latest";
import popular from "./modules/popular";
import status, { StatusOptions } from "./modules/status";
import id from "./modules/id";
import { MANGABUDDY_OPTIONS } from "./types";
import search from "./modules/search";
import chapter from "./modules/chapter";
import page from "./modules/page";

/**
 * MANGABUDDY module. Use this module to scrape manga from MANGABUDDY.
 *
 * **TO ACCESS ANY IMAGE FROM THIS WEBSITE YOU NEED TO HAVE https://mangabuddy.com/ AS YOUR REFERER IN YOUR REQUEST HEADERS. THIS INCLUDES CHAPTER PAGES AND MANGA THUMBNAILS.**
 *
 * Before using this source please read the [Terms Of Service](https://bato.to/terms-of-service)
 * specifically the section "Website Access"(3) rule no. 6
 */
export class MANGABUDDY {
  options: MANGABUDDY_OPTIONS = {};
  constructor(options?: MANGABUDDY_OPTIONS) {
    if (options) this.options = options;
  }
  /**
   * Get list of popular mangas. for more detailed results get the id and use the id method.
   */
  popular() {
    return popular(this.options);
  }
  /**
   * Get list of latest mangas. for more detailed results get the id and use the id method.
   */
  latest() {
    return latest(this.options);
  }
  /**
   * Get list of mangas by genre. for more detailed results get the id and use the id method.
   */
  genre(options: GenreOptions) {
    return genre(options, this.options);
  }
  /**
   * Get list of mangas by status. for more detailed results get the id and use the id method.
   */
  status(options: StatusOptions) {
    return status(options, this.options);
  }
  /**
   * Get detailed data about a manga by its ID. to get the id use any browsing or searching method.
   */
  id(mangaID: string) {
    return id(mangaID, this.options);
  }
  /**
   * Search for a manga by query. for more detailed results get the id and use the id method.
   */
  search(query: string) {
    return search(query, this.options);
  }
  /**
   * Get the pages of a chapter. does not include anything else.
   */
  chapter(mangaID: string, chatperID: string) {
    return chapter(mangaID, chatperID, this.options);
  }

  /**
   * handle page GET requests. returns a buffer of the image.
   */
  page(url: string) {
    return page(url, this.options);
  }
}

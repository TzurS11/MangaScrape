import chapter from "./modules/chapter";
import home from "./modules/home";
import id from "./modules/id";
import random from "./modules/random";
import search, { SearchFilters } from "./modules/search";
import { BATOTO_OPTIONS, DEFAULTURL } from "./types";

/**
 * BATOTO module. Use this module to scrape manga from BATOTO.
 *
 * Before using this source please read the [Terms Of Service](https://bato.to/terms-of-service)
 * specifically the section "Website Access"(3) rule no. 6
 */
export class BATOTO {
  options: BATOTO_OPTIONS = { baseUrl: DEFAULTURL };
  constructor(options?: BATOTO_OPTIONS) {
    if (options) {
      this.options = options;
    }
  }
  /**
   * Get the home page of the website.
   * @returns Metadata, popular updates and latest releases.
   */
  home() {
    return home(this.options);
  }
  /**
   * Get 6 random comics.
   * @returns Limited data about the comics. use id method to get detailed data(like chapters).
   */
  random() {
    return random(this.options);
  }
  /**
   * Get a comic by its ID
   * @param comicID The ID of the comic. get it by searching, randomly or from the home page.
   * @returns Detailed data about the comic. including chapters
   */
  id(comicID: string) {
    return id(comicID, this.options);
  }
  /**
   * Get the pages of a chapter. does not include anything else.
   * @param comicID The ID of the comic. get it by searching, randomly or from the home page.
   * @param chapterID Get it from the the detailed data of the comic attained from the id method.
   * @returns Array consisting of the image URLs of the pages of the chapter.
   */
  chapter(comicID: string, chapterID: string) {
    return chapter(comicID, chapterID, this.options);
  }

  /**
   * Search for comics. Returns an array of comics.
   * Limited Data. Use id method to get detailed data.
   */
  search(filter?: SearchFilters) {
    return search(filter, this.options);
  }
}

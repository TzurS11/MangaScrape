import home, { HomeOptions } from "./modules/home";
import getByID from "./modules/id";
import search, { SearchOptions } from "./modules/search";
import { TOONLY_OPTIONS } from "./types";

/**
 * TOONILY module. Use this module to scrape manga from TOONILY.
 *
 * Please check the [Terms of service](https://toonily.com/terms/) before using this source, specifically rule 3.c.
 */
export class TOONILY {
  options: TOONLY_OPTIONS = {};
  constructor(options?: TOONLY_OPTIONS) {
    if (options) this.options = options;
  }
  /**
   * Get the latest and newest mangas from TOONILY.
   *
   * Limited data. use id function to get more details.
   *
   * @param offset The page number to get the latest manga from.
   */
  home(options?: HomeOptions) {
    return home(options, this.options);
  }

  /**
   * Get manga details by ID.
   *
   * @param id The ID of the manga. get by searching or from home function.
   */
  id(id: string) {
    return getByID(id, this.options);
  }

  /**
   * Search for manga by title, author, artist, genre, or status.
   *
   * Get limited data. Use id function to get more details.
   */
  search(options: SearchOptions) {
    return search(options, this.options);
  }
}

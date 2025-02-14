import home from "./modules/home";
import { MANGAKAKALOT_OPTIONS } from "./types";

/**
 * @deprecated
 * **UNDER DEVELOPMENT**
 *
 * MANGAKAKALOT module. Use this module to scrape manga from MANGAKAKALOT.
 *
 * Before using this source please read the [Terms Of Service](https://mangakakalot.com/z-terms-conditions.html)
 */
export class MANGAKAKALOT {
  options: MANGAKAKALOT_OPTIONS = {};
  constructor(options?: MANGAKAKALOT_OPTIONS) {
    if (options) this.options = options;
  }
  home() {
    return home(this.options);
  }
}

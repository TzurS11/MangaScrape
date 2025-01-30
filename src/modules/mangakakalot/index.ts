import home from "./modules/home";
import { MANGAKAKALOT_OPTIONS } from "./types";

export default class MANGAKAKALOT {
  options: MANGAKAKALOT_OPTIONS = {};
  constructor(options?: MANGAKAKALOT_OPTIONS) {
    if (options) this.options = options;
  }
  home() {
    return home(this.options);
  }
}

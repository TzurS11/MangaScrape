import chapter from "./modules/chapter";
import home from "./modules/home";
import id from "./modules/id";
import random from "./modules/random";
import { BATOTO_OPTIONS, DEFAULTURL } from "./types";

export default class BATOTO {
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
   * Get 6 random comics
   * @returns Metadata, popular updates and latest releases.
   */
  random() {
    return random(this.options);
  }
  /**
   * Get a comic by its ID
   * @returns Detailed data about the comic. including chapters
   */
  id(comicID: string) {
    return id(comicID, this.options);
  }

  chapter(comicID: string, chapterID: string) {
    return chapter(comicID, chapterID, this.options);
  }
}

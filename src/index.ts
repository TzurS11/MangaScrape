import BATOTO from "./modules/batoto";
import { BATOTO_OPTIONS } from "./modules/batoto/types";

export default class MangaScrape {
  /**
   * BATOTO module. Use this module to scrape manga from BATOTO.
   *
   * Before using this source please read the [Terms Of Service](https://bato.to/terms-of-service)\
   * specifically the section "Website Access"(3) rule no. 6
   */
  BATOTO(options?: BATOTO_OPTIONS) {
    return new BATOTO(options);
  }
}

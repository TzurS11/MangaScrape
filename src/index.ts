import BATOTO from "./modules/batoto";
import { BATOTO_OPTIONS } from "./modules/batoto/types";

export default class MangaScrape {
  BATOTO(options?: BATOTO_OPTIONS) {
    return new BATOTO(options);
  }
}

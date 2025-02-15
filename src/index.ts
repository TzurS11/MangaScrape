// import BATOTO from "./modules/batoto";
// import { BATOTO_OPTIONS } from "./modules/batoto/types";
// import MANGABUDDY from "./modules/mangabuddy";
// import { MANGABUDDY_OPTIONS } from "./modules/mangabuddy/types";
// import MANGAKAKALOT from "./modules/mangakakalot";
// import { MANGAKAKALOT_OPTIONS } from "./modules/mangakakalot/types";
// import { MAIN_OPTIONS } from "./types";

export { BATOTO as Batoto } from "./modules/batoto";
export { MANGABUDDY as MangaBuddy } from "./modules/mangabuddy";
export { MANGAKAKALOT as Mangakakalot } from "./modules/mangakakalot";

// export default class MangaScrape {
//   #mainOptions?: MAIN_OPTIONS;

//   constructor(options?: MAIN_OPTIONS) {
//     this.#mainOptions = options;
//   }
//   /**
//    * BATOTO module. Use this module to scrape manga from BATOTO.
//    *
//    * Before using this source please read the [Terms Of Service](https://bato.to/terms-of-service)
//    * specifically the section "Website Access"(3) rule no. 6
//    */
//   BATOTO(options: BATOTO_OPTIONS = {}) {
//     if (this.#mainOptions != undefined) {
//       options.proxy = this.#mainOptions.proxy;
//     }
//     return new BATOTO(options);
//   }

//   /**
//    * @deprecated
//    * **UNDER DEVELOPMENT**
//    *
//    * MANGAKAKALOT module. Use this module to scrape manga from MANGAKAKALOT.
//    *
//    * Before using this source please read the [Terms Of Service](https://mangakakalot.com/z-terms-conditions.html)
//    */
//   MANGAKAKALOT(options: MANGAKAKALOT_OPTIONS = {}) {
//     if (this.#mainOptions != undefined) {
//       options.proxy = this.#mainOptions.proxy;
//     }
//     return new MANGAKAKALOT(options);
//   }

//   /**
//    * MANGABUDDY module. Use this module to scrape manga from MANGABUDDY.
//    *
//    * **TO ACCESS ANY PAGE IN A CHAPTER FROM THIS WEBSITE YOU NEED TO HAVE https://mangabuddy.com/ AS YOUR REFERER IN YOUR REQUEST HEADERS.**
//    *
//    * Before using this source please read the [Terms Of Service](https://bato.to/terms-of-service)
//    * specifically the section "Website Access"(3) rule no. 6
//    */
//   MANGABUDDY(options: MANGABUDDY_OPTIONS = {}) {
//     if (this.#mainOptions != undefined) {
//       options.proxy = this.#mainOptions.proxy;
//     }
//     return new MANGABUDDY(options);
//   }
// }

// export { MangaScrape };

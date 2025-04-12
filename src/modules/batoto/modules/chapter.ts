import { fetchHTML } from "../../../utils";
import { BATOTO_OPTIONS } from "../types";
import { getBaseURL } from "../utils";

export default async function chapter(
  comicID: string,
  chapterID: string,
  options: BATOTO_OPTIONS
) {
  try {
    const document = await fetchHTML(
      getBaseURL(options) + "/title/" + comicID + "/" + chapterID,
      options
    );

    const astroisland = document.getElementsByTagName("astro-island");

    const pages: string[] = [];
    for (let i = 0; i < astroisland.length; i++) {
      const propsJSON = JSON.parse(
        (astroisland.item(i) as Element).getAttribute("props") as string
      );
      if (propsJSON.imageFiles) {
        const imagesArray: string[] = JSON.parse(propsJSON.imageFiles[1]);
        for (let j = 0; j < imagesArray.length; j++) {
          let img = imagesArray[j][1];
          pages.push(img);
        }
      }
    }
    return pages;
  } catch (e) {
    return [];
  }
}

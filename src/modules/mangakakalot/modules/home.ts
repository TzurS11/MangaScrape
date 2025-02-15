import { fetchHTML } from "../../../utils";
import { MANGAKAKALOT_OPTIONS, Mangakakalot_sources } from "../types";
import { linkToID } from "../utils";

type Popular = {
  title: string;
  id: string;
  cover: string;
  lastChapter: {
    id: string;
    name: string;
  };
};

type latestUpdates = {
  id: string;
  title: string;
  cover: string;
  source: Source;
};

type Source = Mangakakalot_sources | undefined;

export default async function home(options?: MANGAKAKALOT_OPTIONS) {
  const document = await fetchHTML("https://mangakakalot.com/", options?.proxy);
  const body = document.body;

  const popularsWrapper = document.getElementById("owl-demo") as HTMLDivElement;
  const populars = Array.from(popularsWrapper.getElementsByClassName("item"));
  const popularsArr: Popular[] = [];
  for (const popular of populars) {
    const title = popular.querySelector("h3")?.textContent || "";
    const id =
      popular.querySelector("a")?.getAttribute("href")?.split("/")[4] || "";
    const image = popular.querySelector("img")?.getAttribute("src") || "";
    const lastChapter = popular.querySelectorAll("a")[1];

    popularsArr.push({
      title,
      id,
      cover: image,
      lastChapter: {
        id: lastChapter.href.split("/")[5],
        name: lastChapter.title,
      },
    });
  }

  const updateDivs = Array.from(document.getElementsByClassName("itemupdate"));

  const latestUpdates: latestUpdates[] = [];

  for (const update of updateDivs) {
    const anchors = update.getElementsByTagName("a");
    const link = anchors.item(0)?.href || "";
    const id = linkToID(link);
    const img = anchors.item(0)?.getElementsByTagName("img")[0]?.src || "";
    const title = anchors.item(1)?.textContent || "";
    latestUpdates.push({ source: id[1], id: id[0], title, cover: img });
  }

  return { populars: popularsArr, latestUpdates };
}

// TODO: Switch from the less detailed to more detailed tooltip ripping!

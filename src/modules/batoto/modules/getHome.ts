import { fetchHTML, querySelectorAllRegex } from "../../../utils";
import { BATOTO_OPTIONS } from "../types";
import { getBaseURL, isMature } from "../utils";

type PopularUpdate = {
  poster: string;
  title: string;
  id: string;
  lastChapter: string;
};

type LatestRelease = {
  poster: string;
  title: string;
  id: string;
  genres: string[];
  mature: boolean;
  lastChapter: string;
};

export default async function getHome(options?: BATOTO_OPTIONS) {
  const document = await fetchHTML(
    getBaseURL(options) + "/v3x",
    options?.proxy
  );

  const body = document.body;
  const popularGrid = body.querySelector(
    "#app-wrapper > main > div:nth-child(3) > astro-island > div > div:nth-child(2) > astro-slot > div"
  ) as HTMLDivElement;
  const populars = querySelectorAllRegex(
    popularGrid,
    "data-hk",
    /^0-0-\d*-1-0$/
  ) as HTMLImageElement[];
  const popularUpdates: PopularUpdate[] = [];
  for (const popular of populars) {
    const parent = popular.parentElement as HTMLAnchorElement;
    const wrapper = parent.parentElement as HTMLDivElement;
    const lastChapter = wrapper.getElementsByClassName(
      "link link-hover text-xs text-white line-clamp-1 visited:text-accent"
    );
    const lastChapterText = lastChapter[0].textContent;
    popularUpdates.push({
      poster: popular.src,
      title: popular.alt,
      id: parent.href.split("/")[2].split("-")[0],
      lastChapter: lastChapterText || "N/A",
    });
  }

  let latestReleases: LatestRelease[] = [];

  const latestReleasesWrapper = document.querySelector(
    "#app-wrapper > main > div:nth-child(4) > astro-island > div > div.space-y-5 > astro-slot > div"
  ) as HTMLDivElement;

  const latestReleasesDivs = querySelectorAllRegex(
    latestReleasesWrapper,
    "data-hk",
    /0-0-\d*-0/
  );

  latestReleasesDivs.forEach((currentDiv) => {
    const currentDiv_img = currentDiv.querySelector("img");
    if (!currentDiv_img) return;

    const parent_currentDiv_img =
      currentDiv_img.parentElement as HTMLAnchorElement;
    const lastChapterAnchor = currentDiv.querySelector(
      ".link-hover.link-primary.visited\\:link-accent"
    ) as HTMLAnchorElement;
    const lastChapter =
      lastChapterAnchor?.querySelector("span")?.innerHTML || "N/A";

    const genres = Array.from(
      querySelectorAllRegex(currentDiv, "data-hk", /0-0-\d*-4-2-\d*-3-0/)
    ).map((span) => span.innerHTML);

    const id = parent_currentDiv_img.href.replace("/title/", "") || "";

    latestReleases.push({
      poster: currentDiv_img.src || "N/A",
      title: currentDiv_img.alt || "N/A",
      id,
      mature: isMature(genres),
      genres,
      lastChapter,
    });
  });

  const description =
    document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content") || "N/A";
  const keywords =
    document.querySelector('meta[name="keywords"]')?.getAttribute("content") ||
    "N/A";

  return {
    /**
     * Metadata of the page.
     */
    metadata: {
      title: document.title,
      lastModified: document.lastModified,
      URL: getBaseURL(options) + "/v3x",
      keywords,
      description,
    },
    /**
     * Popular updates in this page. Top row at the beginning of the page.
     * Minimal information is provided.
     */
    popularUpdates,
    /**
     * Latest releases in this page. bottom Collumn after the popular updates.
     */
    latestReleases,
  };
}
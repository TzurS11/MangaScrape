import {
  BASEURLS,
  BATOTO_OPTIONS,
  DEFAULTURL,
  DeprecatedBaseURLS,
} from "./types";

export function getBaseURL(
  options?: BATOTO_OPTIONS
): BASEURLS | DeprecatedBaseURLS {
  return options?.baseUrl || DEFAULTURL;
}

export function isMature(genres: string[]): boolean {
  let NSFWgenres = [
    "gore",
    "bloody",
    "violence",
    "ecchi",
    "adult",
    "mature",
    "smut",
    "hentai",
  ];
  for (let i = 0; i < genres.length; i++) {
    let genre = genres[i].toLowerCase().replace(/ /g, "_");
    if (NSFWgenres.includes(genre)) return true;
  }
  return false;
}

const toTitleCase = (str: string) =>
  str.replace(
    /(^\w|\s\w)(\S*)/g,
    (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
  );

export function formatGeners(arr: string[]) {
  const newArr = arr.map((genre) => toTitleCase(genre.replace(/\_/g, " ")));
  return newArr;
}

type batoArray = [number, string][];
export function arrayFixer(arr: batoArray): string[] {
  let fixedArray: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    fixedArray.push(arr[i][1] || "");
  }
  return fixedArray;
}

export function capitalizeEveryWord(input: string): string {
  const words = input.split(" ");

  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return "";
    }
  });

  return capitalizedWords.join(" ");
}

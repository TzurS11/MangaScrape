import { axiosProxy } from "../../types";

export type MANGABUDDY_OPTIONS = {
  proxy?: axiosProxy;
};

export type Manga = {
  poster: string;
  id: string;
  title: string;
  genres: string[];
  description: string;
  score: number;
};

export interface MangaDetailed {
  id: string;
  title: {
    original: string;
    alt: string[];
  };
  poster: string;
  authors: { id: string; name: string }[];
  status: string;
  genres: { id: string; name: string }[];
  lastUpdate: string;
  description: string;
  chapters: { id: string; title: string; update: string }[];
}

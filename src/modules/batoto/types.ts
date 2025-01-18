import { Options } from "../../types";

export interface BATOTO_OPTIONS extends Options {
  /**
   * The base URL of the website. You can use valid urls and deprecated urls.
   */
  baseUrl?: BASEURLS | DeprecatedBaseURLS;
}

/**
 * Valid Base URLs.
 * Check https://rentry.co/batoto for an updated list
 */
export type BASEURLS =
  | "https://fto.to"
  | "https://jto.to"
  | "https://hto.to"
  | "https://xbato.com"
  | "https://xbato.net"
  | "https://xbato.org"
  | "https://zbato.com"
  | "https://zbato.net"
  | "https://zbato.org"
  | "https://readtoto.com"
  | "https://readtoto.net"
  | "https://readtoto.org"
  | "https://batocomic.com"
  | "https://batocomic.net"
  | "https://batocomic.org"
  | "https://batotoo.com"
  | "https://batotwo.com"
  | "https://comiko.net"
  | "https://comiko.org"
  | "https://battwo.com"
  | "https://dto.to"
  | "https://mto.to"
  | "https://wto.to";

/**
 * @deprecated Deprecating and Not recommended. Use BASEURLS instead
 */
export type DeprecatedBaseURLS =
  | "https://mangatoto.com"
  | "https://mangatoto.net"
  | "https://mangatoto.org"
  | "https://bato.to";

export const DEFAULTURL = "https://fto.to";

export type Metadata = {
  title: string;
  lastModified: string;
  URL: string;
  keywords: string;
  description: string;
};
export interface RandomResponse {
  id: string;
  data: RandomResponseData;
  last_chapterNodes: LastChapterNode[];
}

interface RandomResponseData {
  id: string;
  dbStatus: string;
  isNormal: boolean;
  isHidden: boolean;
  isDeleted: boolean;
  dateCreate: number | null;
  datePublic: number | null;
  dateModify: number | null;
  dateUpload: number | null;
  dateUpdate: number | null;
  name: string;
  slug: string;
  altNames: string[];
  authors: string[];
  artists: string[];
  genres: string[];
  origLang: null | string;
  tranLang: string;
  uploadStatus: null | string;
  originalStatus: string;
  originalPubFrom: null | string;
  originalPubTill: null | string;
  readDirection: null | string;
  urlPath: string;
  urlCover600: string;
  urlCover300: string;
  urlCoverOri: string;
  disqusId: string;
  stat_is_hot: boolean;
  stat_is_new: boolean;
  stat_count_follows: number;
  stat_count_reviews: number;
  stat_count_post_child: number;
  stat_count_post_reply: number;
  stat_count_mylists: number;
  stat_count_votes: number;
  stat_count_notes: number;
  stat_count_emotions: StatCount[];
  stat_count_statuss: StatCount[];
  stat_count_scores: StatCount[];
  stat_count_views: StatCount[];
  stat_score_avg: number;
  stat_score_bay: number;
  stat_score_val: number;
  stat_count_chapters_normal: number;
  stat_count_chapters_others: number;
}

interface StatCount {
  field: string;
  count: number;
}

interface LastChapterNode {
  id: string;
  data: LastChapterNodeData;
}

interface LastChapterNodeData {
  id: string;
  comicId: string;
  dbStatus: string;
  isNormal: boolean;
  isHidden: boolean;
  isDeleted: boolean;
  isFinal: null;
  dateCreate: Date | number;
  datePublic: Date | number;
  dateModify: Date | null;
  volNum: number | null;
  chaNum: number;
  dname: string;
  title: null | string;
  urlPath: string;
  count_images: number;
  stat_is_new: boolean;
  stat_count_post_child: number;
  stat_count_post_reply: number;
  stat_count_views_login: number;
  stat_count_views_guest: number;
  userId: null | string;
  userNode: UserNode | null;
}

interface UserNode {
  id: number;
  data: UserNodeData;
}

interface UserNodeData {
  id: number;
  name: string;
  uniq: string;
  avatarUrl: string;
  urlPath: string;
  dateCreate: number;
  dateOnline: number;
  gender: number;
  birth: Birth;
  stat_count_comics_normal: number;
  stat_count_comics_others: number;
  stat_count_comics_uploaded: null;
  stat_count_comics_modified: null;
  stat_count_chapters_normal: number;
  stat_count_chapters_others: number;
  stat_count_comment_createds: number;
  stat_count_comment_receives: number;
  stat_count_forum_child: number;
  stat_count_forum_reply: number;
  stat_count_views_guest: number;
  stat_count_views_login: number;
  stat_count_following: number;
  stat_count_followers: number;
  stat_warnings_unread: number;
  stat_warnings_readed: number;
  count_reviews: number;
  is_adm: boolean;
  is_mod: boolean;
  is_vip: number;
  is_verified: boolean;
  is_deleted: boolean;
  is_trusted: boolean;
  is_muted: number;
  is_warned: number;
  is_banned: boolean;
}

interface Birth {
  y: number;
  m: number;
  d: number;
}

export interface GetByIDResponse {
  id: string;
  data: GetByIDResponseData;
}

interface GetByIDResponseData {
  id: string;
  dbStatus: string;
  isNormal: boolean;
  isHidden: boolean;
  isDeleted: boolean;
  dateCreate: number;
  datePublic: null;
  dateModify: number;
  dateUpload: null;
  dateUpdate: number;
  name: string;
  slug: string;
  altNames: string[];
  authors: string[];
  artists: string[];
  genres: string[];
  origLang: string | null;
  tranLang: string | null;
  uploadStatus: null | string;
  originalStatus: string;
  originalPubFrom: null | string;
  originalPubTill: null;
  readDirection: null | string;
  summary: Summary;
  extInfo: Info;
  resInfo: Info;
  urlPath: string;
  urlCover600: string;
  urlCover300: string;
  urlCoverOri: string;
  userId: string;
  mod_hide: null;
  mod_alert_reader: null;
  stat_is_hot: boolean;
  stat_is_new: boolean;
  stat_count_follows: number;
  stat_count_reviews: number;
  stat_count_post_child: number;
  stat_count_post_reply: number;
  stat_count_mylists: number;
  stat_count_votes: number;
  stat_count_notes: number;
  stat_count_emotions: StatCount[];
  stat_count_statuss: StatCount[];
  stat_count_scores: StatCount[];
  stat_count_views: StatCount[];
  stat_score_avg: number;
  stat_score_bay: number;
  stat_score_val: number;
  stat_count_chapters_normal: number;
  stat_count_chapters_others: number;
}

interface Info {
  code: null | string;
}

interface Summary {
  code: string;
  text: string;
}

export type ChapterFromRSS = {
  title: string;
  link: string;
  guid: string;
  description: string;
  pubDate: string;
};

export type Chapter = { id: string; title: string; pubDate: string };

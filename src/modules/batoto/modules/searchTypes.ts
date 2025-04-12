export type Order =
  | "field_score"
  | "field_follow"
  | "field_review"
  | "field_comment"
  | "field_chapter"
  | "field_upload"
  | "field_public"
  | "field_name"
  | "views_h001"
  | "views_h006"
  | "views_h012"
  | "views_h024"
  | "views_d007"
  | "views_d030"
  | "views_d090"
  | "views_d180"
  | "views_d360"
  | "views_d000"
  | "status_wish"
  | "status_doing"
  | "status_completed"
  | "status_on_hold"
  | "status_dropped"
  | "status_repeat"
  | "emotion_upvote"
  | "emotion_funny"
  | "emotion_love"
  | "emotion_surprised"
  | "emotion_angry"
  | "emotion_sad";

export type ArtworkStyle =
  | "artwork"
  | "cartoon"
  | "comic"
  | "doujinshi"
  | "imageset"
  | "manga"
  | "manhua"
  | "manhwa"
  | "webtoon"
  | "western"
  | "4_koma"
  | "oneshot";

export type ContentTag =
  | "shoujo"
  | "shounen"
  | "josei"
  | "seinen"
  | "yuri"
  | "yaoi"
  | "bara"
  | "kodomo"
  | "old_people"
  | "non_human";

export type ExplicitContent =
  | "gore"
  | "bloody"
  | "violence"
  | "ecchi"
  | "adult"
  | "mature"
  | "smut"
  | "hentai";

export type Themes =
  | "action"
  | "adaptation"
  | "adventure"
  | "age_gap"
  | "aliens"
  | "animals"
  | "anthology"
  | "beasts"
  | "bodyswap"
  | "boys"
  | "cars"
  | "cheating_infidelity"
  | "childhood_friends"
  | "college_life"
  | "comedy"
  | "contest_winning"
  | "cooking"
  | "crime"
  | "crossdressing"
  | "deliquents"
  | "dementia"
  | "demons"
  | "drama"
  | "dungeons"
  | "emperor_daughte"
  | "fantasy"
  | "fan_colored"
  | "fetish"
  | "full_color"
  | "game"
  | "gender_bender"
  | "genderswap"
  | "ghosts"
  | "girls"
  | "gyaru"
  | "harem"
  | "harlequin"
  | "historical"
  | "horror"
  | "incest"
  | "isekai"
  | "kids"
  | "magic"
  | "magical_girls"
  | "martial_arts"
  | "mecha"
  | "medical"
  | "military"
  | "monster_girls"
  | "monsters"
  | "music"
  | "mystery"
  | "netorare_NTR"
  | "ninja"
  | "office_workers"
  | "omegaverse"
  | "parody"
  | "philosophical"
  | "police"
  | "post_apocalyptic"
  | "psychological"
  | "regression"
  | "reincarnation"
  | "reverse_harem"
  | "revenge"
  | "reverse_isekai"
  | "romance"
  | "royal_family"
  | "royalty"
  | "samurai"
  | "school_life"
  | "sci_fi"
  | "shoujo_ai"
  | "shounen_ai"
  | "showbiz"
  | "slice_of_life"
  | "sm_bdsm"
  | "space"
  | "sports"
  | "super_power"
  | "superhero"
  | "supernatural"
  | "survival"
  | "thriller"
  | "time_travel"
  | "tower_climbing"
  | "traditional_games"
  | "tragedy"
  | "transmigration"
  | "vampiers"
  | "villainess"
  | "video_games"
  | "virtual_reality"
  | "wuxia"
  | "xianxia"
  | "xuanhuan"
  | "yakuzas"
  | "zombies";

export type Genre = {
  artworkStyle?: ArtworkStyle[];
  ContentTag?: ContentTag[];
  /**
   * Age restricted themes. Violence, Mature content...
   */
  ExplicitContent?: ExplicitContent[];
  /**
   * Theme of the comic like Romance, Comedy, Adventure...
   *
   * NOTICE: not all themes are correct, if you stumble upon a theme that may be wrong open an issue in the github
   */
  Theme?: Themes[];
};

export function handleGenres(genres?: {
  include?: Genre;
  exclude?: Genre;
}): string | undefined {
  if (!genres) return undefined;

  const mapGenres = (
    genreArray: (ArtworkStyle | ContentTag | ExplicitContent | Themes)[]
  ) => genreArray.join(",");

  const includeGenres = mapGenres([
    ...(genres.include?.artworkStyle || []),
    ...(genres.include?.ContentTag || []),
    ...(genres.include?.ExplicitContent || []),
    ...(genres.include?.Theme || []),
  ]);

  const excludeGenres = mapGenres([
    ...(genres.exclude?.artworkStyle || []),
    ...(genres.exclude?.ContentTag || []),
    ...(genres.exclude?.ExplicitContent || []),
    ...(genres.exclude?.Theme || []),
  ]);

  return `${includeGenres}${
    includeGenres && excludeGenres ? "|" : ""
  }${excludeGenres}`;
}

export type Languages =
  | "af"
  | "sq"
  | "am"
  | "ar"
  | "hy"
  | "az"
  | "eu"
  | "be"
  | "bn"
  | "bs"
  | "bg"
  | "ca"
  | "zh"
  | "hr"
  | "cs"
  | "da"
  | "nl"
  | "en"
  | "et"
  | "fi"
  | "fr"
  | "gl"
  | "ka"
  | "de"
  | "el"
  | "he"
  | "hi"
  | "hu"
  | "is"
  | "id"
  | "ga"
  | "it"
  | "ja"
  | "kk"
  | "ko"
  | "lv"
  | "lt"
  | "mk"
  | "ms"
  | "mt"
  | "mn"
  | "ne"
  | "no"
  | "fa"
  | "pl"
  | "pt"
  | "ro"
  | "ru"
  | "sr"
  | "sk"
  | "sl"
  | "es"
  | "sw"
  | "sv"
  | "th"
  | "tr"
  | "uk"
  | "ur"
  | "uz"
  | "vi"
  | "cy"
  | "xh"
  | "yi"
  | "zu";

export function handleLanguages(languages?: Languages[]): string | undefined {
  if (!languages) return undefined;
  return languages.join(",");
}

export type Status =
  | "pending"
  | "ongoing"
  | "completed"
  | "hiatus"
  | "Cancelled";

export const OrderMap = {
  RatingScore: "field_score",
  MostFollowers: "field_follow",
  MostReviews: "field_review",
  MostComments: "field_comment",
  MostChapters: "field_chapter",
  LatestUpload: "field_upload",
  RecentlyCreated: "field_public",
  NameAtoZ: "field_name",
  Views60Minutes: "views_h001",
  Views6Hours: "views_h006",
  Views12Hours: "views_h012",
  Views24Hours: "views_h024",
  Views7Days: "views_d007",
  Views30Days: "views_d030",
  Views90Days: "views_d090",
  Views180Days: "views_d180",
  Views360Days: "views_d360",
  ViewsTotal: "views_d000",
  StatusPlanToRead: "status_wish",
  StatusReading: "status_doing",
  StatusCompleted: "status_completed",
  StatusOnHold: "status_on_hold",
  StatusDropped: "status_dropped",
  StatusReReading: "status_repeat",
  EmotionAwesome: "emotion_upvote",
  EmotionFunny: "emotion_funny",
  EmotionLove: "emotion_love",
  EmotionScared: "emotion_surprised",
  EmotionAngry: "emotion_angry",
  EmotionSad: "emotion_sad",
} as const;
export type Order = keyof typeof OrderMap;

export const ArtworkStyleMap = {
  Artbook: "artwork",
  Cartoon: "cartoon",
  Comic: "comic",
  Doujinshi: "doujinshi",
  Imageset: "imageset",
  Manga: "manga",
  Manhua: "manhua",
  Manhwa: "manhwa",
  Webtoon: "webtoon",
  Western: "western",
  Koma4: "4_koma",
  Oneshot: "oneshot",
} as const;

export type ArtworkStyle = keyof typeof ArtworkStyleMap;

export const ContentTagMap = {
  Shoujo: "shoujo",
  Shounen: "shounen",
  Josei: "josei",
  Seinen: "seinen",
  Yuri: "yuri",
  Yaoi: "yaoi",
  Bara: "bara",
  Kodomo: "kodomo",
  SilverAndGolden: "old_people",
  NonHuman: "non_human",
} as const;

export type ContentTag = keyof typeof ContentTagMap;

export const ExplicitContentMap = {
  Gore: "gore",
  Bloody: "bloody",
  Violence: "violence",
  Ecchi: "ecchi",
  Adult: "adult",
  Mature: "mature",
  Smut: "smut",
  Hentai: "hentai",
} as const;

export type ExplicitContent = keyof typeof ExplicitContentMap;

export const ThemeMap = {
  Action: "action",
  Adaptation: "adaptation",
  Adventure: "adventure",
  AgeGap: "age_gap",
  Aliens: "aliens",
  Animals: "animals",
  Anthology: "anthology",
  Beasts: "beasts",
  Bodyswap: "bodyswap",
  Boys: "boys",
  Cars: "cars",
  CheatingInfidelity: "cheating_infidelity",
  ChildhoodFriends: "childhood_friends",
  CollegeLife: "college_life",
  Comedy: "comedy",
  ContestWinning: "contest_winning",
  Cooking: "cooking",
  Crime: "crime",
  Crossdressing: "crossdressing",
  Deliquents: "deliquents",
  Dementia: "dementia",
  Demons: "demons",
  Drama: "drama",
  Dungeons: "dungeons",
  EmperorsDaugthe: "emperor_daughte",
  Fantasy: "fantasy",
  FanColored: "fan_colored",
  Fetish: "fetish",
  FullColor: "full_color",
  Game: "game",
  GenderBender: "gender_bender",
  Genderswap: "genderswap",
  Ghosts: "ghosts",
  Girls: "girls",
  Gyaru: "gyaru",
  Harem: "harem",
  Harlequin: "harlequin",
  Historical: "historical",
  Horror: "horror",
  Incest: "incest",
  Isekai: "isekai",
  Kids: "kids",
  Magic: "magic",
  MagicalGirls: "magical_girls",
  MartialArts: "martial_arts",
  Mecha: "mecha",
  Medical: "medical",
  Military: "military",
  MonsterGirls: "monster_girls",
  Monsters: "monsters",
  Music: "music",
  Mystery: "mystery",
  netorareNTR: "netorare_NTR",
  Ninja: "ninja",
  OfficeWorkers: "office_workers",
  Omegraverse: "omegaverse",
  Parody: "parody",
  Philosophical: "philosophical",
  Police: "police",
  PostApocalyptic: "post_apocalyptic",
  Psychological: "psychological",
  Regression: "regression",
  Reincarnation: "reincarnation",
  ReverseHarem: "reverse_harem",
  Revenge: "revenge",
  ReverseIsekai: "reverse_isekai",
  Romance: "romance",
  RoyalFamily: "royal_family",
  Royalty: "royalty",
  Samurai: "samurai",
  SchoolLife: "school_life",
  SciFi: "sci_fi",
  ShoujoAI: "shoujo ai",
  ShounenAI: "shounen_ai",
  Showbiz: "showbiz",
  SliceOfLife: "slice_of_life",
  SMBDSMSUBDOM: "sm_bdsm",
  Space: "space",
  Sports: "sports",
  SuperPower: "super_power",
  Superhero: "superhero",
  Supernatural: "supernatural",
  Survival: "survival",
  Thriller: "thriller",
  TimeTravel: "time_travel",
  TowerClimbing: "tower_climbing",
  TraditionalGames: "traditional_games",
  Tragedy: "tragedy",
  Transmigration: "transmigration",
  Vampires: "vampiers",
  Villainess: "villainess",
  VideoGames: "video_games",
  VirtualReality: "virtual_reality",
  Wuxia: "wuxia",
  Xianxia: "xianxia",
  Xuanhuan: "xuanhuan",
  Yakuzas: "yakuzas",
  Zombies: "zombies",
} as const;

export type Theme = keyof typeof ThemeMap;

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
  Theme?: Theme[];
};

export function handleGenres(genres?: { include?: Genre; exclude?: Genre }) {
  if (!genres) return undefined;

  const mapGenres = (
    genreArray: (
      | keyof typeof ArtworkStyleMap
      | keyof typeof ContentTagMap
      | keyof typeof ExplicitContentMap
      | keyof typeof ThemeMap
    )[]
  ) =>
    genreArray
      .map(
        (genre) =>
          (ArtworkStyleMap as any)[genre] ||
          (ContentTagMap as any)[genre] ||
          (ExplicitContentMap as any)[genre] ||
          (ThemeMap as any)[genre]
      )
      .join(",");

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

export const LanguagesMap = {
  Afrikaans: "af",
  Albanian: "sq",
  Amharic: "am",
  Arabic: "ar",
  Armenian: "hy",
  Azerbaijani: "az",
  Basque: "eu",
  Belarusian: "be",
  Bengali: "bn",
  Bosnian: "bs",
  Bulgarian: "bg",
  Catalan: "ca",
  Chinese: "zh",
  Croatian: "hr",
  Czech: "cs",
  Danish: "da",
  Dutch: "nl",
  English: "en",
  Estonian: "et",
  Finnish: "fi",
  French: "fr",
  Galician: "gl",
  Georgian: "ka",
  German: "de",
  Greek: "el",
  Hebrew: "he",
  Hindi: "hi",
  Hungarian: "hu",
  Icelandic: "is",
  Indonesian: "id",
  Irish: "ga",
  Italian: "it",
  Japanese: "ja",
  Kazakh: "kk",
  Korean: "ko",
  Latvian: "lv",
  Lithuanian: "lt",
  Macedonian: "mk",
  Malay: "ms",
  Maltese: "mt",
  Mongolian: "mn",
  Nepali: "ne",
  Norwegian: "no",
  Persian: "fa",
  Polish: "pl",
  Portuguese: "pt",
  Romanian: "ro",
  Russian: "ru",
  Serbian: "sr",
  Slovak: "sk",
  Slovenian: "sl",
  Spanish: "es",
  Swahili: "sw",
  Swedish: "sv",
  Thai: "th",
  Turkish: "tr",
  Ukrainian: "uk",
  Urdu: "ur",
  Uzbek: "uz",
  Vietnamese: "vi",
  Welsh: "cy",
  Xhosa: "xh",
  Yiddish: "yi",
  Zulu: "zu",
} as const;

export type Languages = keyof typeof LanguagesMap;

export function handleLanguages(languages?: Languages[]) {
  if (!languages) return undefined;

  return languages.map((lang) => LanguagesMap[lang]).join(",");
}

export const StatusMap = {
  Pending: "pending",
  Ongoing: "ongoing",
  Completed: "completed",
  Hiatus: "hiatus",
  Cancelled: "Cancelled",
} as const;

export type Status = keyof typeof StatusMap;

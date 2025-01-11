import axios from "axios";
import { fetchHTML } from "../../../utils";
import { BATOTO_OPTIONS, Metadata, RandomResponse } from "../types";
import { formatGeners, getBaseURL, isMature } from "../utils";

type RandomComic = {
  poster: string;
  title: { original: string; alt: string[] };
  id: string;
  genres: string[];
  mature: boolean;
  lastChapter: { title: string; id: string };
  originalLanguage: string | null;
  translatedLanguage: string | null;
};

type Random = {
  //   metadata: Metadata;
  randomComics: RandomComic[];
};

export default async function random(options?: BATOTO_OPTIONS) {
  let requestConfig = {
    proxy:
      options?.proxy?.host == undefined || options.proxy.port == undefined
        ? undefined
        : options.proxy,
    headers: {
      "Content-Type": "application/json",
      Referer: `${getBaseURL(options)}/v3x-random`,
    },
  };
  if (requestConfig.proxy == undefined) delete requestConfig.proxy;
  const response = await axios.post(
    `${getBaseURL(options)}/apo/`,
    {
      query: `
      query get_content_searchComic($select: SearchComic_Select) {
        get_content_searchComic(select: $select) {
          reqPage reqSize reqSort reqWord
          newPage
          paging {
            total pages page init size skip limit
          }
          items {
            id
            data {
              id
              dbStatus
              isNormal
              isHidden
              isDeleted
              dateCreate datePublic dateModify
              dateUpload dateUpdate
              name
              slug
              altNames
              authors
              artists
              genres
              origLang tranLang
              uploadStatus
              originalStatus
              originalPubFrom
              originalPubTill
              readDirection
              urlPath
              urlCover600
              urlCover300
              urlCoverOri
              disqusId
              stat_is_hot
              stat_is_new
              stat_count_follows
              stat_count_reviews
              stat_count_post_child
              stat_count_post_reply
              stat_count_mylists
              stat_count_votes
              stat_count_notes
              stat_count_emotions {
                field count
              }
              stat_count_statuss {
                field count
              }
              stat_count_scores {
                field count
              }
              stat_count_views {
                field count
              }
              stat_score_avg
              stat_score_bay
              stat_score_val
              stat_count_chapters_normal
              stat_count_chapters_others
            }
            last_chapterNodes(amount: 1) {
              id
              data {
                id comicId
                dbStatus
                isNormal
                isHidden
                isDeleted
                isFinal
                dateCreate
                datePublic
                dateModify
                volNum
                chaNum
                dname
                title
                urlPath
                count_images
                stat_is_new
                stat_count_post_child
                stat_count_post_reply
                stat_count_views_login
                stat_count_views_guest
                userId
                userNode {
                  id
                  data {
                    id
                    name
                    uniq
                    avatarUrl
                    urlPath
                    dateCreate
                    dateOnline
                    gender
                    birth { y m d }
                    stat_count_comics_normal
                    stat_count_comics_others
                    stat_count_comics_uploaded
                    stat_count_comics_modified
                    stat_count_chapters_normal
                    stat_count_chapters_others
                    stat_count_comment_createds
                    stat_count_comment_receives
                    stat_count_forum_child
                    stat_count_forum_reply
                    stat_count_views_guest
                    stat_count_views_login
                    stat_count_following
                    stat_count_followers
                    stat_warnings_unread
                    stat_warnings_readed
                    count_reviews
                    is_adm is_mod is_vip
                    is_verified is_deleted
                    is_trusted is_muted is_warned is_banned
                  }
                }
              }
            }
          }
        }
      }
    `,
      variables: {
        select: {
          where: "random",
          chapCount: "1",
          ignoreGlobalPLangs: false,
          ignoreGlobalGenres: false,
          ignoreGlobalBlocks: false,
        },
      },
    },
    requestConfig
  );
  const randomComics = response.data.data.get_content_searchComic
    .items as RandomResponse[];

  const randomList: RandomComic[] = [];
  for (const random of randomComics) {
    randomList.push({
      genres: formatGeners(random.data.genres),
      id: random.id,
      lastChapter: {
        id: random.last_chapterNodes[0].id,
        title: random.last_chapterNodes[0].data.dname,
      },
      mature: isMature(random.data.genres),
      poster: random.data.urlCoverOri,
      title: { original: random.data.name, alt: random.data.altNames },
      originalLanguage: random.data.origLang,
      translatedLanguage: random.data.tranLang,
    });
  }

  return randomList;
}

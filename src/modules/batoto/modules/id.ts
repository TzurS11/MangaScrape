import axios from "axios";
import {
  BATOTO_OPTIONS,
  Chapter,
  ChapterFromRSS,
  GetByIDResponse,
} from "../types";
import { parseStringPromise } from "xml2js";
import { formatGeners, getBaseURL, isMature } from "../utils";

type GetByID = {
  genres: string[];
  id: string;
  chapters: Chapter[];
  description: string;
  mature: boolean;
  originalLanguage: string | null;
  translatedLanguage: string | null;
  readDirection: string | null;
  poster: string;
  title: { original: string; alt: string[] };
};

export default async function id(
  id: string,
  options?: BATOTO_OPTIONS
): Promise<GetByID> {
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
        query get_content_comicNode($id: ID!) {
          get_content_comicNode(id: $id) {
            id
            data {
              id
              dbStatus
              isNormal
              isHidden
              isDeleted
              dateCreate
              datePublic
              dateModify
              dateUpload
              dateUpdate
              name
              slug
              altNames
              authors
              artists
              genres
              origLang
              tranLang
              uploadStatus
              originalStatus
              originalPubFrom
              originalPubTill
              readDirection
              summary {
                code
                text
              }
              extInfo {
                code
              }
              resInfo {
                code
              }
              urlPath
              urlCover600
              urlCover300
              urlCoverOri
              userId
              mod_hide
              mod_alert_reader
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
                field
                count
              }
              stat_count_statuss {
                field
                count
              }
              stat_count_scores {
                field
                count
              }
              stat_count_views {
                field
                count
              }
              stat_score_avg
              stat_score_bay
              stat_score_val
              stat_count_chapters_normal
              stat_count_chapters_others
            }
          }
        }
      `,
      variables: { id },
      operationName: "get_content_comicNode",
    },
    requestConfig
  );

  const rssResponse = await axios.get(
    `${getBaseURL(options)}/rss/series/${id}.xml`,
    requestConfig
  );

  const rssData = await parseStringPromise(rssResponse.data);
  const chapters = rssData.rss.channel[0].item.map((item: any) => ({
    title: item.title[0],
    link: item.link[0],
    guid: item.guid[0],
    description: item.description[0],
    pubDate: item.pubDate[0],
  })) as ChapterFromRSS[];

  const comicData = response.data.data.get_content_comicNode as GetByIDResponse;
  const chaptersArr: Chapter[] = [];
  for (let i = 0; i < chapters.length; i++) {
    let chapter = chapters[i];
    chaptersArr.push({
      id: chapter.guid.split("/")[4],
      title: chapter.title.replace(comicData.data.name, "").trim(),
      pubDate: chapter.pubDate,
    });
  }
  chaptersArr.reverse(); // Reverse the array to get the first chapter first

  return {
    genres: formatGeners(comicData.data.genres),
    id: comicData.id,
    chapters: chaptersArr,
    description: comicData.data.summary.text,
    mature: isMature(comicData.data.genres),
    originalLanguage: comicData.data.origLang,
    translatedLanguage: comicData.data.tranLang,
    readDirection: comicData.data.readDirection,
    poster: comicData.data.urlCoverOri,
    title: { original: comicData.data.name, alt: comicData.data.altNames },
  };
}

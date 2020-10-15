import { getRestStatus, RestRessurs, RestStatus } from "./api-utils";
import { BASE_URL } from "../utils/fetch-utils";

export const VIMEO_API_HOST = BASE_URL + "/api/video"; // "https://api.vimeo.com" | "proxy"
export const SHOWCASE_PATH = "users/94865899/albums/6728595/videos";

interface ShowcaseDto {
  total: number;
  page: number;
  per_page: number;
  data: VideoDto[];
}

interface VideoDto {
  uri: string;
  name: string;
  description: string;
  duration: number;
  link: string;
  width: number;
  height: number;
  created_time: string;
  modified_time: string;
  release_time: string;
  pictures: PictureDto;
}

interface PictureDto {
  uri: string;
  active: string;
  sizes: SizeDto[];
}

interface SizeDto {
  width: number;
  height: number;
  link: string;
  link_with_play_button: string;
}

export interface Video {
  uri: string;
  name: string;
  description: string;
  duration: number;
  link: string;
  width: number;
  height: number;
  createdTime: Date;
  modifiedTime: Date;
  releaseTime: Date;
  pictureLink: string | undefined;
}

export type RestVideoliste = RestRessurs<Video[]>;

const mapTilVideo = (videoDto: VideoDto): Video => ({
  uri: videoDto.link,
  name: videoDto.name,
  description: videoDto.description,
  duration: videoDto.duration,
  link: videoDto.link,
  width: videoDto.width,
  height: videoDto.height,
  createdTime: new Date(videoDto.created_time),
  modifiedTime: new Date(videoDto.modified_time),
  releaseTime: new Date(videoDto.release_time),
  pictureLink: videoDto.pictures.sizes.find(
    (size: SizeDto) => size.width === 295
  )?.link_with_play_button,
});

export const hentRestVideoliste = async (): Promise<RestVideoliste> => {
  const response = await fetch(`${VIMEO_API_HOST}/${SHOWCASE_PATH}`, {
    method: "get",
  });
  const restStatus = getRestStatus(response.status);

  if (restStatus === RestStatus.Suksess) {
    try {
      const videoListe: Video[] = ((await response.json()) as ShowcaseDto).data.map(
        (videoDto) => mapTilVideo(videoDto)
      );

      return {
        status: RestStatus.Suksess,
        data: videoListe,
      };
    } catch (error) {
      return { status: RestStatus.Feil };
    }
  }
  return { status: RestStatus.Feil };
};

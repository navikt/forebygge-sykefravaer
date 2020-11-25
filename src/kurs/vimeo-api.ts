import { getRestStatus, RestRessurs, RestStatus } from './api-utils';
import { BASE_URL } from '../utils/sanity-innhold-fetch-utils';

export const SHOWCASE_PATH = BASE_URL + '/api/video/users/94865899/albums/6728595/videos';
export const THUMBNAILS_PATH = BASE_URL + '/api/thumbnails';

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
    name: string;
    description: string;
    duration: number;
    link: string;
    thumbnailLink: string | undefined;
}

export type RestVideoliste = RestRessurs<Video[]>;

const mapTilVideo = (videoDto: VideoDto): Video => ({
    name: videoDto.name,
    description: videoDto.description,
    duration: videoDto.duration,
    link: videoDto.link,
    thumbnailLink: videoDto.pictures.sizes.find((size: SizeDto) => size.width === 295)
        ?.link_with_play_button,
});

export const hentRestVideoliste = async (): Promise<RestVideoliste> => {
    const response = await fetch(SHOWCASE_PATH, {
        method: 'get',
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

export const getUrlTilThumbnail = (video: Video): string | undefined =>
    video.thumbnailLink?.replace('https://i.vimeocdn.com', THUMBNAILS_PATH);

export enum TypographySize {
    sidetittel = 'sidetittel',
    innholdstittel = 'innholdstittel',
}

export interface ImageSize {
    width: string;
    height: string;
}

const mobilImageSize = { width: '170', height: '133' };
const desktopImageSize = { width: '243', height: '191' };

const mobilTextSize = TypographySize.innholdstittel;
const desktopTextSize = TypographySize.sidetittel;

const isMobil = () => window.innerWidth < 768;

export const calcImageSize = (): ImageSize => (isMobil() ? mobilImageSize : desktopImageSize);

export const calcTextSize = (): TypographySize => (isMobil() ? mobilTextSize : desktopTextSize);

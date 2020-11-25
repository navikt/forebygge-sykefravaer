export enum TypoSize {
    sidetittel = 'sidetittel',
    undertitel = 'undertittel',
}

export interface ImageSize {
    width: string;
    height: string;
}

const mobilImageSize = { width: '170', height: '133' };
const desktopImageSize = { width: '243', height: '191' };

const mobilTextSize = TypoSize.undertitel;
const desktopTextSize = TypoSize.sidetittel;

const isMobil = () => window.innerWidth < 768;

export const calcImageSize = (): ImageSize => (isMobil() ? mobilImageSize : desktopImageSize);

export const calcTextSize = (): TypoSize => (isMobil() ? mobilTextSize : desktopTextSize);

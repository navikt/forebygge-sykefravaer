import { isMobil } from "./document-utils";

const margintop = 208;

export const pageScrolled = (): boolean => window.pageYOffset > 0;

export const initmenuPosition = () =>
  isMobil() ? (pageScrolled() ? setResult() : margintop) : 0;

export const setResult = () => (compare() ? calcResult() : 0);
export const calcResult = (): number => margintop - window.pageYOffset;
export const compare = (): boolean => window.pageYOffset < margintop;

export const setScroll = () => {
  return compare() ? margintop - window.pageYOffset : 0;
};

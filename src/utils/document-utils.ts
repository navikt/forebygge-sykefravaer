export const isMobil = () => window.innerWidth < 768;

export const calcWidth = (mob: number, desk: number): number => (isMobil() ? mob : desk);

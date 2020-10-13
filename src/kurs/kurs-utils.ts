import { Kurs } from "./kurs-api";

export const getNesteWebinarOmIA = (kursliste: Kurs[]): Kurs | undefined => {
  return kursliste
    .filter((kurs) => kurs.tema === "Inkluderende arbeidsliv (IA)")
    .filter((kurs) => kurs.type === "Webinar")
    .sort(
      (kurs1, kurs2) =>
        new Date(kurs2.start).getTime() - new Date(kurs1.slutt).getTime()
    )[0];
};

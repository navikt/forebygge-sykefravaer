import { frontendLogger } from "./frontendLogger";
import { backendLogger } from "./backendLogger";
import {hentRestVideoliste} from "../kurs/vimeo-api";

// Må synces med listen over predefinerte feilmeldinger i server
export const predefinerteFeilmeldinger = {
  feilVedHentingAvSanityInnhold: "En feil har oppstått ved henting av Sanity innhold",
  feilVedHentingAvKursliste: "En feil har oppstått ved henting av kursliste",
  feilVedHentingAvVideoliste: "En feil har oppstått ved henting av videoliste",
  feilVedNettverkskall: "Det er oppstått en feil ved nettverkskall"
}

// This logger is isomorphic, and can be imported from anywhere in the app
export const logger = typeof window !== 'undefined' ? frontendLogger() : backendLogger();

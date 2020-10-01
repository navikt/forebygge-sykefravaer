import amplitude from "./amplitudeInstance";

const miljo = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const appkey = "#forebygge-sykefravaer-".concat(miljo);

const hrefKey = (href: Location) => href.toString();

export const skrivTilMalingBesokerSide = () => {
  amplitude.logEvent(appkey.concat("-brukerbesokersiden"));
};

export const logLenkeTrykk = (
  event: React.MouseEvent<HTMLElement | MouseEvent>,
  href: Location | undefined
) => {
  event.preventDefault();
  if (!!href) {
    amplitude.logEvent(appkey.concat("-lenketrykk=").concat(hrefKey(href)));
    window.location = href;
  }
};

export const logNavigering = (destinasjon: string) => {
  const gjeldendeHrefUtenQuery = window.location.href.split("?")[0];
  amplitude.logEvent("navigere", {
    destinasjon,
    url: gjeldendeHrefUtenQuery,
  });
};

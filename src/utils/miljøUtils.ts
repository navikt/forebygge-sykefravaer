export const getMiljø = (): string => {
  const hostname = window.location.hostname;
  if (hostname === "arbeidsgiver.nav.no") {
    return "prod-sbs";
  }
  return "local";
};

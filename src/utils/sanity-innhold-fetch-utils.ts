const sanityClient = require("@sanity/client");

export const BASE_URL = "/forebygge-sykefravaer";
export const projectId = "er31zvh0";
export const dataset =
  process.env.NODE_ENV === "production" ? "production" : "development";

const client = new sanityClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: true,
});

export enum SanityQueryTypes {
  viHjelperDereMed = "vi-hjelper-dere-med",
  digitaleTjenester = "digitale-tjenester",
  webinarOgKurs = "webinar-og-kurs",
  oppfolgingFraNavArbeidslivssenter = "oppfolging-fra-nav-arbeidslivssenter",
  helseIArbeid = "helseIArbeid",
  iaAvtalen = "ia-avtalen",
}

export const fetchSanityInnhold = () => {
  const query = querySanity();
  return client
    .fetch(query)
    .then((result: Object) => sendDataObj(result))
    .catch((error: any) => {
      console.log("Error: ", error);
    });
};

export interface SanityResponse {
  data: string;
  env: [string?, string?];
}

const querystart = (len: number) => len === 0;

const querySanity = () => {
  let querystring = "";
  Object.values<string>(SanityQueryTypes).forEach((elem, index) => {
    querystring = querystring.concat(
      querystart(index) ? `*[(_type == '${elem}'` : ` || _type == '${elem}'`
    );
  });
  return querystring.concat(
    ') && !(_id in path("drafts.**"))] | order(priority)'
  );
};

const sendDataObj = (json: any): SanityResponse => {
  return {
    data: json,
    env: [projectId, dataset],
  };
};

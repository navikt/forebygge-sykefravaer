import { DocumentTypes, SanityEnv } from "../sanity-blocks/sanityTypes";

const sanityClient = require("@sanity/client");

export const BASE_URL = "/forebygge-sykefravaer";

export enum SanityQueryTypes {
  viHjelperDereMed = "vi-hjelper-dere-med",
  digitaleTjenester = "digitale-tjenester",
  webinarOgKurs = "webinar-og-kurs",
  oppfolgingFraNavArbeidslivssenter = "oppfolging-fra-nav-arbeidslivssenter",
  helseIArbeid = "helseIArbeid",
  iaAvtalen = "ia-avtalen",
}

export const fetchSanityInnhold = async (
  config: SanityConfig
): Promise<SanityResponse> => {
  const query = querySanity();
  const client = new sanityClient(config);

  const response = await client.fetch(query);
  return {
    data: (await response.json()) as DocumentTypes[],
  };
};

export interface SanityResponse {
  data: DocumentTypes[];
}

export interface SanityConfig {
  projectId: string;
  dataset: string;
  useCdn: boolean;
}

const querystart = (len: number) => len === 0;

export const fetchSanityClientConfig = (): Promise<SanityConfig> => {
  const lokalUrl =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";

  return fetch(`${lokalUrl}${BASE_URL}/api/env`)
    .then((response) => {
      return response.json() as Promise<{
        sanityProjectId: string;
        sanityDataset: string;
      }>;
    })
    .then((data) => {
      return {
        projectId: data.sanityProjectId,
        dataset: data.sanityDataset,
        useCdn: true,
      };
    });
};

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

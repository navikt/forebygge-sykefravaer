import React from "react";

export enum TypoStyle {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  Normal = "normal",
}

type AlertStripeType = "info" | "suksess" | "advarsel" | "feil";

export type TextBlock = {
  node: {
    markDefs: [];
    _key: string;
    _type: string;
    style: TypoStyle;
  };
  children: React.ReactElement[] | string[];
};

export let env = ["", ""];

export const sanityImageLink = (imageId: string) => {
  const imageFragments = imageId.split("-");
  return `https://cdn.sanity.io/images/${env[0]}/${
    env[1]
  }/${imageFragments[1]
    .concat("-")
    .concat(imageFragments[2])
    .concat(".")
    .concat(imageFragments[3])}`;
};

export const setEnv = (item: string[]) => (env = item);

interface Image {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

interface Body {
  children: {
    markDefs: [];
    style: string;
  }[];
  markDefs: [];
  style: string;
  _key: string;
  _type: string;
}

export interface BodyContent {
  bodyContent: Body[];
  title: string;
  color?: [string];
  _key: string;
  _type: string;
}

export interface CommonTypes {
  priority: number;
  publishedAt: string;
  title: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _key: string;
  _type: string;
  _updatedAt: string;
  mainImage?: Image;
}

export type DocumentTypes =
  | VihjelperMed
  | DigitalTjeneste
  | WebinarOgKursInnhold
  | HelseIArbeid
  | Oppfolging
  | IAavtalen;

export interface VihjelperMed extends CommonTypes {
  checklist: {
    checkpoint: string;
    _key: string;
  }[];
  content: {}[];
  hovedliste: {
    body: Body;
    iconImage: Image;
  }[];
  footer: BodyContent[];
}

export interface DigitalTjeneste extends CommonTypes {
  hovedliste: {
    body: Body;
    iconImage: Image;
    title: string;
    _key: string;
    _type: string;
  }[];
  mainImage: Image;
}

export interface WebinarOgKursInnhold extends CommonTypes {
  title: string;
  ingress: Body[];
  lenkelisteTittel: string;
  lenkesamlinger: LenkesamlingInnhold[];
  kurspamelding: Kurspåmelding;
}

export interface LenkesamlingInnhold extends CommonTypes {
  tittel: string;
  undertekst: string;
  lenker: Lenke[];
}

export interface Kurspåmelding extends CommonTypes {
  tittel: string;
  undertekst: string;
  lenke: Lenke;
}

export interface Lenke extends CommonTypes {
  tekst: string;
  undertekst: string;
  href: string;
  ikon: Image;
  _key: string;
  _type: string;
}

export interface Oppfolging extends CommonTypes {
  alertstripe: {
    alertType: [AlertStripeType];
    innhold: Body[];
    _key: string;
    _type: string;
  }[];
  body: BodyContent[];
  mainImage: Image;
}

export interface HelseIArbeid extends CommonTypes {
  body: Body[];
  mainImage: Image;
}

export interface IAavtalen extends CommonTypes {
  body: Body[];
  list: {
    listElement: {
      tekst: {}[];
      _key: string;
      _type: string;
    }[];
    title: string;
  };
  mainImage: Image;
}

export interface SanityBlockTypes {
  author: object;
  content: {}[];
  priority: number;
  publishedAt: string;
  title: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

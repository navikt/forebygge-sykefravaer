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

interface MainImage {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

export interface BodyContent {
  bodyContent: {
    children: {}[];
    markDefs: [];
    style: string;
    _key: string;
    _type: string;
  }[];
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
  _type: string;
  _updatedAt: string;
  mainImage?: MainImage;
}

export type DocumentTypes =
  | VihjelperMed
  | DigitalTjeneste
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
    body: {}[];
    iconImage: {
      asset: {
        _ref: string;
        _type: string;
      };
      _type: string;
    };
  }[];
  footer: {
    bodyContent: {}[];
    color: [string];
    _key: string;
    _type: string;
  }[];
}

export interface DigitalTjeneste extends CommonTypes {
  hovedliste: {
    body: {
      children: {}[];
      markDefs: [];
      style: string;
      _key: string;
      _type: string;
      __proto__: string;
    }[];
    iconImage: {
      asset: {
        _ref: string;
        _type: string;
      };
      _type: string;
    };
    title: string;
    _key: string;
    _type: string;
  }[];
  mainImage: MainImage;
}

export interface Oppfolging extends CommonTypes {
  alertstripe: {
    alertType: [AlertStripeType];
    innhold: {
      _key: string;
      _type: string;
      children: {
        markDefs: [];
        style: string;
      }[];
    }[];
    _key: string;
    _type: string;
  }[];
  body: BodyContent[];
  mainImage: MainImage;
}

export interface HelseIArbeid extends CommonTypes {
  body: {
    children: {}[];
    markDefs: [];
    style: string;
    _key: string;
    _type: string;
  }[];
  mainImage: MainImage;
}

export interface IAavtalen extends CommonTypes {
  body: {}[];
  list: {
    listElement: {
      tekst: {}[];
      _key: string;
      _type: string;
    }[];
    title: string;
  };
  mainImage: MainImage;
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

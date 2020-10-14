import React, { useEffect, useState } from "react";
import {
  DigitalTjeneste,
  WebinarOgKursInnhold,
  HelseIArbeid,
  IAavtalen,
  Oppfolging,
  setEnv,
  DocumentTypes,
  VihjelperMed,
} from "../sanity-blocks/sanityTypes";
import { fetchsanityJSON, isProduction } from "../utils/fetch-utils";

interface ProviderProps {
  children: React.ReactNode;
}

export interface Overskrift {
  id: string;
  tekst: string;
}

interface Context {
  overskrifter: Overskrift[];
  viHjelper: null | VihjelperMed;
  tjenester: null | DigitalTjeneste;
  webinarogkurs: null | WebinarOgKursInnhold;
  oppfolging: null | Oppfolging;
  helsearbeid: null | HelseIArbeid;
  iaavtale: null | IAavtalen;
}

export const ForebyggeSykefravaerContext = React.createContext({} as Context);

const InnholdContext = (props: ProviderProps) => {
  const [overskrifter, setOverskrift] = useState<
    { id: string; tekst: string }[]
  >([]);
  const [viHjelperMed, setViHjelperMed] = useState<null | VihjelperMed>(null);
  const [dtjenester, setDtjenester] = useState<null | DigitalTjeneste>(null);
  const [
    webinarogkurs,
    setWebinarogkurs,
  ] = useState<null | WebinarOgKursInnhold>(null);
  const [oppfolging, setOppfolging] = useState<null | Oppfolging>(null);
  const [helsearbeid, setHelsearbeid] = useState<null | HelseIArbeid>(null);
  const [iaAvtale, setIaAvtale] = useState<null | IAavtalen>(null);

  const context: Context = {
    overskrifter: overskrifter,
    viHjelper: viHjelperMed,
    tjenester: dtjenester,
    webinarogkurs,
    oppfolging,
    helsearbeid,
    iaavtale: iaAvtale,
  };

  const leggTilMenyElement = (id: string, tekst: string) =>
    setOverskrift((overskrifter) => [...overskrifter, { id, tekst }]);
  useEffect(() => {
    const setDocumentData = (item: DocumentTypes) => {
      if (item.title) {
        leggTilMenyElement(item._type, item.title);
      }
      switch (item._type) {
        case "vi-hjelper-dere-med":
          return setViHjelperMed(item as VihjelperMed);
        case "digitale-tjenester":
          return setDtjenester(item as DigitalTjeneste);
        case "webinar-og-kurs":
          return setWebinarogkurs(item as WebinarOgKursInnhold);
        case "oppfolging-fra-nav-arbeidslivssenter":
          return setOppfolging(item as Oppfolging);
        case "helseIArbeid":
          return setHelsearbeid(item as HelseIArbeid);
        case "ia-avtalen":
          return setIaAvtale(item as IAavtalen);
      }
    };

    const url = isProduction();
    fetchsanityJSON(url)
      .then((res) => {
        setEnv(res.env);
        res.data.forEach((item: DocumentTypes) => {
          setDocumentData(item);
        });
      })
      .catch((err) => console.warn(err));
  }, []);

  useEffect(() => {
    const uniquelist = overskrifter.filter(
      (item, index) => overskrifter.indexOf(item) === index
    );
    if (uniquelist.length !== overskrifter.length) {
      setOverskrift(uniquelist);
    }
  }, [overskrifter]);

  return (
    <ForebyggeSykefravaerContext.Provider value={context}>
      {props.children}
    </ForebyggeSykefravaerContext.Provider>
  );
};

export default InnholdContext;

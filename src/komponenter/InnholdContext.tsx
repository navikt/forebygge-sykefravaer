import React, { useEffect, useState } from "react";
import {
  DigitalTjeneste,
  DocumentTypes,
  HelseIArbeid,
  IAavtalen,
  Oppfolging,
  setEnv,
  VihjelperMed,
  WebinarOgKursInnhold,
} from "../sanity-blocks/sanityTypes";
import {
  fetchSanityInnhold,
  SanityQueryTypes,
} from "../utils/sanity-innhold-fetch-utils";

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

  const leggTilOverskriftSomMenyElement = (overskrift: Overskrift) =>
    setOverskrift((overskrifter) => [...overskrifter, overskrift]);
  useEffect(() => {
    const setDocumentData = (item: DocumentTypes) => {
      if (item.title) {
        leggTilOverskriftSomMenyElement({ id: item._type, tekst: item.title });
      }
      switch (item._type) {
        case SanityQueryTypes.viHjelperDereMed:
          return setViHjelperMed(item as VihjelperMed);
        case SanityQueryTypes.digitaleTjenester:
          return setDtjenester(item as DigitalTjeneste);
        case SanityQueryTypes.webinarOgKurs:
          return setWebinarogkurs(item as WebinarOgKursInnhold);
        case SanityQueryTypes.oppfolgingFraNavArbeidslivssenter:
          return setOppfolging(item as Oppfolging);
        case SanityQueryTypes.helseIArbeid:
          return setHelsearbeid(item as HelseIArbeid);
        case SanityQueryTypes.iaAvtalen:
          return setIaAvtale(item as IAavtalen);
      }
    };

    fetchSanityInnhold()
      .then((res: any) => {
        setEnv(res.env);
        res.data.forEach((item: DocumentTypes) => {
          setDocumentData(item);
        });
      })
      .catch((err: any) => console.warn(err));
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

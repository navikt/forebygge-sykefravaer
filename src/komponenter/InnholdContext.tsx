import React, { useEffect, useState } from "react";
import {
  DigitalTjeneste,
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

interface Context {
  overskrift: string[];
  viHjelper: null | VihjelperMed;
  tjenester: null | DigitalTjeneste;
  oppfolging: null | Oppfolging;
  helsearbeid: null | HelseIArbeid;
  iaavtale: null | IAavtalen;
}

export const ForebyggeSykefravaerContext = React.createContext({} as Context);

const InnholdContext = (props: ProviderProps) => {
  const [overskrift, setOverskrift] = useState<string[]>([]);
  const [viHjelperMed, setViHjelperMed] = useState<null | VihjelperMed>(null);
  const [dtjenester, setDtjenester] = useState<null | DigitalTjeneste>(null);
  const [oppfolging, setOppfolging] = useState<null | Oppfolging>(null);
  const [helsearbeid, setHelsearbeid] = useState<null | HelseIArbeid>(null);
  const [iaAvtale, setIaAvtale] = useState<null | IAavtalen>(null);

  const context: Context = {
    overskrift: overskrift,
    viHjelper: viHjelperMed,
    tjenester: dtjenester,
    oppfolging: oppfolging,
    helsearbeid: helsearbeid,
    iaavtale: iaAvtale,
  };

  const leggTilMenyElement = (item: string) =>
    setOverskrift((overskrifter) => [...overskrifter, item]);

  const setDocumentData = (item: DocumentTypes) => {
    if (item.title) {
      leggTilMenyElement(item.title);
    }
    switch (item._type) {
      case "vi-hjelper-dere-med":
        return setViHjelperMed(item as VihjelperMed);
      case "digitale-tjenester":
        return setDtjenester(item as DigitalTjeneste);
      case "oppfolging-fra-nav-arbeidslivssenter":
        return setOppfolging(item as Oppfolging);
      case "helseIArbeid":
        return setHelsearbeid(item as HelseIArbeid);
      case "ia-avtalen":
        return setIaAvtale(item as IAavtalen);
    }
  };

  useEffect(() => {
    const url = isProduction();
    fetchsanityJSON(url)
      .then((res) => {
        console.log(res);
        setEnv(res.env);
        res.data.forEach((item: DocumentTypes) => {
          setDocumentData(item);
        });
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <ForebyggeSykefravaerContext.Provider value={context}>
      {props.children}
    </ForebyggeSykefravaerContext.Provider>
  );
};

export default InnholdContext;

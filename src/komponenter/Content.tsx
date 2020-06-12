import React, { useContext, useEffect, useState } from "react";
import { ForebyggeSykefravaerContext } from "./InnholdContext";
import Dokument from "./dokument/Dokument";
import ViHjelperDereMed from "./dokument/vi-hjelper-dere-med/ViHjelperDereMed";
import DigitaleTjenester from "./dokument/digitale-tjenester/DigitaleTjenester";
import OppfolgingFraNav from "./dokument/oppfolging-fra-nav/OppfolgingFraNav";
import Helsearbeid from "./dokument/helsearbeid/HelseArbeid";
import IaAvtalen from "./dokument/ia-avtalen/IaAvtalen";
import { calcWidth } from "../utils/document-utils";

const Content = () => {
  const {
    viHjelper,
    tjenester,
    oppfolging,
    helsearbeid,
    iaavtale,
  } = useContext(ForebyggeSykefravaerContext);

  const [width, setWidth] = useState(calcWidth(1, 2));
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(calcWidth(1, 2)));
    return () =>
      window.removeEventListener("resize", () => setWidth(calcWidth(1, 2)));
  }, []);

  return (
    <div>
      <Dokument innhold={viHjelper}>
        <ViHjelperDereMed innhold={viHjelper} width={width} />
      </Dokument>
      <Dokument innhold={tjenester}>
        <DigitaleTjenester innhold={tjenester} />
      </Dokument>
      <Dokument innhold={oppfolging}>
        <OppfolgingFraNav innhold={oppfolging} width={width} />
      </Dokument>
      <Dokument innhold={helsearbeid}>
        <Helsearbeid innhold={helsearbeid} />
      </Dokument>
      <Dokument innhold={iaavtale}>
        <IaAvtalen innhold={iaavtale} />
      </Dokument>
    </div>
  );
};

export default Content;

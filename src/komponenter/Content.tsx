import React, { useContext } from "react";
import { ForebyggeSykefravaerContext } from "./InnholdContext";
import Dokument from "./dokument/Dokument";
import ViHjelperDereMed from "./dokument/vi-hjelper-dere-med/ViHjelperDereMed";

const Content = () => {
  const { viHjelper } = useContext(ForebyggeSykefravaerContext);

  return (
    <div>
      <Dokument innhold={viHjelper}>
        <ViHjelperDereMed innhold={viHjelper} />
      </Dokument>
    </div>
  );
};

export default Content;

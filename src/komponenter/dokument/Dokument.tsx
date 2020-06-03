import React from "react";
import BEMHelper from "../../utils/bem";
import "./dokument.less";
import { Innholdstittel } from "nav-frontend-typografi";

const Dokument = () => {
  const cls = BEMHelper("dokument");

  return (
    <div className={cls.className}>
      <div className={cls.element("wrapper")}>
        <Innholdstittel>Dette er en tittel</Innholdstittel>
      </div>
    </div>
  );
};

export default Dokument;

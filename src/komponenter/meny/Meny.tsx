import React, { useContext } from "react";
import BEMHelper from "../../utils/bem";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import "./meny.less";
import Lenke from "nav-frontend-lenker";
import { ForebyggeSykefravaerContext } from "../InnholdContext";

const Meny = () => {
  const cls = BEMHelper("meny");
  const { overskrift } = useContext(ForebyggeSykefravaerContext);

  return (
    <div className={cls.className}>
      <div className={cls.element("content")}>
        <Undertittel>Innhold på denne siden:</Undertittel>
        {overskrift
          ? overskrift.map((element: string, index: number) => {
              return (
                <Normaltekst className={cls.element("lenke")} key={index}>
                  <Lenke href={"#".concat(element)}>{element}</Lenke>
                </Normaltekst>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Meny;

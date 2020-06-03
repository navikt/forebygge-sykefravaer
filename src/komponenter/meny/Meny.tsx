import React from "react";
import BEMHelper from "../../utils/bem";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import "./meny.less";
import Lenke from "nav-frontend-lenker";

const menypunkter = [
  "Hva kan NAV bidra med?",
  "Digitale tjenester",
  "Oppfølging fra NAV Arbeidslivssenter",
  "HelseIArbeid",
  "IA-avtalen",
];

const Meny = () => {
  const cls = BEMHelper("meny");

  return (
    <div className={cls.className}>
      <div className={cls.element("content")}>
        <Undertittel>Innhold på denne siden:</Undertittel>
        {menypunkter.map((element) => {
          return (
            <Normaltekst className={cls.element("lenke")}>
              <Lenke href={"#".concat(element)}>{element}</Lenke>
            </Normaltekst>
          );
        })}
      </div>
    </div>
  );
};

export default Meny;

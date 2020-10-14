import React, { useEffect, useState } from "react";
import { hentRestKurs, RestKursliste } from "../../../kurs/kurs-api";
import { RestStatus } from "../../../kurs/api-utils";
import {formatterKursdato, getNesteNettkurs} from "../../../kurs/kurs-utils";
import nesteNettkursIkon from "./neste-nettkurs-ikon.svg";
import "./NesteNettkurs.less";
import BEMHelper from "../../../utils/bem";
import { Normaltekst } from "nav-frontend-typografi";

export const NesteNettkurs = () => {
  const cls = BEMHelper("nesteNettkurs");

  const [restKursliste, setRestKursliste] = useState<RestKursliste>({
    status: RestStatus.IkkeLastet,
  });

  useEffect(() => {
    const hentOgSetRestKurs = async () => {
      setRestKursliste(await hentRestKurs());
    };
    hentOgSetRestKurs();
  }, [setRestKursliste]);

  const nesteNettkurs = getNesteNettkurs(
    restKursliste.status === RestStatus.Suksess ? restKursliste.data : []
  );

  return (
    <div className={cls.className}>
      <img src={nesteNettkursIkon} className={cls.element("ikon")} alt="" />
      <Normaltekst>
        Neste nettkurs er: {formatterKursdato(nesteNettkurs?.start)}
      </Normaltekst>
    </div>
  );
};

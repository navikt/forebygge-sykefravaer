import React, { useEffect, useState } from "react";
import BEMHelper from "../../utils/bem";
import TypografiBase from "nav-frontend-typografi";

import "./banner.less";
import ForebyggeSykefravaerIcon from "../../assets/img_tsx/ForebyggeSykefravaerIcon";

enum TypoSize {
  sidetittel = "sidetittel",
  undertitel = "undertittel",
}

const Banner = () => {
  const [txtSize, setTxtSize] = useState<TypoSize>(TypoSize.sidetittel);
  useEffect(() => {
    const settxt = () =>
      window.innerWidth < 768 ? TypoSize.undertitel : TypoSize.sidetittel;
    const setHeaderTekst = () => {
      setTxtSize(settxt);
    };
    window.addEventListener("resize", setHeaderTekst);
    return () => window.removeEventListener("resize", setHeaderTekst);
  });

  const cls = BEMHelper("banner");
  return (
    <>
      <div
        className={cls.className}
        role="banner"
        aria-roledescription="site banner"
      >
        <div className={cls.element("wrapper")}>
          <div className={cls.element("tekst")}>
            <TypografiBase type={txtSize}>
              Forebygge og redusere sykefravær og frafall
            </TypografiBase>
          </div>
          <div className={cls.element("image")}>
            <ForebyggeSykefravaerIcon />
          </div>
        </div>
        <div className={cls.element("bunnlinje")} />
      </div>
    </>
  );
};

export default Banner;

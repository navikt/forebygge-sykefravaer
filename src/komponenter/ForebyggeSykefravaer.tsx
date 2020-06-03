import React from "react";
import BEMHelper from "../utils/bem";
import Banner from "./banner/Banner";
import Meny from "./meny/Meny";
import "./forebyggeSykefravaer.less";
import Dokument from "./dokument/Dokument";

const MAIN_CLASSNAME = "forebyggeSykefravaer";
const cls = BEMHelper(MAIN_CLASSNAME);

const ForebyggeSykefravaer = () => {
  return (
    <div className={cls.className}>
      <Banner />
      <div className={cls.element("wrapper")}>
        <div className={cls.element("content")}>
          <Meny />
          <Dokument />
        </div>
      </div>
    </div>
  );
};

export default ForebyggeSykefravaer;

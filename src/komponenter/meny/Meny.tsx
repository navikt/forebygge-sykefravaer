import React, { useContext, useEffect, useState } from "react";
import BEMHelper from "../../utils/bem";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import { ForebyggeSykefravaerContext } from "../InnholdContext";
import throttle from "lodash.throttle";
import "./meny.less";

const cls = BEMHelper("meny");

const Meny = () => {
  const { overskrift } = useContext(ForebyggeSykefravaerContext);
  const [sectionInFocus, setSectionInFocus] = useState<number>(0);
  const [viewmobilMenu, setViewmobilMenu] = useState<boolean>(false);

  const toggleButton = () => setViewmobilMenu(!viewmobilMenu);

  useEffect(() => {
    const scrollHeight = () => window.scrollY || window.pageYOffset;
    const hoppLenkerScrollheight = () =>
      overskrift
        .map((section) => document.getElementById(section))
        .map((sectionNode) => (sectionNode ? sectionNode.offsetTop : 0));

    const setFocusIndex = () =>
      overskrift.length === 5
        ? hoppLenkerScrollheight().map((scrollheight, index) => {
            if (scrollheight - 250 < scrollHeight()) {
              return setSectionInFocus(index);
            }
            return null;
          })
        : null;

    const throttleScrollevent = throttle(() => setFocusIndex(), 75);
    window.addEventListener("scroll", throttleScrollevent, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", () => setFocusIndex());
    };
  }, [overskrift]);

  return (
    <div className={cls.className}>
      <div className={cls.element("container", viewmobilMenu ? "" : "closed")}>
        <div className={cls.element("content")}>
          <Undertittel>Innhold på denne siden:</Undertittel>
          <MenuButton on={viewmobilMenu} change={toggleButton} />
          {overskrift
            ? overskrift.map((element: string, index: number) => {
                return (
                  <Normaltekst
                    className={cls.element(
                      "lenke",
                      sectionInFocus === index ? "bold" : ""
                    )}
                    key={index}
                  >
                    <Lenke href={"#".concat(element)}>{element}</Lenke>
                  </Normaltekst>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

interface Button {
  on: boolean;
  change: () => void;
}

const MenuButton = (button: Button) => {
  return (
    <div
      className={cls.element("button", !button.on ? "" : "on")}
      role="button"
      onClick={button.change}
    >
      <span />
      <span />
      <span />
    </div>
  );
};

export default Meny;

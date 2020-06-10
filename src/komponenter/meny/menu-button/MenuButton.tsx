import React from "react";
import BEMHelper from "../../../utils/bem";
import "./menuButton.less";

interface Button {
  on: boolean;
  change: () => void;
}

const cls = BEMHelper("menubutton");

const MenuButton = (button: Button) => {
  return (
    <div className={cls.className}>
      <div
        className={cls.element("button", !button.on ? "" : "on")}
        role="button"
        onClick={button.change}
      >
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default MenuButton;

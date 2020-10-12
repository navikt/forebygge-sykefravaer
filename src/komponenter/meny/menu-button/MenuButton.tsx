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
      <button
        className={cls.element("button", !button.on ? "" : "on")}
        onClick={button.change}
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
};

export default MenuButton;

import React from "react";
import { VihjelperMed } from "../../../sanity-blocks/sanityTypes";

interface Props {
  innhold: VihjelperMed | null;
}

const ViHjelperDereMed = (props: Props) => {
  return props.innhold ? (
    <div>
      <div></div>
    </div>
  ) : null;
};

export default ViHjelperDereMed;

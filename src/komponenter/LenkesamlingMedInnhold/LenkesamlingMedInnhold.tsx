import React, { FunctionComponent } from "react";
import { Element } from "nav-frontend-typografi";
import { LenkesamlingInnhold } from "../../sanity-blocks/sanityTypes";
import BEMHelper from "../../utils/bem";
import { LenkepanelMedInnhold } from "../LenkepanelMedInnhold/LenkepanelMedInnhold";

interface Props {
  innhold: LenkesamlingInnhold | null;
}

export const LenkesamlingMedInnhold: FunctionComponent<Props> = (
  props: Props
) => {
  const cls = BEMHelper("webinarOgKurs");
  const innhold = props.innhold;

  if (!innhold) {
    return <></>;
  }

  return (
    <>
      <Element className={cls.element("lenkelisteTittel")}>
        {innhold.lenkelisteTittel}
      </Element>
      {innhold?.lenkeliste.map((lenkeinnhold) => (
        <LenkepanelMedInnhold innhold={lenkeinnhold} key={lenkeinnhold._key} />
      ))}
    </>
  );
};

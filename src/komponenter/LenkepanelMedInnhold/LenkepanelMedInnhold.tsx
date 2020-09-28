import React, { FunctionComponent } from "react";
import { Lenke } from "../../sanity-blocks/sanityTypes";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel";

interface Props {
  innhold: Lenke;
}

export const LenkepanelMedInnhold: FunctionComponent<Props> = ({ innhold }) => (
  <LenkepanelBase border={true} href={innhold.href}>
    <div className="lenkepanel__heading">
      <Element>{innhold.lenketekst}</Element>
      {innhold.undertekst && <Normaltekst>{innhold.undertekst}</Normaltekst>}
    </div>
  </LenkepanelBase>
);

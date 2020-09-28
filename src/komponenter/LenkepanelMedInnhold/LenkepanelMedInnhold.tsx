import React, { FunctionComponent } from "react";
import { Lenke } from "../../sanity-blocks/sanityTypes";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { serializers } from "../../sanity-blocks/serializer";
import BlockContent from "@sanity/block-content-to-react";
import BEMHelper from "../../utils/bem";
import "./LenkepanelMedInnhold.less";

interface Props {
  innhold: Lenke;
}

const cls = BEMHelper("lenkepanel-med-innhold");

export const LenkepanelMedInnhold: FunctionComponent<Props> = ({ innhold }) => {
  return (
    <LenkepanelBase border={true} href={innhold.href} className={cls.className}>
      <div className={cls.element("innhold-wrapper")}>
        {innhold.ikon && (
          <BlockContent
            className={cls.element("ikon")}
            blocks={innhold.ikon}
            serializers={serializers}
          />
        )}
        <div className="lenkepanel__heading">
          <Element>{innhold.lenketekst}</Element>
          {innhold.undertekst && (
            <Normaltekst>{innhold.undertekst}</Normaltekst>
          )}
        </div>
      </div>
    </LenkepanelBase>
  );
};

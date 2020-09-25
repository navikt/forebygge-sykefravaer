import React from "react";
import BEMHelper from "../../../utils/bem";
import "./webinarOgKurs.less";
import Lenkepanel from "nav-frontend-lenkepanel";
import { WebinarOgKursInnhold } from "../../../sanity-blocks/sanityTypes";
import BlockContent from "@sanity/block-content-to-react";
import { Element } from "nav-frontend-typografi";
import { serializers } from "../../../sanity-blocks/serializer";

interface Props {
  innhold: WebinarOgKursInnhold | null;
}

const cls = BEMHelper("webinarOgKurs");

const WebinarOgKurs = (props: Props) => {
  const { innhold } = props;

  return innhold ? (
    <div className={cls.className}>
      <div className={cls.element("ingress")}>
        <BlockContent
            blocks={innhold.ingress}
            serializers={serializers}
        />
      </div>
      {innhold && (
        <Element className={cls.element("lenkelisteTittel")}>
          {innhold.lenkelisteTittel}
        </Element>
      )}
      {innhold?.lenkeliste.map((element) => (
        <Lenkepanel
          key={element._key}
          border={true}
          href={element.href}
          tittelProps="element"
        >
          {element.lenketekst}
        </Lenkepanel>
      ))}
    </div>
  ) : null;
};

export default WebinarOgKurs;

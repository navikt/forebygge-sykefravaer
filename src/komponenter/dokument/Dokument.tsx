import React, { FunctionComponent, useEffect, useRef } from "react";
import BEMHelper from "../../utils/bem";
import { Innholdstittel } from "nav-frontend-typografi";
import { DocumentTypes } from "../../sanity-blocks/sanityTypes";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../sanity-blocks/serializer";
import "./dokument.less";

type DocType = DocumentTypes | null;

interface Props {
  innhold: DocType;
  image?: React.ReactNode;
  children: React.ReactNode;
}

const cls = BEMHelper("dokument");

const Dokument: FunctionComponent<Props> = (props) => {
  const { innhold } = props;
  if (!innhold) {
    return null;
  }

  const header = innhold.mainImage ? (
    <HeaderWithImage innhold={innhold} />
  ) : (
    <Innholdstittel>{innhold.title}</Innholdstittel>
  );

  return (
    <div className={cls.className} id={innhold.title}>
      <div className={cls.element("wrapper")}>
        {header}
        {props.children}
      </div>
    </div>
  );
};

const HeaderWithImage: FunctionComponent<{ innhold: DocumentTypes }> = ({
  innhold,
}) => {
  const tittelId = innhold.title;
  const tittelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.location.href.includes(`#${tittelId}`) && tittelRef) {
    }
  }, [tittelId]);

  return (
    <div className={cls.element("header")} ref={tittelRef}>
      <BlockContent blocks={innhold.mainImage} serializers={serializers} />
      <Innholdstittel className={cls.element("header-txt")}>
        {innhold.title}
      </Innholdstittel>
    </div>
  );
};

export default Dokument;

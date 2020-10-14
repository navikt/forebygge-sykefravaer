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

  const id = innhold && innhold._type;
  const dokumentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (window.location.href.includes(`#${id}`) && dokumentRef.current) {
        dokumentRef.current.scrollIntoView();
        //window.scrollTo({ top: dokumentRef.current.getBoundingClientRect().y });
      }
    }, 0);
  }, [id]);

  if (!innhold) {
    return null;
  }

  const header = innhold.mainImage ? (
    <HeaderWithImage innhold={innhold} />
  ) : (
    <Innholdstittel>{innhold.title}</Innholdstittel>
  );

  return (
    <div className={cls.className} id={id || undefined} ref={dokumentRef}>
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
  return (
    <div className={cls.element("header")}>
      <BlockContent blocks={innhold.mainImage} serializers={serializers} />
      <Innholdstittel className={cls.element("header-txt")}>
        {innhold.title}
      </Innholdstittel>
    </div>
  );
};

export default Dokument;

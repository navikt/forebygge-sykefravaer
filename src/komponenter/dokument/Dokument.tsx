import React from "react";
import BEMHelper from "../../utils/bem";
import "./dokument.less";
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

const Dokument = (props: Props) => {
  return props.innhold ? (
    <div className={cls.className}>
      <div className={cls.element("wrapper")}>
        {documentSetHeader(props.innhold)}
        {props.children}
      </div>
    </div>
  ) : null;
};

const documentSetHeader = (innhold: DocumentTypes) =>
  innhold && innhold.mainImage
    ? headerWithImage(innhold)
    : header(innhold.title);

const headerWithImage = (innhold: DocumentTypes) => {
  return (
    <div className={cls.element("header")}>
      <BlockContent blocks={innhold.mainImage} serializers={serializers} />
      <Innholdstittel className={cls.element("header-txt")} id={innhold.title}>
        {innhold.title}
      </Innholdstittel>
    </div>
  );
};
const header = (txt: string) => <Innholdstittel id={txt}>{txt}</Innholdstittel>;

export default Dokument;

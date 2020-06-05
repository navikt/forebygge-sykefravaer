import React from "react";
import BEMHelper from "../../utils/bem";
import "./dokument.less";
import { Innholdstittel } from "nav-frontend-typografi";
import { DocumentTypes } from "../../sanity-blocks/sanityTypes";

type DocType = DocumentTypes | null;

interface Props {
  innhold: DocType;
  children: React.ReactNode;
}

const Dokument = (props: Props) => {
  const cls = BEMHelper("dokument");
  return props.innhold ? (
    <div className={cls.className}>
      <div className={cls.element("wrapper")}>
        <Innholdstittel>{props.innhold.title}</Innholdstittel>
        {props.children}
      </div>
    </div>
  ) : null;
};

export default Dokument;

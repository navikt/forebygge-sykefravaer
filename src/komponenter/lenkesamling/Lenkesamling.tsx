import React, { FunctionComponent } from "react";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { LenkesamlingInnhold } from "../../sanity-blocks/sanityTypes";
import BEMHelper from "../../utils/bem";

interface Props {
  innhold: LenkesamlingInnhold | null;
}

export const Lenkesamling: FunctionComponent<Props> = (props: Props) => {
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
      {innhold?.lenkeliste.map((element) => (
        <LenkepanelBase key={element._key} border={true} href={element.href}>
          <div className="lenkepanel__heading">
            <Element>{element.lenketekst}</Element>
            {element.undertekst && (
              <Normaltekst>{element.undertekst}</Normaltekst>
            )}
          </div>
        </LenkepanelBase>
      ))}
    </>
  );
};

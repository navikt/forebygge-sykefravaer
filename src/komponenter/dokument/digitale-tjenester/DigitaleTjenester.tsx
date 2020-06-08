import React from "react";
import { DigitalTjeneste } from "../../../sanity-blocks/sanityTypes";
import BEMHelper from "../../../utils/bem";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../../sanity-blocks/serializer";
import { Undertittel } from "nav-frontend-typografi";
import "./digitaleTjenester.less";

interface Props {
  innhold: DigitalTjeneste | null;
}

const cls = BEMHelper("digitaleTjenester");

const DigitaleTjenester = (props: Props) => {
  return props.innhold ? (
    <div className={cls.className}>
      {props.innhold.hovedliste.map((element, index) => {
        return (
          <div className={cls.element("liste-element")} key={index}>
            <div className={cls.element("image")}>
              <BlockContent
                blocks={element.iconImage}
                serializers={serializers}
              />
            </div>
            <div className={cls.element("txt-container")}>
              <div>
                <Undertittel>{element.title}</Undertittel>
              </div>
              <div>
                <BlockContent blocks={element.body} serializers={serializers} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default DigitaleTjenester;

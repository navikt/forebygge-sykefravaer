import React from "react";
import { DigitalTjeneste } from "../../../sanity-blocks/sanityTypes";
import BEMHelper from "../../../utils/bem";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../../sanity-blocks/serializer";
import { Undertittel } from "nav-frontend-typografi";
import "./webinarOgKurs.less";
import Lenkepanel from "nav-frontend-lenkepanel";

interface Props {
  innhold: DigitalTjeneste | null;
}

const cls = BEMHelper("weinarOgKurs");

const WebinarOgKurs = (props: Props) => {
  const { innhold } = props;
  return innhold ? (
    <div className={cls.className}>
      {innhold.hovedliste.map((element, index) => {
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
                <Undertittel className={cls.element("title")}>
                  {element.title}
                </Undertittel>
              </div>
              <div>
              {console.log(innhold)}
                <BlockContent blocks={element.body} serializers={serializers} />
                <Lenkepanel href="https://nav.no" >
test
</Lenkepanel>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default WebinarOgKurs;

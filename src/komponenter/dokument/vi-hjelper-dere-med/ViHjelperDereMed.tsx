import React from "react";
import { VihjelperMed } from "../../../sanity-blocks/sanityTypes";
import BEMHelper from "../../../utils/bem";
import CheckedCircle from "../../../assets/img_tsx/CheckedCircle";
import BlockContent from "@sanity/block-content-to-react";
import "./viHjelperDereMed.less";
import { serializers } from "../../../sanity-blocks/serializer";

interface Props {
  innhold: VihjelperMed | null;
}

const cls = BEMHelper("viHjelperDereMed");

const ViHjelperDereMed = (props: Props) => {
  const setStyle = (element: { color?: [string] }) => {
    if (element.color) {
      return {
        backgroundColor: element.color[0],
        padding: "2rem 1rem",
        borderRadius: "4px",
      };
    }
    return {
      backgroundColor: "#FFFFF",
    };
  };

  return props.innhold ? (
    <div>
      <div className={cls.element("checklist")}>
        {props.innhold.checklist.map((element, index) => {
          return (
            <div className={cls.element("checklist-element")} key={index}>
              <CheckedCircle className={cls.element("checklist-icon")} />
              {element.checkpoint}
            </div>
          );
        })}
      </div>
      <div>
        <BlockContent
          blocks={props.innhold.content}
          serializers={serializers}
        />
      </div>
      <div className={cls.element("hovedlist")}>
        {props.innhold.hovedliste.map((element, index) => {
          return (
            <div className={cls.element("hovedlist-element")} key={index}>
              <div className={cls.element("hovedlist-img")}>
                <BlockContent
                  blocks={element.iconImage}
                  serializers={serializers}
                />
              </div>
              <div className={cls.element("hovedlist-txt")}>
                <BlockContent blocks={element.body} serializers={serializers} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={cls.element("footer")}>
        {props.innhold.footer.map((element, index) => {
          return (
            <div style={setStyle(element)} key={index}>
              <BlockContent
                blocks={element.bodyContent}
                serializers={serializers}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default ViHjelperDereMed;

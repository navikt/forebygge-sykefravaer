import React from "react";
import { HelseIArbeid } from "../../../sanity-blocks/sanityTypes";
import { serializers } from "../../../sanity-blocks/serializer";
import BlockContent from "@sanity/block-content-to-react";

interface Props {
  innhold: HelseIArbeid | null;
}

const Helsearbeid = (props: Props) => {
  const { innhold } = props;
  return innhold ? (
    <div>
      {innhold.body.map((element, index) => {
        return (
          <div key={index}>
            <BlockContent blocks={element} serializers={serializers} />
          </div>
        );
      })}
    </div>
  ) : null;
};

export default Helsearbeid;

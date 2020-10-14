import React from "react";
import BEMHelper from "../../../utils/bem";
import "./webinarOgKurs.less";
import { WebinarOgKursInnhold } from "../../../sanity-blocks/sanityTypes";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../../sanity-blocks/serializer";
import { LenkesamlingMedInnhold } from "../../LenkesamlingMedInnhold/LenkesamlingMedInnhold";
import { NesteNettkurs } from "./NesteNettkurs";

interface Props {
  innhold: WebinarOgKursInnhold | null;
}

const cls = BEMHelper("webinarOgKurs");

const WebinarOgKurs = (props: Props) => {
  const { innhold } = props;

  return innhold ? (
    <div className={cls.className}>
      <div className={cls.element("ingress")}>
        <BlockContent blocks={innhold.ingress} serializers={serializers} />
      </div>
      <NesteNettkurs />
      {innhold?.lenkesamlinger.map((lenkesamlingInnhold) => (
        <LenkesamlingMedInnhold
          innhold={lenkesamlingInnhold}
          key={lenkesamlingInnhold._key}
        />
      ))}
    </div>
  ) : null;
};

export default WebinarOgKurs;

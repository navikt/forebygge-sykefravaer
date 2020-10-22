import React from "react";
import BEMHelper from "../../../utils/bem";
import "./webinarOgKurs.less";
import { WebinarOgKursInnhold } from "../../../sanity-blocks/sanityTypes";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../../sanity-blocks/serializer";
import { NesteNettkurs } from "./NesteNettkurs";
import { KurspåmeldingInnhold } from "../../Kurspåmelding/KurspåmeldingInnhold";
import { TidligereNettkurs } from "../../TidligereNettkurs/TidligereNettkurs";

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
      {innhold?.kurspamelding && (
        <KurspåmeldingInnhold innhold={innhold?.kurspamelding} />
      )}
      {innhold?.tidligerenettkurs && (
        <TidligereNettkurs innhold={innhold?.tidligerenettkurs} />
      )}
    </div>
  ) : null;
};

export default WebinarOgKurs;

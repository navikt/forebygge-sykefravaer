import React, { useEffect, useState } from "react";
import BEMHelper from "../../../utils/bem";
import "./webinarOgKurs.less";
import { WebinarOgKursInnhold } from "../../../sanity-blocks/sanityTypes";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../../sanity-blocks/serializer";
import { LenkesamlingMedInnhold } from "../../LenkesamlingMedInnhold/LenkesamlingMedInnhold";
import { NesteNettkurs } from "./NesteNettkurs";
import { KurspåmeldingInnhold } from "../../Kurspåmelding/KurspåmeldingInnhold";
import { hentRestVideoliste, RestVideoliste } from "../../../kurs/vimeo-api";
import { RestStatus } from "../../../kurs/api-utils";
import { VideoPanel } from "../../VideoPanel/VideoPanel";

interface Props {
  innhold: WebinarOgKursInnhold | null;
}

const cls = BEMHelper("webinarOgKurs");

const WebinarOgKurs = (props: Props) => {
  const { innhold } = props;

  const [restVideoliste, setRestVideoliste] = useState<RestVideoliste>({
    status: RestStatus.IkkeLastet,
  });

  useEffect(() => {
    const hentOgSetRestVideoliste = async () => {
      setRestVideoliste(await hentRestVideoliste());
    };
    hentOgSetRestVideoliste();
  }, [setRestVideoliste]);

  return innhold ? (
    <div className={cls.className}>
      <div className={cls.element("ingress")}>
        <BlockContent blocks={innhold.ingress} serializers={serializers} />
      </div>
      <NesteNettkurs />
      {innhold?.kurspamelding && (
        <KurspåmeldingInnhold innhold={innhold?.kurspamelding} />
      )}
      <VideoPanel restVideoliste={restVideoliste} />
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

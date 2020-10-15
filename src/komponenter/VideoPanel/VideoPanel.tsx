import React, { FunctionComponent } from "react";
import BEMHelper from "../../utils/bem";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { Video } from "../../kurs/vimeo-api";
import "./VideoPanel.less";

interface Props {
  videoer: Video[];
}

export const VideoPanel: FunctionComponent<Props> = (props: Props) => {
  const cls = BEMHelper("videopanel");
  const ANTALL_VIDEOER_SOM_SKAL_VISES: number = 2;
  const videoer = props.videoer;

  if (!videoer || videoer.length === 0) {
    return <></>;
  }

  return (
    <>
      <Element className={cls.element("tittel")}>Siste webinarer</Element>
      {videoer.slice(0, ANTALL_VIDEOER_SOM_SKAL_VISES).map((video: Video) => (
        <Normaltekst className={cls.element("undertekst")}>
          {video.name}
        </Normaltekst>
      ))}
    </>
  );
};

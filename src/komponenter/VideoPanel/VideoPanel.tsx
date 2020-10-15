import React, {FunctionComponent} from "react";
import BEMHelper from "../../utils/bem";
import {Element, Normaltekst} from "nav-frontend-typografi";
import {RestVideoliste, Video} from "../../kurs/vimeo-api";
import "./VideoPanel.less";
import {RestStatus} from "../../kurs/api-utils";

interface Props {
  restVideoliste: RestVideoliste;
}

export const VideoPanel: FunctionComponent<Props> = ({restVideoliste}) => {
  const cls = BEMHelper("videopanel");
  const ANTALL_VIDEOER_SOM_SKAL_VISES: number = 2;

  if (restVideoliste.status !== RestStatus.Suksess || restVideoliste.data.length === 0) {
    return null;
  }
  const videoer: Video[] = restVideoliste.data;

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

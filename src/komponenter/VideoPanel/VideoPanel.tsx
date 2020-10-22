import React, { FunctionComponent } from "react";
import BEMHelper from "../../utils/bem";
import { RestVideoliste, Video } from "../../kurs/vimeo-api";
import "./VideoPanel.less";
import { RestStatus } from "../../kurs/api-utils";
import { Videolenke } from "./Videolenke/Videolenke";

interface Props {
  restVideoliste: RestVideoliste;
}

export const VideoPanel: FunctionComponent<Props> = ({ restVideoliste }) => {
  const cls = BEMHelper("videopanel");
  const ANTALL_VIDEOER_SOM_SKAL_VISES: number = 2;

  if (
    restVideoliste.status !== RestStatus.Suksess ||
    restVideoliste.data.length === 0
  ) {
    return null;
  }
  const videoer: Video[] = restVideoliste.data;

  return (
    <>
      <div className={cls.element("videoer")}>
        {videoer.slice(0, ANTALL_VIDEOER_SOM_SKAL_VISES).map((video: Video, index) => (
          <Videolenke video={video} key={index} />
        ))}
      </div>
    </>
  );
};

import React, { FunctionComponent } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import {getUrlTilThumbnail, Video} from "../../../kurs/vimeo-api";
import BEMHelper from "../../../utils/bem";
import "./Videolenke.less";

interface Props {
  video: Video;
}


export const Videolenke: FunctionComponent<Props> = (props) => {
  const cls = BEMHelper("videolenke");
  const video = props.video;

    return (
    <a className={cls.className} href={video.link}>
      <img
        src={getUrlTilThumbnail(video)}
        alt="Forhåndsvisning av video"
        className={cls.element("bilde")}
      />
      <Normaltekst className={cls.element("undertekst")} tag="span">
        {video.name}
      </Normaltekst>
    </a>
  );
};

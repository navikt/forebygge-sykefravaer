import React, { FunctionComponent } from "react";
import { Kurs, RestKursliste } from "../../kurs/kurs-api";
import { RestStatus } from "../../kurs/api-utils";
import { getNesteWebinarOmIA } from "../../kurs/kurs-utils";
import "./NesteIAWebinar.less";

interface Props {
  restKursliste: RestKursliste;
}

const getLenkeTilKurspåmelding = (kurs: Kurs): string =>
  `https://arbeidsgiver.nav.no/kursoversikt/${kurs.id}`;

export const NesteIAWebinar: FunctionComponent<Props> = (props) => {
  if (props.restKursliste.status !== RestStatus.Suksess) {
    return null;
  }
  const nesteWebinar = getNesteWebinarOmIA(props.restKursliste.data);
  if (!nesteWebinar) {
    return null;
  }

  return (
    <div className="neste-ia-webinar">
      Neste webinar:{" "}
      <a className="lenke" href={getLenkeTilKurspåmelding(nesteWebinar)}>
        {nesteWebinar.tittel} ({nesteWebinar.start})
      </a>
    </div>
  );
};

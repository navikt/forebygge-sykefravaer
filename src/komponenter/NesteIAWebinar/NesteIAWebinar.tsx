import React, { FunctionComponent, useEffect, useState } from "react";
import { hentRestKurs, Kurs, RestKursliste } from "../../kurs/kurs-api";
import { RestStatus } from "../../kurs/api-utils";
import { getNesteWebinarOmIA } from "../../kurs/kurs-utils";
import "./NesteIAWebinar.less";

export const NesteWebinar: FunctionComponent = () => {
  // TODO Dette er en midlertidig komponent som henter kurs og wrapper NesteIAWebinar.
  // Logikken må flyttes til den naturlige wrapper-komponenten, eventuelt App.tsx.
  const [restKursliste, setRestKursliste] = useState<RestKursliste>({
    status: RestStatus.IkkeLastet,
  });

  useEffect(() => {
    const hentOgSetRestKurs = async () => {
      setRestKursliste(await hentRestKurs());
    };
    hentOgSetRestKurs();
  }, [setRestKursliste]);

  return <NesteIAWebinar restKursliste={restKursliste} />;
};

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

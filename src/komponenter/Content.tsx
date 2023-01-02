import React, { useContext, useEffect } from 'react';
import { ForebyggeSykefravaerContext } from './InnholdContext';
import Dokument from './dokument/Dokument';
import ViHjelperDereMed from './dokument/vi-hjelper-dere-med/ViHjelperDereMed';
import DigitaleTjenester from './dokument/digitale-tjenester/DigitaleTjenester';
import WebinarOgKurs from './dokument/webinar-og-kurs/WebinarOgKurs';
import OppfolgingFraNav from './dokument/oppfolging-fra-nav/OppfolgingFraNav';
import Helsearbeid from './dokument/helsearbeid/HelseArbeid';
import IaAvtalen from './dokument/ia-avtalen/IaAvtalen';
import { calcWidth } from '../utils/document-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { logEvent } from '../amplitude/logevents';

const Content = () => {
    const {
        viHjelper,
        tjenester,
        webinarogkurs,
        oppfolging,
        helsearbeid,
        iaavtale,
        sanityFetchError,
    } = useContext(ForebyggeSykefravaerContext);

    const [width, setWidth] = useState(calcWidth(1, 2));
    useEffect(() => {
        logEvent("sidevisning")
        window.addEventListener('resize', () => setWidth(calcWidth(1, 2)));
        return () => window.removeEventListener('resize', () => setWidth(calcWidth(1, 2)));
    }, []);

    if (sanityFetchError) {
        return (
            <AlertStripeFeil>
                En feil har oppstått ved henting av innhold, vennligst last inn siden på nytt.
            </AlertStripeFeil>);
    }

    return (
        <div>
            <Dokument innhold={viHjelper}>
                <ViHjelperDereMed innhold={viHjelper} />
            </Dokument>
            <Dokument innhold={tjenester}>
                <DigitaleTjenester innhold={tjenester} />
            </Dokument>
            <Dokument innhold={webinarogkurs}>
                <WebinarOgKurs innhold={webinarogkurs} />
            </Dokument>
            <Dokument innhold={oppfolging}>
                <OppfolgingFraNav innhold={oppfolging} />
            </Dokument>
            <Dokument innhold={helsearbeid}>
                <Helsearbeid innhold={helsearbeid} />
            </Dokument>
            <Dokument innhold={iaavtale}>
                <IaAvtalen innhold={iaavtale} />
            </Dokument>
        </div>
    );
};

export default Content;

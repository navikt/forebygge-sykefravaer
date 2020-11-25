import React, { useEffect, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import './webinarOgKurs.less';
import { WebinarOgKursInnhold } from '../../../sanity-blocks/sanityTypes';
import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '../../../sanity-blocks/serializer';
import { NesteNettkurs } from './NesteNettkurs';
import { KurspåmeldingInnhold } from './Kurspåmelding/KurspåmeldingInnhold';
import { TidligereNettkurs } from '../../TidligereNettkurs/TidligereNettkurs';
import { hentRestKurs, RestKursliste } from '../../../kurs/kurs-api';
import { RestStatus } from '../../../kurs/api-utils';
import { getNesteNettkurs } from '../../../kurs/kurs-utils';

interface Props {
    innhold: WebinarOgKursInnhold | null;
}

const cls = BEMHelper('webinarOgKurs');

const WebinarOgKurs = (props: Props) => {
    const { innhold } = props;

    const [restKursliste, setRestKursliste] = useState<RestKursliste>({
        status: RestStatus.IkkeLastet,
    });

    useEffect(() => {
        const hentOgSetRestKurs = async () => {
            setRestKursliste(await hentRestKurs());
        };
        hentOgSetRestKurs();
    }, [setRestKursliste]);

    const nesteNettkurs = getNesteNettkurs(
        restKursliste.status === RestStatus.Suksess ? restKursliste.data : []
    );

    return innhold ? (
        <div className={cls.className}>
            <div className={cls.element('ingress')}>
                <BlockContent blocks={innhold.ingress} serializers={serializers} />
            </div>
            <NesteNettkurs nesteNettkurs={nesteNettkurs} />
            {innhold?.kurspamelding && (
                <KurspåmeldingInnhold
                    innhold={innhold?.kurspamelding}
                    nesteNettkurs={nesteNettkurs}
                />
            )}
            {innhold?.tidligerenettkurs && (
                <TidligereNettkurs innhold={innhold?.tidligerenettkurs} />
            )}
        </div>
    ) : null;
};

export default WebinarOgKurs;

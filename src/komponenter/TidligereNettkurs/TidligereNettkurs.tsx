import React, { useEffect, useState } from 'react';
import { TidligereNettkursInnhold } from '../../sanity-blocks/sanityTypes';
import BEMHelper from '../../utils/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { VideoPanel } from '../VideoPanel/VideoPanel';
import { LenkepanelMedInnhold } from '../LenkepanelMedInnhold/LenkepanelMedInnhold';
import { hentRestVideoliste, RestVideoliste } from '../../kurs/vimeo-api';
import { RestStatus } from '../../kurs/api-utils';
import './TidligereNettkurs.less';

interface Props {
    innhold: TidligereNettkursInnhold | null;
}

const cls = BEMHelper('tidligerenettkurs');

export const TidligereNettkurs = (props: Props) => {
    const innhold = props.innhold;

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
            <Element className={cls.element('tittel')}>{innhold.tittel}</Element>
            {innhold?.nyestopptakUndertekst && (
                <Normaltekst className={cls.element('undertekst')}>
                    {innhold?.nyestopptakUndertekst}
                </Normaltekst>
            )}
            <VideoPanel restVideoliste={restVideoliste} />
            {innhold?.alleopptakUndertekst && (
                <Normaltekst className={cls.element('undertekst')}>
                    <span className="bold">{innhold?.alleopptakUndertekst}</span>
                </Normaltekst>
            )}
            {innhold?.lenker.map((lenke) => (
                <LenkepanelMedInnhold innhold={lenke} key={lenke._key} />
            ))}
        </div>
    ) : null;
};

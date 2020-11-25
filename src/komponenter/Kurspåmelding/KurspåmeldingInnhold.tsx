import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Kurspåmelding } from '../../sanity-blocks/sanityTypes';
import BEMHelper from '../../utils/bem';
import './KurspåmeldingInnhold.less';
import { LenkepanelMedInnhold } from '../LenkepanelMedInnhold/LenkepanelMedInnhold';

interface Props {
    innhold: Kurspåmelding | null;
}

export const KurspåmeldingInnhold: FunctionComponent<Props> = (props: Props) => {
    const cls = BEMHelper('kurspåmeldingInnhold');
    const innhold = props.innhold;

    if (!innhold) {
        return <></>;
    }

    return (
        <>
            <Element className={cls.element('tittel')}>{innhold.tittel}</Element>
            {innhold.undertekst && (
                <Normaltekst className={cls.element('undertekst')}>
                    {innhold.undertekst}
                </Normaltekst>
            )}
            {innhold?.lenke && <LenkepanelMedInnhold innhold={innhold?.lenke} />}
        </>
    );
};

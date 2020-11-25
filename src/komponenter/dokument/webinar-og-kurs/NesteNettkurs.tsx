import React, { FunctionComponent } from 'react';
import { Kurs } from '../../../kurs/kurs-api';
import { formatterKursdato } from '../../../kurs/kurs-utils';
import nesteNettkursIkon from './neste-nettkurs-ikon.svg';
import './NesteNettkurs.less';
import BEMHelper from '../../../utils/bem';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    nesteNettkurs: Kurs | undefined;
}

export const NesteNettkurs: FunctionComponent<Props> = ({ nesteNettkurs }) => {
    const cls = BEMHelper('nesteNettkurs');
    if (!nesteNettkurs) {
        return null;
    }
    return (
        <div className={cls.className}>
            <img src={nesteNettkursIkon} className={cls.element('ikon')} alt="" />
            <Normaltekst>Neste nettkurs er: {formatterKursdato(nesteNettkurs?.start)}</Normaltekst>
        </div>
    );
};

import React, { useContext, useEffect, useState } from 'react';
import BEMHelper from '../../utils/bem';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { ForebyggeSykefravaerContext, Overskrift } from '../InnholdContext';
import throttle from 'lodash.throttle';
import './meny.less';

const cls = BEMHelper('meny');

const Meny = () => {
    const { overskrifter } = useContext(ForebyggeSykefravaerContext);
    const [sectionInFocus, setSectionInFocus] = useState<number>(0);

    useEffect(() => {
        const scrollHeight = () => window.scrollY || window.pageYOffset;
        const hoppLenkerScrollheight = () =>
            overskrifter
                .map((section) => document.getElementById(section.id))
                .map((sectionNode) => (sectionNode ? sectionNode.offsetTop : 0));

        const setFocusIndex = () =>
            hoppLenkerScrollheight().map((scrollheight, index) => {
                if (scrollheight - 250 < scrollHeight()) {
                    return setSectionInFocus(index);
                }
                return null;
            });

        const throttleScrollevent = throttle(() => setFocusIndex(), 75);

        window.onscroll = function() {
            throttleScrollevent();
        };
        }, [overskrifter]);


    if (overskrifter.length === 0) {
        return null;
    }

    return (
        <div className={cls.className}>
            <div className={cls.element('container')}>
                <div className={cls.element('content')}>
                    <Undertittel className={cls.element('tittel')}>
                        Innhold på denne siden:
                    </Undertittel>
                    <ul className={cls.element('oversiktsliste')}>
                        {overskrifter.map((overskrift: Overskrift, index: number) => {
                            return (
                                <li>
                                    <Normaltekst
                                        className={cls.element(
                                            'lenke',
                                            sectionInFocus === index ? 'bold' : '',
                                        )}
                                        key={index}
                                    >
                                        <Lenke href={'#'.concat(overskrift.id)}
                                               ariaLabel={'Gå til seksjon '.concat(overskrift.tekst)}>
                                            {overskrift.tekst}
                                        </Lenke>
                                    </Normaltekst>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Meny;

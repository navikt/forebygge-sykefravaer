import React, { useContext, useEffect, useState } from 'react';
import BEMHelper from '../../utils/bem';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { ForebyggeSykefravaerContext, Overskrift } from '../InnholdContext';
import throttle from 'lodash.throttle';
import MenuButton from './menu-button/MenuButton';
import './meny.less';
import { initmenuPosition, setScroll } from '../../utils/menu-utils';
import { isMobil } from '../../utils/document-utils';

const cls = BEMHelper('meny');

const Meny = () => {
    const { overskrifter } = useContext(ForebyggeSykefravaerContext);
    const [sectionInFocus, setSectionInFocus] = useState<number>(0);
    const [viewmobilMenu, setViewmobilMenu] = useState<boolean>(false);
    const [buttonStyling, setButtonStyling] = useState<any>(initmenuPosition());

    const toggleButton = () => setViewmobilMenu(!viewmobilMenu);

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
        const dispatchmobilevent = () => (isMobil() ? setButtonStyling(setScroll()) : null);

        window.onscroll = function() {
            throttleScrollevent();
            dispatchmobilevent();
        };

        window.addEventListener('resize', () => setButtonStyling(initmenuPosition()));
        return () =>
            window.removeEventListener('resize', () => setButtonStyling(initmenuPosition()));
    }, [overskrifter]);


    if (overskrifter.length === 0) {
        return null;
    }

    return (
        <div className={cls.className} style={{ marginTop: `${buttonStyling}px` }}>
            <div className={cls.element('wrapper')}>
                <MenuButton on={viewmobilMenu} change={toggleButton} />
                <div className={cls.element('container', viewmobilMenu ? '' : 'closed')}>
                    <div className={cls.element('content')}>
                        <Undertittel className={cls.element('tittel')}>
                            Innhold på denne siden:
                        </Undertittel>
                        {overskrifter.map((overskrift: Overskrift, index: number) => {
                            return (
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
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Meny;

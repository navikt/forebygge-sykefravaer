import React from 'react';
import BEMHelper from '../../utils/bem';
import { Sidetittel } from 'nav-frontend-typografi';
import './banner.less';


const Banner = () => {
    const cls = BEMHelper('banner');
    return (
        <>
            <div
                className={cls.className}
                role="banner"
                aria-roledescription="site banner"
            >
                <div className={cls.element('tekst')}>
                    <Sidetittel>
                        Forebygge og redusere sykefravær og frafall
                    </Sidetittel>
                </div>
                
                <div className={cls.element('bunnlinje')} />
            </div>
        </>
    );
};

export default Banner;

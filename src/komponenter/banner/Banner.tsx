import React, { useEffect, useState } from 'react';
import BEMHelper from '../../utils/bem';
import TypografiBase from 'nav-frontend-typografi';
import ForebyggeSykefravaerIcon from '../../assets/img_tsx/ForebyggeSykefravaerIcon';
import { calcImageSize, calcTextSize, ImageSize, TypographySize } from '../../utils/banner-utils';
import './banner.less';

const Banner = () => {
    const [txtSize, setTxtSize] = useState<TypographySize>(calcTextSize);
    const [imagesize, setImagesize] = useState<ImageSize>(calcImageSize);

    useEffect(() => {
        const setHeaderTekst = () => {
            setTxtSize(calcTextSize);
            setImagesize(calcImageSize);
        };
        window.addEventListener('resize', setHeaderTekst);
        return () => window.removeEventListener('resize', setHeaderTekst);
    }, []);

    const cls = BEMHelper('banner');
    return (
        <>
            <div className={cls.className}>
                <div className={cls.element('wrapper')}>
                    <div className={cls.element('tekst')}>
                            <TypografiBase type={txtSize}>
                                Forebygge og redusere sykefravær og frafall
                            </TypografiBase>
                    </div>
                    <div className={cls.element('image')}>
                        <ForebyggeSykefravaerIcon
                            height={imagesize.height}
                            width={imagesize.width}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;

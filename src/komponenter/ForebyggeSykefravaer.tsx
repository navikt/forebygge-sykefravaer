import React from 'react';
import BEMHelper from '../utils/bem';
import Banner from './banner/Banner';
import Meny from './meny/Meny';
import './forebyggeSykefravaer.less';
import Content from './Content';
import InnholdContext from './InnholdContext';

const MAIN_CLASSNAME = 'forebyggeSykefravaer';
const cls = BEMHelper(MAIN_CLASSNAME);

const ForebyggeSykefravaer = () => {
    return (
        <InnholdContext>
            <div className={cls.className}>
                <Banner />
                <div className={cls.element('wrapper')}>
                    <div className={cls.element('content')}>
                        <Meny />
                        <Content />
                    </div>
                </div>
            </div>
        </InnholdContext>
    );
};

export default ForebyggeSykefravaer;

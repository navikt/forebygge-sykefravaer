import React from 'react';
import BEMHelper from "../utils/bem";
import Banner from "./banner/Banner";

const MAIN_CLASSNAME = 'forebyggeSykefravaer';
const cls = BEMHelper(MAIN_CLASSNAME);


const ForebyggeSykefravaer = () => {

    return (
        <div className={cls.className}>
            <Banner />
        </div>
    )
};

export default ForebyggeSykefravaer;

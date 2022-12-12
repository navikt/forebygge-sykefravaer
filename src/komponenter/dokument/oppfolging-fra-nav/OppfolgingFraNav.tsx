import React from 'react';
import { BodyContent, Oppfolging } from '../../../sanity-blocks/sanityTypes';
import AlertStripe from 'nav-frontend-alertstriper';
import BlockContent from '@sanity/block-content-to-react';
import { serializers, setStyle } from '../../../sanity-blocks/serializer';
import BEMHelper from '../../../utils/bem';
import { Systemtittel } from 'nav-frontend-typografi';
import './oppfolgingFraNav.less';

interface Props {
    innhold: Oppfolging | null;
    width: number;
}

const cls = BEMHelper('oppfolgingFraNav');

const OppfolgingFraNav = (props: Props) => {
    const { innhold } = props;

    return innhold ? (
        <div className={cls.className}>
            <div>
                {innhold.alertstripe?.map((element, index) => {
                    return (
                        <div className={cls.element('alert-row')} key={index}>
                            <AlertStripe type={element.alertType[0]}>
                                <BlockContent blocks={element.innhold} serializers={serializers} />
                            </AlertStripe>
                        </div>
                    );
                })}
            </div>
            <div>
                {innhold.body.map((element, index) => {
                    return (
                        <div className={cls.element('content-block')} key={index}>
                            {setTitle(element)}
                            <div style={setStyle(element, props.width)}>
                                <BlockContent
                                    blocks={element.bodyContent}
                                    serializers={serializers}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : null;
};

const setTitle = (element: BodyContent) =>
    element.title ? (
        <Systemtittel className={cls.element('header')}>{element.title}</Systemtittel>
    ) : null;

export default OppfolgingFraNav;

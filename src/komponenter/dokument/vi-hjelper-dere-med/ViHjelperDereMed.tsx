import React from 'react';
import { VihjelperMed } from '../../../sanity-blocks/sanityTypes';
import BEMHelper from '../../../utils/bem';
import CheckedCircle from '../../../assets/img_tsx/CheckedCircle';
import BlockContent from '@sanity/block-content-to-react';
import './viHjelperDereMed.less';
import { serializers, setStyle } from '../../../sanity-blocks/serializer';

interface Props {
    innhold: VihjelperMed | null;
    width: number;
}

const cls = BEMHelper('viHjelperDereMed');

const ViHjelperDereMed = (props: Props) => {
    return props.innhold ? (
        <div>
            <ul className={cls.element('checklist')}>
                {props.innhold.checklist.map((element, index) => {
                    return (
                        <li className={cls.element('checklist-element')} key={index}>
                            <CheckedCircle className={cls.element('checklist-icon')} />
                            {element.checkpoint}
                        </li>
                    );
                })}
            </ul>
            <div>
                <BlockContent blocks={props.innhold.content} serializers={serializers} />
            </div>
            <div className={cls.element('hovedlist')}>
                {props.innhold.hovedliste.map((element, index) => {
                    return (
                        <div className={cls.element('hovedlist-element')} key={index}>
                            <div className={cls.element('hovedlist-img')}>
                                <BlockContent
                                    blocks={element.iconImage}
                                    serializers={serializers}
                                />
                            </div>
                            <div className={cls.element('hovedlist-txt')}>
                                <BlockContent blocks={element.body} serializers={serializers} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={cls.element('footer')}>
                {props.innhold.footer.map((element, index) => {
                    return (
                        <div style={setStyle(element, props.width)} key={index}>
                            <BlockContent blocks={element.bodyContent} serializers={serializers} />
                        </div>
                    );
                })}
            </div>
        </div>
    ) : null;
};

export default ViHjelperDereMed;

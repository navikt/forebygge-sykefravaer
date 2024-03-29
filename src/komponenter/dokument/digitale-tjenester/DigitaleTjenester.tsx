import React from 'react';
import { DigitalTjeneste } from '../../../sanity-blocks/sanityTypes';
import BEMHelper from '../../../utils/bem';
import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '../../../sanity-blocks/serializer';
import { Undertittel } from 'nav-frontend-typografi';
import './digitaleTjenester.less';
import { Nyhet } from '../../Nyhet/Nyhet';

interface Props {
    innhold: DigitalTjeneste | null;
}

const cls = BEMHelper('digitaleTjenester');

const DigitaleTjenester = (props: Props) => {
    const { innhold } = props;
    return innhold ? (
        <div className={cls.className}>
            {innhold.hovedliste.map((element, index) => {
                return (
                    <div className={cls.element('liste-element')} key={index}>
                        <div className={cls.element('image')}>
                            <BlockContent blocks={element.iconImage} serializers={serializers} />
                        </div>
                        <div className={cls.element('txt-container')}>
                            <div>
                                <Undertittel tag="h3" className={cls.element('title')}>
                                    {element.title}{' '}
                                    {element.nyhet && <Nyhet className={cls.element('nyhet')} />}
                                </Undertittel>
                            </div>
                            <div>
                                <BlockContent blocks={element.body} serializers={serializers} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    ) : null;
};

export default DigitaleTjenester;

import React from 'react';
import { IAavtalen } from '../../../sanity-blocks/sanityTypes';
import { serializers } from '../../../sanity-blocks/serializer';
import BlockContent from '@sanity/block-content-to-react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import BEMHelper from '../../../utils/bem';
import './iaAvtalen.less';

interface Props {
    innhold: IAavtalen | null;
}

const cls = BEMHelper('ia-avtalen');

const IaAvtalen = (props: Props) => {
    const { innhold } = props;
    return innhold ? (
        <div className={cls.className}>
            <div className={cls.element('content')}>
                {innhold.body.map((element, index) => {
                    return (
                        <div key={index}>
                            <BlockContent blocks={element} serializers={serializers} />
                        </div>
                    );
                })}
            </div>
            <div>
                <Ekspanderbartpanel tittel={innhold.list.title}>
                    {innhold.list.listElement.map((element, index) => {
                        return (
                            <div key={index} className={cls.element('nedtrekk-element')}>
                                <BlockContent blocks={element.tekst} serializers={serializers} />
                            </div>
                        );
                    })}
                </Ekspanderbartpanel>
            </div>
        </div>
    ) : null;
};

export default IaAvtalen;

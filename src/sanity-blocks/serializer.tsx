import {
    Element,
    Ingress,
    Innholdstittel,
    Normaltekst,
    Sidetittel,
    Systemtittel,
    Undertittel,
} from 'nav-frontend-typografi';
import React, { CSSProperties } from 'react';
import { sanityImageLink, TextBlock, TypographyStyle } from './sanityTypes';
import Lenke from 'nav-frontend-lenker';
import { logNavigeringTilEksternSide } from '../amplitude/logevents';

const typographyComponents = {
    [TypographyStyle.H1]: Sidetittel,
    [TypographyStyle.H2]: Innholdstittel,
    [TypographyStyle.H3]: Systemtittel,
    [TypographyStyle.H4]: Undertittel,
    [TypographyStyle.H5]: Ingress,
    [TypographyStyle.H6]: Element,
    [TypographyStyle.Normal]: Normaltekst,
};

const typographyTags = new Map([
        [Sidetittel, 'h1'],
        [Innholdstittel, 'h2'],
        [Systemtittel, 'h2'],
        [Undertittel, 'h3'],
        [Ingress, 'strong'],
        [Element, undefined],
        [Normaltekst, undefined],
    ])
;

const Whitespace = ({ innhold }: { innhold: TextBlock }): React.ReactElement => {
    return (
        <>
            {textBlockSerializer(innhold)}
            <br />
        </>
    );
};

const textBlockSerializer = (block: TextBlock) => {
    const TypographyComponent = typographyComponents[block.node.style] || typographyComponents[TypographyStyle.Normal];
    const typograptyTag = typographyTags.get(TypographyComponent);
    return <TypographyComponent tag={typograptyTag}>{block.children}</TypographyComponent>;
};

const serializeCheck = (block: TextBlock) => {
    return block.children[block.children.length - 1] !== '' ? (
        textBlockSerializer(block)
    ) : (
        <Whitespace innhold={block} />
    );
};

const imageSerializer = (props: any) => (
    <img src={sanityImageLink(props.node.asset._ref)} aria-hidden={true} alt='' />
);

const colorMarks = (props: any) => (
    <span style={{ backgroundColor: props.mark.hex }}>{props.children}</span>
);

const link = (props: any) => (
    <Lenke href={props.mark.href} onClick={(event) => logNavigeringTilEksternSide(event, props.mark.href)}>
        {props.children.map((elem: string) => elem)}
    </Lenke>
);

export const setStyle = (element: { color?: [string] }, width: number): CSSProperties => {
    if (element.color) {
        return {
            backgroundColor: element.color[0],
            padding: `1.5rem ${width}rem`,
            borderRadius: '4px',
        };
    }
    return {
        backgroundColor: '#FFFFF',
    };
};

export const serializers = {
    types: {
        block: serializeCheck,
        image: imageSerializer,
    },
    marks: {
        color: colorMarks,
        link: link,
    },
};

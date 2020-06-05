import {
  Element,
  Ingress,
  Innholdstittel,
  Normaltekst,
  Sidetittel,
  Systemtittel,
  Undertittel,
} from "nav-frontend-typografi";
import React from "react";
import { sanityImageLink, TextBlock, TypoStyle } from "./sanityTypes";

const typoComponents = {
  [TypoStyle.H1]: Sidetittel,
  [TypoStyle.H2]: Innholdstittel,
  [TypoStyle.H3]: Systemtittel,
  [TypoStyle.H4]: Undertittel,
  [TypoStyle.H5]: Ingress,
  [TypoStyle.H6]: Element,
  [TypoStyle.Normal]: Normaltekst,
};

const Whitespace = ({
  innhold,
}: {
  innhold: TextBlock;
}): React.ReactElement => {
  return (
    <>
      {blockSerializer(innhold)}
      <br />
    </>
  );
};

const blockSerializer = (block: TextBlock) => {
  const TypoComponent =
    typoComponents[block.node.style] || typoComponents[TypoStyle.Normal];
  return <TypoComponent>{block.children}</TypoComponent>;
};

const serializeCheck = (block: TextBlock) => {
  return block.children[block.children.length - 1] !== "" ? (
    blockSerializer(block)
  ) : (
    <Whitespace innhold={block} />
  );
};

const imageSerializer = (props: any) => (
  <img src={sanityImageLink(props.node.asset._ref)} alt={"illustrasjon"} />
);

const colorMarks = (props: any) => {
  console.log("props => ", props);
  return (
    <span style={{ backgroundColor: props.mark.hex }}>{props.children}</span>
  );
};

export const serializers = {
  types: {
    block: serializeCheck,
    image: imageSerializer,
  },
  marks: {
    color: colorMarks,
  },
};

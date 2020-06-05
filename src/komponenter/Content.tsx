import React, { useContext, useEffect, useState } from "react";
import { fetchsanityJSON, isProduction } from "../utils/fetch-utils";
import BlockContent from "@sanity/block-content-to-react";
import { sanityImageLink } from "../sanity-blocks/sanityTypes";
import { ForebyggeSykefravaerContext } from "./InnholdContext";
import Dokument from "./dokument/Dokument";
import ViHjelperDereMed from "./dokument/vi-hjelper-dere-med/ViHjelperDereMed";

const serializers = {
  types: {
    image: (props: any) => (
      <figure>
        <img src={sanityImageLink(props.node.asset._ref)} />
      </figure>
    ),
  },
};

const Content = () => {
  const {
    viHjelper,
    tjenester,
    oppfolging,
    helsearbeid,
    iaavtale,
  } = useContext(ForebyggeSykefravaerContext);

  const [sanityJson, setSanityJson] = useState<any>(null);
  useEffect(() => {
    const url = isProduction();
    fetchsanityJSON(url)
      .then((res) => {
        setSanityJson(res.data[1].mainImage);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div>
      {console.log("viHjelper", viHjelper)}
      <Dokument innhold={viHjelper}>
        <ViHjelperDereMed innhold={viHjelper} />
      </Dokument>
      {/*
      <div>
        {sanityJson ? (
          <BlockContent blocks={sanityJson} serializers={serializers} />
        ) : null}
      </div>
          */}
    </div>
  );
};

export default Content;

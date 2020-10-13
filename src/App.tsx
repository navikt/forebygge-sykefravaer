import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Redirect from "./komponenter/Redirect";
import ForebyggeSykefravaer from "./komponenter/ForebyggeSykefravaer";
import "./App.less";
import { RestStatus } from "./kurs/api-utils";
import { hentRestKurs, RestKursliste } from "./kurs/kurs-api";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { getNesteWebinarOmIA } from "./kurs/kurs-utils";

function App() {
  const [restKursliste, setRestKursliste] = useState<RestKursliste>({
    status: RestStatus.IkkeLastet,
  });

  useEffect(() => {
    const hentOgSetRestKurs = async () => {
      setRestKursliste(await hentRestKurs());
    };
    hentOgSetRestKurs();
  }, [setRestKursliste]);

  return (
    <BrowserRouter>
      <div className="forebygge-sykefravaer">
        <Switch>
          <Redirect>
            <main id="maincontent">
              <Ekspanderbartpanel tittel={"kurs"}>
                <pre>
                  {restKursliste.status === RestStatus.Suksess &&
                    JSON.stringify(
                      getNesteWebinarOmIA(restKursliste.data),
                      null,
                      2
                    )}
                </pre>
              </Ekspanderbartpanel>
              <Route
                path={"/forebygge-sykefravaer"}
                component={ForebyggeSykefravaer}
                exact={true}
              />
            </main>
          </Redirect>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

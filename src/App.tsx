import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Redirect from "./komponenter/Redirect";
import ForebyggeSykefravaer from "./komponenter/ForebyggeSykefravaer";

function App() {
  return (
    <BrowserRouter>
      <div className="forebygge-sykefravaer">
        <Switch>
          <Redirect>
            <Route
              path={"/forebygge-sykefravaer"}
              component={ForebyggeSykefravaer}
              exact={true}
            />
          </Redirect>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

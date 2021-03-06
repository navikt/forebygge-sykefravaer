import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Redirect from './komponenter/Redirect';
import ForebyggeSykefravaer from './komponenter/ForebyggeSykefravaer';
import './App.less';

function App() {
    return (
        <BrowserRouter>
            <div className="forebygge-sykefravaer">
                <Switch>
                    <Redirect>
                        <main id="maincontent">
                            <Route
                                path={'/forebygge-sykefravaer'}
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

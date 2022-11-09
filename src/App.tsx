import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ForebyggeSykefravaer from './komponenter/ForebyggeSykefravaer';
import './App.less';

function App() {
    return (
        <BrowserRouter>
            <div className="forebygge-sykefravaer">
                <main id="maincontent">
                    <Routes>
                        <Route path={"/"} element={<Navigate to={'/forebygge-sykefravaer'} />} />
                        <Route
                            path={'/forebygge-sykefravaer'}
                            element={<ForebyggeSykefravaer />}
                        />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;

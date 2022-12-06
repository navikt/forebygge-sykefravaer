import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ForebyggeSykefravaer from './komponenter/ForebyggeSykefravaer';
import './App.less';

function App() {
    return (
        <BrowserRouter>
            <main id='maincontent' role='main' tabIndex={-1}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/forebygge-sykefravaer'} />} />
                    <Route
                        path={'/forebygge-sykefravaer'}
                        element={<ForebyggeSykefravaer />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;

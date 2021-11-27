import {Routes, Route } from "react-router-dom";
import './css/App.css';
import React from "react";

import Login from "./Login";
import Processes from "./Processes";
import JobDescTemp from './JobDescTemp/JobDescTemp';
import JobDescTempFinal from "./JobDescTemp/JobDescTempFinal";
import Screening from "./Screening/Screening";
import ScreeningFinal from "./Screening/ScreeningFinal";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Processes" element={<Processes/>} />
        <Route path="/JobDescTemp" element={<JobDescTemp />} />
        <Route path="/JobDescTempFinal" element={<JobDescTempFinal/>} />
        <Route path="/Screening" element={<Screening />} />
        <Route path="/ScreeningFinal" element={<ScreeningFinal />} />
      </Routes>

    </div>
  );
}

export default App;

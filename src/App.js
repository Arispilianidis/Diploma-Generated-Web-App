import {Routes, Route } from "react-router-dom";
import './css/App.css';
import React from "react";

import Login from "./Login";
import Processes from "./Processes";
import JobDescTemp from './JobDescTemp/JobDescTemp';
import JobDescTempFinal from "./JobDescTemp/JobDescTempFinal";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Processes" element={<Processes/>} />
        <Route path="/JobDescTemp" element={<JobDescTemp />} />
        <Route path="/JobDescTempFinal" element={<JobDescTempFinal/>} />
      </Routes>

    </div>
  );
}

export default App;

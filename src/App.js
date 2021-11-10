import {Routes, Route } from "react-router-dom";
import './css/App.css';
import React from "react";


import Home from './Home';
import Login from "./Login";
import Processes from "./Processes";
import JobDescTempFinal from "./JobDescTemp/JobDescTempFinal";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Processes" element={<Processes/>} />
        <Route path="/JobDescTempFinal" element={<JobDescTempFinal/>} />
        {/*<Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>

    </div>
  );
}

export default App;

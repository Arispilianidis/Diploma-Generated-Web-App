import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Candidates from './Candidates';
import CurrentDate from './components/CurrentDate';
import axios from 'axios'
import './css/Tables.css'


function Processes() {

    const { state } = useLocation();
    const serverUserInfo = state[0]
    console.log(serverUserInfo)
    const navigate = useNavigate();

    const [candidates, setCandidates] = useState(null)
    const [error, setError] = useState(null);

    const [showCandidates, setShowCandidates] = useState(false)

    function goto(event) {

        let processName = event.target.textContent
        navigate("/" + processName, { state: [serverUserInfo, processName] })
    }

    function createProcessDropdownMenu() {

        //TODO: Egw logika apo M2t pairnw ta Processes
        return serverUserInfo.assignedProcesses.map((element) => {
            return <li key={element} onClick={goto} style={{ cursor: 'pointer', marginLeft: 10, marginBottom: 10 }}>{element}</li>
        });

    }

    function getCandidates(event) {

        let JobDescTempOfScrenningProcess = event.target.textContent
        console.log(JobDescTempOfScrenningProcess)

        axios.get("http://localhost:3000/JobDescTempCandidates", {
            params: { JobDescTempOfScrenningProcess: JobDescTempOfScrenningProcess },
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response.data.data)
                setCandidates(response.data.data)
            })
            .then(() => {
                setShowCandidates(true)
            })
            .catch(error => {
                console.log("Error at get Candidates => " + error.message)
                setError(error)
            })

    }

    function createCandidatesDropdownMenu() {

        let JobDescTempOfScrenningProcesses = [
            "JobDescTemp",
            "JobDescTemp1"
        ]

        return JobDescTempOfScrenningProcesses.map((element) => {
            return <li onClick={getCandidates} key={element} style={{ cursor: 'pointer', marginLeft: 10, marginBottom: 10 }}>{element}</li>
        });

    }

    function handleShow() {
        setShowCandidates(false)
    }


    if (error) {
        return <pre> {JSON.stringify(error.message, null, 2)}</pre>
    }

    return (

        <div className='TableContainer'>
            <CurrentDate />
            <div className="dropdown">
                <button style={{ marginTop: '40px' }} className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"> Create Process
                    <span className="caret"></span></button>

                <ul className="dropdown-menu">
                    {createProcessDropdownMenu()}
                </ul>
            </div>
            {/* //TODO: Handle show 8a einai se allo buton oxi panw sto dropdown */}
            <div className="dropdown">
                <button onClick={handleShow} style={{ marginTop: '40px' }} className="btn btn-info btn-primary dropdown-toggle" type="button" data-toggle="dropdown"> Show Screened Candidates
                    <span className="caret"></span></button>

                <ul className="dropdown-menu">
                    {createCandidatesDropdownMenu()}
                </ul>
            </div>

            {showCandidates ? <Candidates candidates={candidates} /> : " "}

        </div>
    )
}

export default Processes

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Candidates from './Candidates';
import CurrentDate from './components/CurrentDate';
import axios from 'axios'
import './css/Tables.css'

const candidatesURL = "http://localhost:3000/JobDescTempCandidates"

function Processes() {

    const { state } = useLocation();
    const serverUserInfo = state[0]
    console.log(serverUserInfo)
    const navigate = useNavigate();

    const [candidates, setCandidates] = useState(null)
    const [error, setError] = useState(null);

    const [showCandidates, setShowCandidates] = useState(false)

    //TODO: This will be onClick sta dropdown items,Get data with axios, check if no Candidates yet
    useEffect(() => {
     
        axios.get(candidatesURL, {
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
            .catch(setError)
    }, [showCandidates])


    if (error) {
        return <pre> {JSON.stringify(error.message, null, 2)}</pre>
    }

    function goto(event) {

        var processName = event.target.textContent
        navigate("/" + processName, { state: [serverUserInfo, processName] })

    }

    function createProcessDropdownMenu() {

        return serverUserInfo.assignedProcesses.map((element) => {
            return <li key={element} onClick={goto} style={{ cursor: 'pointer' }}>{element}</li>
        });

    }

    function createCandidatesDropdownMenu() {

        return serverUserInfo.assignedProcesses.map((element) => {
            return <li key={element} style={{ cursor: 'pointer' }}>{element}</li>
        });

    }

    function handleShow() {
        setShowCandidates((prevShow) => {
            return !prevShow
        })
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

import React from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const workersURL = "http://localhost:3000/users"

function ScreeningFinal() {


    const navigate = useNavigate();
    let { state } = useLocation();
    const ratingsMap = state[0]
    const serverUserInfo = state[1]
    const processName = state[2]

    //Update user's info since he completed the process
    function completeTask(candidateSucceeded) {
        let  link

        if (candidateSucceeded) {

            link = "mailto:candidate@example.com"
                + "?cc="
                + "&subject=" + encodeURIComponent("Congratulations")
                + "&body=" + encodeURIComponent("We would like to inform you that you have successfully passed the stage of the selection process.\n")
        } else {

            link = "mailto:candidate@example.com"
                + "?cc="
                + "&subject=" + encodeURIComponent("Thank you for applying")
                + "&body=" + encodeURIComponent("We would like to inform you that you you did not pass the stage of the selection process.\n")
        }
        window.location.href = link;

        var processIndex = serverUserInfo.assignedProcesses.indexOf(processName);

        //remove process from the server
        serverUserInfo.assignedProcesses.splice(processIndex, 1)
        serverUserInfo.dueDate.splice(processIndex, 1)
        // console.log(serverUserInfo)

        axios.put(workersURL, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: serverUserInfo
        })
            .then(response => {
                // console.log(response.data)
                navigate("/Processes", { state: [response.data.data] })
            })
            .catch(error => console.log("Error at completeTask " + error.message))
    }

    function averageRating() {

        let sum = 0;
        ratingsMap.forEach((v) => {
            sum += v;
        });

        return (sum / (ratingsMap.size * 20)).toPrecision(2)
    }


    return (
        <div style={{ width: "50%", margin: "auto", maxWidth: 650, minWidth: 500 }}>
            <h1>Screening Overview</h1><br />
            <hr></hr><br />

            <div style={{ backgroundColor: 'white', wordWrap: 'break-word' }}>

                This candidate's overall score is : {averageRating()} / 5

            </div>

            <button className="btn_complete" onClick={() => { completeTask(true) }}>Accept</button>
            <button className="btn_reject" onClick={() => { completeTask(false) }}>Reject</button>
        </div>

    )
}

export default ScreeningFinal


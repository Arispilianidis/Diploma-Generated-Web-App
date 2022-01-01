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
    const formValues = state[2]

    //Update user's info since he completed the process
    function completeTask() {

        // let  link
        // if (candidateSucceeded) {

        //     link = "mailto:candidate@example.com"
        //         + "?cc="
        //         + "&subject=" + encodeURIComponent("Congratulations")
        //         + "&body=" + encodeURIComponent("We would like to inform you that you have successfully passed the stage of the selection process.\n")
        // } else {

        //     link = "mailto:candidate@example.com"
        //         + "?cc="
        //         + "&subject=" + encodeURIComponent("Thank you for applying")
        //         + "&body=" + encodeURIComponent("We would like to inform you that you you did not pass the stage of the selection process.\n")
        // }
        // window.location.href = link;
        let processName = "JobDescTemp"
        const {
            input3,
            input6
        } = formValues

        const candidateInfo = {
            input3,
            input6
        }

        console.log(candidateInfo);

        axios.post("http://localhost:3000/JobDescTempCandidates", { candidateInfo, processName }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .catch(error => {
                console.log("Error at post Candidates => " + error.message)
            })

        navigate("/Processes", { state: [serverUserInfo] });
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

            <button className="btn_complete" onClick={() => { completeTask() }}>Accept</button>
        </div>

    )
}

export default ScreeningFinal

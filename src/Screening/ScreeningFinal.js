import React from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const workersURL = "http://localhost:3000/users"


function ScreeningFinal() {


    const navigate = useNavigate();
    let { state } = useLocation();
    const formData = state[0]
    const serverUserInfo = state[1]
    const processName = state[2]
    const loginUserInfo = state[3]

    console.log(formData)
    console.log(serverUserInfo)
    console.log(processName)
    console.log(loginUserInfo)

    function isValidDate(date) {
        return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
    }

    function printItem(Item) {

        console.log(typeof (Item))

        if (typeof (Item) === 'object') {

            if (isValidDate(Item)) {
                return Item.toLocaleDateString('en-GB')
            }
            else {

                return Item.map((element) => {
                    return <p key={element} style={{ textAlign: 'left' }}>- {element}</p>
                });
            }
        }
        else {
            return Item
        }

    }

   
    //Update user's info since he completed the process
    function completeTask() {

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
                navigate("/Processes", { state: [loginUserInfo, response.data.data] })
            })
            .catch(error => console.log("Error at completeTask " + error.message))

    }

    const PRogrammingLangQuestions = ['How much experience with', 'How many projects with']
    const SpokenLangQuestions = ['How fluent in']

    return (
        <div style={{ width: "50%", margin: "auto", maxWidth: 650, minWidth: 500 }}>
            <h1>Screening Overview</h1><br />
            <hr></hr><br />

            <div style={{ backgroundColor: 'white', wordWrap: 'break-word'}}>
                <h4> candidateName: &emsp;&emsp;&emsp;&emsp;</h4><div> {printItem(formData.candidateName)}</div>  <br />

                <h4> candidateEmail: &emsp;&emsp;&emsp;&emsp;</h4> <div>{printItem(formData.candidateEmail)} </div><br />

                <h4>dateApplied:&emsp;&emsp;&emsp;&emsp;</h4> <div>{printItem(formData.dateApplied)}</div><br />
                {/* TODO: in case of array fix this in M2T*/}
                <h4> {PRogrammingLangQuestions[0] + " HTML"}:&emsp;&emsp;&emsp;&emsp;</h4><div>{printItem(formData.progrLangAnswer[0])}</div><br />
                <h4> {PRogrammingLangQuestions[1] + " HTML"}:&emsp;&emsp;&emsp;&emsp;</h4><div>{printItem(formData.progrLangAnswer[1])}</div><br />
                <h4> {PRogrammingLangQuestions[0] + " CSS"}:&emsp;&emsp;&emsp;&emsp;</h4><div>{printItem(formData.progrLangAnswer[2])}</div><br />
                <h4> {PRogrammingLangQuestions[1] + " CSS"}:&emsp;&emsp;&emsp;&emsp;</h4><div>{printItem(formData.progrLangAnswer[3])}</div><br />
            </div>

            <button className="btn_complete" onClick={completeTask}>Complete Task</button>
        </div>

    )
}

export default ScreeningFinal


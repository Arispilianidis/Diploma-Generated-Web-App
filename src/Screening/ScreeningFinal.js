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

    console.log(formData)

   
    //Update user's info since he completed the process
    function completeTask() {

        var processIndex = serverUserInfo.assignedProcesses.indexOf(processName);

        //remove process from the server
        serverUserInfo.assignedProcesses.splice(processIndex, 1)
        serverUserInfo.dueDate.splice(processIndex, 1)
        // console.log(serverUserInfo)

        axios.post("http://localhost:3000/" + processName, formData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log("Error at postProof => " + error.message))


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

    return (
        <div style={{ width: "50%", margin: "auto", maxWidth: 650, minWidth: 500 }}>
            <h1>Screening Overview</h1><br />
            <hr></hr><br />

            <div style={{ backgroundColor: 'white' }}>
                <h4> candidateName: &emsp;&emsp;&emsp;&emsp;</h4> {printItem(formData.candidateName)}  <br />

                <h4> candidateEmail: &emsp;&emsp;&emsp;&emsp;</h4> {printItem(formData.candidateEmail)} <br />

                <h4>dateApplied:&emsp;&emsp;&emsp;&emsp;</h4> {printItem(formData.dateApplied)}<br />
                {/* TODO: in case of array fix this */}
                <h4> progrLangAnswer:&emsp;&emsp;&emsp;&emsp;</h4>{printItem(formData.progrLangAnswer[0])}<br />
            </div>

            {/* <button className="btn_complete" onClick={completeTask}>Complete Task</button> */}
        </div>

    )
}

export default ScreeningFinal


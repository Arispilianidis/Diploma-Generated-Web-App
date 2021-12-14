import React from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const workersURL = "http://localhost:3000/users"

function JobDescTempFinal() {

    const navigate = useNavigate();
    let { state } = useLocation();
    const formData = state[0]
    const serverUserInfo = state[1]
    const processName = state[2]

    console.log(formData)
    console.log(serverUserInfo)
    console.log(processName)

    function isValidDate(date) {
        return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
    }


    function printItem(Item) {

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
            return <p key={Item} style={{ textAlign: 'left' }}> {Item}</p>
        }

    }


    //Update user's info since he completed the process
    function completeTask() {

        var processIndex = serverUserInfo.assignedProcesses.indexOf(processName);

        //remove process from the server
        serverUserInfo.assignedProcesses.splice(processIndex, 1)
        serverUserInfo.dueDate.splice(processIndex, 1)

        axios.post("http://localhost:3000/" + processName, formData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log("Error at complete Task => " + error.message))


        axios.put(workersURL, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: serverUserInfo
        })
            .then(response => {
                // console.log(response.data.data)
                navigate("/Processes", { state: [response.data.data] })
            })
            .catch(error => console.log("Error at completeTask " + error.message))

    }



    return (
        <div style={{ width: "50%", margin: "auto", maxWidth: 650, minWidth: 500 }}>
            <h1>Job Description Overview</h1><br />
            <hr></hr><br />

            <div style={{ backgroundColor: 'white', wordWrap: 'break-word' }}>
                <h4> businessName:</h4> <div>{printItem(formData.businessName)}</div>  <br />

                <h4> title: </h4> <div>{printItem(formData.title)} </div><br />

                <h4> responsibilities: </h4><div> {printItem(formData.responsibilities)}</div><br />

                <h4>progLangResponsibilities:</h4><div> {printItem(formData.progLangResponsibilities)}</div><br />
                
            </div>

            <button className="btn_complete" onClick={completeTask}>Complete Task</button>


        </div>
    )
}

export default JobDescTempFinal

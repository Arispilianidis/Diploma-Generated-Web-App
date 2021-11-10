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
    const loginUserInfo = state[3]

    console.log(formData)
    console.log(serverUserInfo)
    console.log(processName)
    console.log(loginUserInfo)
    

    function printItem(Item) {

        if (typeof (Item) === 'object') {

            return Item.map((element) => {
                return <p key={element} style={{ textAlign: 'left' }}>- {element}</p>
            });
        }
        else {
            return Item
        }

    }


    //Update user's info since he completed the process
    function completeTask() {

        var processIndex = serverUserInfo.assignedProcesses.indexOf(processName);
        
        //remove process from the server
        serverUserInfo.assignedProcesses.splice(processIndex,1)
        serverUserInfo.dueDate.splice(processIndex,1)
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
            navigate("/Processes", {state: [loginUserInfo,response.data.data]} )
        })
        .catch(error => console.log("Error at completeTask " + error.message))

    }



    return (
        <div style={{ display: 'block' }}>
            <h1>Sample Job Description</h1><br />
            <hr></hr><br />

            <div style={{ display: 'block', backgroundColor: 'white' }}>
                <h4> businessName: &emsp;&emsp;&emsp;&emsp;</h4> {printItem(formData.businessName)}  <br />

                <h4> title: &emsp;&emsp;&emsp;&emsp;</h4> {printItem(formData.title)} <br />

                <h4> responsibilities:  &emsp;&emsp;&emsp;&emsp;</h4> {printItem(formData.responsibilities)}<br />

                <h4>progLangResponsibilities:&emsp;&emsp;&emsp;&emsp;</h4> {printItem(formData.progLangResponsibilities)}<br />
            </div>

            <button className="btn_complete" onClick={completeTask}>Complete Task</button>


        </div>
    )
}

export default JobDescTempFinal

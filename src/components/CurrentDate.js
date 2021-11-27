import React, { useState, useEffect } from 'react'

function CurrentDate() {

    let [date, setDate] = useState(new Date().toLocaleString('en-GB'));


    useEffect(() => {

        const intervalID = setInterval(() => {
            setDate(new Date().toLocaleString('en-GB'))
        }, 1000)

        return () => {
            clearInterval(intervalID)
        }

    }, [])

    return (
        <div style={{marginBottom:25, color:"white" , display:'flex', alignItems:'center', marginLeft:-20}}>
            {date}
        </div>
    )
}

export default CurrentDate

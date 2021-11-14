import React, { useState, useEffect } from 'react'

function CurrentDate() {

    let [date, setDate] = useState(new Date().toUTCString());


    useEffect(() => {

        const intervalID = setInterval(() => {
            setDate(new Date().toUTCString())
        }, 1000)

        return () => {
            clearInterval(intervalID)
        }

    }, [])

    return (
        <div style={{marginBottom:25, color:"white"}}>
            {date}
        </div>
    )
}

export default CurrentDate

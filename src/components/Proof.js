import React, { useEffect, useState } from 'react'


function Proof(props) {

    const [thumbnail, setThumbnail] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        if (!props.file) { return }

        setLoading(true)

        let reader = new FileReader();

        reader.onloadend = () => {
            setThumbnail(reader.result)
            setLoading(false)
        };

        reader.readAsDataURL(props.file);
    }, [thumbnail, props.file])

    if (!props.file) { return null; }

    if (loading) {

        return <p>Loading...</p>;
    }
    else {

        return (

            <img src={thumbnail} alt={props.file.name} style={{ width: 200, height: 200, borderRadius: 0, marginLeft: 30 }} />

        )
    }
}

export default Proof


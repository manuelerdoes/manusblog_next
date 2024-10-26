'use client'

import React, { useEffect, useState } from 'react'


function PublicButton({ publi }) {
    const [isPublic, setIsPublic] = useState(false);
    const [buttonText, setButtonText] = useState("blog not public");


    useEffect(() => {
        if (publi) {
            setButtonText("blog public");
            setIsPublic(true);
        } else {
            setButtonText("blog not public");
            setIsPublic(false);
        }
    }, [])

    const togglePublic = () => {

        const newVal = !isPublic;
        setIsPublic(newVal);

        if (newVal) {
            setButtonText("blog public");
        } else {
            setButtonText("blog not public");
        }
    }

    return (
        <button type='button' onClick={togglePublic}
            className={`${isPublic ? 'publicblog' : ''}`}
            value={isPublic}>{buttonText}</button>
    )
}

export default PublicButton
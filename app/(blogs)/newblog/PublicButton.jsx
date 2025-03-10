'use client'

import React, { useState } from 'react'



function PublicButton() {
    const [isPublic, setIsPublic] = useState(false);
    const [buttonText, setButtonText] = useState("blog not public");



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
        <div className={`${isPublic ? 'is-public-button publicblog' : 'is-public-button'}`}>
            <button id='isPublicButton' type='button' onClick={togglePublic}
                className={`${isPublic ? 'publicblog' : ''}`}
                value={isPublic}>{buttonText}</button>
        </div>
    )
}

export default PublicButton
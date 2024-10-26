'use client'

import React, { useState } from 'react'

function CommentsButton() {

    const [commentsDisabled, setCommentsDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("comments disabled");

    const toggleComments = () => {
        const newVal = !commentsDisabled;
        setCommentsDisabled(newVal);

        if (newVal) {
            setButtonText("comments enabled");
        } else {
            setButtonText("comments disabled");
        }
    }

    return (
        <button id='commentsButton' type="button" className={`${commentsDisabled ? 'disablecomments' : ''}`}
            onClick={toggleComments} value={commentsDisabled}>{buttonText}</button>
    )
}

export default CommentsButton
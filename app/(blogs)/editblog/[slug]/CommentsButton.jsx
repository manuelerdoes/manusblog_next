'use client'

import React, { useEffect, useState } from 'react'

function CommentsButton({isDisabled}) {

    const [commentsDisabled, setCommentsDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("comments enabled");

    useEffect(() => {
        if (!isDisabled) {
            setButtonText("comments enabled");
            setCommentsDisabled(false);
        } else {
            setButtonText("comments disabled");
            setCommentsDisabled(true);
        }
    }, [])

    const toggleComments = () => {
        const newVal = !commentsDisabled;
        setCommentsDisabled(newVal);

        if (!newVal) {
            setButtonText("comments enabled");
        } else {
            setButtonText("comments disabled");
        }
    }

    return (
        <button id='commentsButton' type="button" className={`${!commentsDisabled ? 'disablecomments' : ''}`}
            onClick={toggleComments} value={commentsDisabled}>{buttonText}</button>
    )
}

export default CommentsButton
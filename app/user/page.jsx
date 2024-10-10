import React from 'react'
import { redirect } from 'next/navigation'

function User() {

    const user = "notnull";
    if (!user) {
        redirect('/login');
    } else {
        redirect('/usermanager');
    }

    return (
        <div></div>
    )
}

export default User 
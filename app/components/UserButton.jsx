import React from 'react'

function UserButton() {

    const currentUser = {
        username: "Max Muster",
        email: "maximux@mesongo.com",
        avatar: "/avatar.png"
    }

    return (
        <div className='userbutton'>
            <div className='user'>
                <img src={currentUser ? currentUser.avatar || "./avatar.png" : "./avatar.png"} alt="" />
                <h2>{currentUser ? currentUser.username : "Login"}</h2>
            </div>
        </div>
    )
}

export default UserButton
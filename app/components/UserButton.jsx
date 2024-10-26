'use client'

import React, { useState, useEffect } from 'react'


function UserButton() {
  const [currentUser, setCurrentUser] = useState(null);




  return (
    <div className='userbutton'>
      <div className='user'>
        <img src={currentUser ? currentUser.avatarURL || "/avatar.png" : "/avatar.png"} alt="" />
        <h2>{currentUser ? currentUser.username : "Login"}</h2>
      </div>
    </div>
  )
}

export default UserButton
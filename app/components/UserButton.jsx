import React from 'react'
import Link from 'next/link'
import { hostUrl } from '../lib/const'


function UserButton() {

  const currentUser = {
    id: 1,
    username: "Max Muster",
    email: "mumu@mu.com"
  }

  return (
    <Link href={`${hostUrl}/usermanager`}>
      <div className="userButton">
        <img src={currentUser.avatarURL ? currentUser.avatarURL : "/avatar.png"} alt="" />
        <span>{currentUser.username}</span>
      </div>
    </Link>
  )
}

export default UserButton
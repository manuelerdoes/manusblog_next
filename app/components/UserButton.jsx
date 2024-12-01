'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { hostUrl } from '../lib/const'
import { useSession } from "next-auth/react"

function UserButton() {
  const { data: session } = useSession()

  if (!session?.user) return '<div className="userButton">Login</div>'

  let currentUsername = session.user.name;
  console.log(currentUsername);
  console.log(session.user.email);
  if (!currentUsername) {
    currentUsername = session.user.email;
  }

  const currentUser = {
    username: currentUsername,
    avatarURL: session.user.image
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
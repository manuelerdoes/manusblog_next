'use client'
import React from 'react'
import Link from 'next/link'
import { hostUrl } from '../lib/const'
import { useSession } from "next-auth/react"

function UserButton() {
  const { data: session } = useSession()

  if (!session?.user) return '<div className="userButton">Login</div>'

  const currentUser = {
    name: session.user.name  
  }

  return (
    <Link href={`${hostUrl}/usermanager`}>
      <div className="userButton">
        <img src={currentUser.avatarURL ? currentUser.avatarURL : "/avatar.png"} alt="" />
        <span>{currentUser.name}</span>
      </div>
    </Link>
  )
}

export default UserButton
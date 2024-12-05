'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { hostUrl } from '../lib/const'
import { useSession } from "next-auth/react"

function UserButton() {
  const { data: session } = useSession()
  const [currentUser, setCurrentUser] = useState({
    username: '',
    email: '',
    avatar: ''
  })

  useEffect(() => {
    if (session?.user) {
      setCurrentUser({
        username: session.user.name,
        email: session.user.email,
        avatar: session.user.image
      })
    }
  }, [session])

  if (!session?.user) return '<div className="userButton">Login</div>'


  return (
    <Link href={`${hostUrl}/usermanager`}>
      <div className="userButton">
        <img src={currentUser.avatar ? currentUser.avatar : "/avatar.png"} alt="" />
        <span>{ currentUser.username || currentUser.email }</span>
      </div>
    </Link>
  )
}

export default UserButton
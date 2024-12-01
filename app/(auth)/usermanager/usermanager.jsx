'use client'
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

function UserManager() {

  const { data: session } = useSession()
  const router = useRouter();

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

  const handleSignout = async (e) => {
    e.preventDefault();
    signOut();
    router.push('/sign-in');
  }

  return (
    <div className="usermanager">
      <div className="info">
        <h2>{currentUser.username}</h2>
        <p>{currentUser.email}</p>
      </div>
      <div className="useraction">
        {!currentUser.username && <div className="new-user-info">
          <p>You're new! Please set a username.</p></div>}
        <div className="changeusername">

          <button onClick={() => router.push('/setusername')}>Change Username</button>
        </div>
        <div className="logout">
          <button onClick={handleSignout}>Sign Out</button>
        </div>
      </div>
    </div>
  )
}

export default UserManager
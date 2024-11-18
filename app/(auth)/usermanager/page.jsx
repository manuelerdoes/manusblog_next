import { signOut } from '@/app/auth'
import React from 'react'
import { auth } from '@/app/auth'
import { redirect } from 'next/navigation'

async function Usermanager() {
  const session = await auth()

  if (!session?.user) redirect('/');

  const currentUser = {
    username: session.user.name,
    email: session.user.email,
    avatar: session.user.image
  }
  
  return (
    <div className="containero">
      <div className="usermanager">
        <div className="info">
          <h2>{currentUser.username}</h2>
          <p>{currentUser.email}</p>
        </div>
        <div className="useraction">
          <div className="logout">
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Usermanager
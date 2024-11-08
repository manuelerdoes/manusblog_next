import { signOut } from '@/app/auth'
import React from 'react'

function Usermanager() {
  const currentUser = {
    username: "Max Muster",
    email: "maximux@mesongo.com",
    avatar: "/avatar.png"
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
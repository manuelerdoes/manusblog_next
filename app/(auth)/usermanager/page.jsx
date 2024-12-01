import { signOut } from '@/app/auth'
import React from 'react'
import { auth } from '@/app/auth'
import { redirect } from 'next/navigation'
import UserManager from './usermanager'

async function Usermanager() {
  const session = await auth()

  if (!session?.user) redirect('/sign-in');

  const currentUser = {
    username: session.user.name,
    email: session.user.email,
    avatar: session.user.image
  }
  
  return (
    <div className="containero">
      <UserManager />
    </div>
  )
}

export default Usermanager
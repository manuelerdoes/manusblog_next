'use client'

import { setNewUsername } from '@/app/lib/auth/setUsernameServerAction';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSession } from 'next-auth/react';

function SetUsername() {

  const router = useRouter();
  const { update } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username } = Object.fromEntries(formData);
    ///const res = await setNewUsername(username);
    update({ name: username });
    router.push('/usermanager');
  }

  const handleSignout = async (e) => {
    e.preventDefault();
    signOut();
    router.push('/sign-in');
  }

  return (
    <div className="containero">
      <div className="login">
        <div className="loginitem">
          <form onSubmit={handleSubmit}>
            <h2>Set Username</h2>
            <input type="text" placeholder="username" name="username" />
            <button type="submit">Submit</button>
          </form>
          <button onClick={handleSignout}>Sign Out</button>
        </div>
      </div>
    </div>
  )
}

export default SetUsername
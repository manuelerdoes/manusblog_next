import { auth, providerMap, signIn } from '@/app/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'


function SignIn(props) {
  return (
    <div className="containero">
      <div className="login">
        <div className="loginitem">
          <form
            action={async (formData) => {
              "use server"
              await signIn()
            }}
          >
            <h2>Sign In</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
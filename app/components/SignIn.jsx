"use client"
import { signIn } from "next-auth/react"

export function SignIn() {

  return (
    <div className="signinButton" onClick={() => signIn()}>
      {/* <img src="/avatar.png" alt="" /> */}
      <span>Sign In</span>
      {/* <button onClick={() => signIn()}>Sign In</button> */}
    </div>
  )
}





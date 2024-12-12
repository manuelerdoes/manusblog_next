"use client"
import { signIn } from "next-auth/react"

export function SignIn() {

  return (
    <div className="signinButton" onClick={() => signIn()}>
      <span>Sign In</span>
    </div>
  )
}





"use client"
import { signIn } from "next-auth/react"

export function SignIn() {

  return (
    <div className="signin-button" onClick={() => signIn()}>
      <span>Sign In</span>
    </div>
  )
}





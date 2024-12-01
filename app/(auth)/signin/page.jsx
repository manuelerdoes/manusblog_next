
import { signIn } from '@/app/auth'
import React from 'react'
import { cookies } from "next/headers";

function SignIn(props) {
  const csrfToken = cookies().get("authjs.csrf-token")?.value ?? ""
  const callbackUrl = "/";

  return (
    <div className="containero">
      <div className="login">
        <div className="loginitem">
          <form
            action={
              async (formData) => {
                "use server"
                const email = formData.get("email");
                await signIn("Nodemailer", { redirect: true, formData })
              }
            }
          >
            <h2>Sign In</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            {/* <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required /> */}
            <input type="hidden" name="csrfToken" value={csrfToken} />
            {/* <input type="hidden" name="callbackUrl" value={callbackUrl} /> */}
            <button type="submit">Sign In</button>
          </form>
          {/* <button onClick={() => signIn('Nodemailer', { redirect: false, email })}>Sign in</button> */}
        </div>
      </div>
    </div>
  )
}

export default SignIn
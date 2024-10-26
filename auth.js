import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { getUserFromDb, saltAndHashPassword } from "@/utils/credentialAuth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {

        console.log("authorize")
        let user = null
 
        // logic to salt and hash password
        const pwHash = await saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        if (user === "wrong password") {
          // User found, but password doesn't match
          throw new Error("Wrong password.")
        }
        
        console.log("authorization worked!")
        return user
      },
    }),
  ],
})
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Nodemailer from "next-auth/providers/nodemailer"
import NextAuth from "next-auth"
import { clearStaleTokens } from "./lib/auth/clearStaleTokenServerAction"
import { setNewUsername } from "./lib/auth/setUsernameServerAction"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  }, 
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        // tls: {
        //   rejectUnauthorized: false, // Allow self-signed certificates
        // },
      },
      from: process.env.EMAIL_FROM,
    }),],
    callbacks: {
      async jwt({ token, user, session, trigger }) {
        if (trigger === "update" && session?.name && session?.name !== token.name) {
          token.name = session.name;
  
          try {
            await setNewUsername(token.name);
          } catch (error) {
            console.error("Failed to set user name:", error);
          }
        }

        if (trigger === "update" && session?.image && session?.image !== token.image) {
          token.image = session.image;
        }

  
        if (user) {
          token.role = user.role;
          await clearStaleTokens(); // Clear up any stale verification tokens from the database after a successful sign in
          return {
            ...token,
            id: user.id,
          };
        }
        return token;
      },
      async session({ session, token }) {
        if (token.image) {
          session.user.image = token.image;
        }
        if (token.role) {
          session.user.role = token.role;
        }
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
          },
        };
      },
    },
    pages: {
      signIn: "/sign-in",
    }
})
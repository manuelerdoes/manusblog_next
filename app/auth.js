import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Nodemailer from "next-auth/providers/nodemailer"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
      session({ session, user }) {
        session.user.role = user.role
        return session
      }
    },
    // pages: {
    //   signIn: "/signin",
    // }
})
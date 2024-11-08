import React from 'react'
import { SessionProvider } from "next-auth/react"
import NewBlog from './NewBlog'

function page() {
  return (
    <SessionProvider>
      <NewBlog />
    </SessionProvider>
  )
}

export default page
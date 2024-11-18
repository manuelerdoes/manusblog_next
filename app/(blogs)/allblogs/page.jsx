import React from 'react'
import { SessionProvider } from "next-auth/react"
import Search from './Search'

function page() {
  return (
    <div className="containero">
      <SessionProvider>
        <Search />
      </SessionProvider>
    </div>
  )
}

export default page
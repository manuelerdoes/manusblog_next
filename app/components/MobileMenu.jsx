'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import UserButton from './UserButton'
import { useSession } from "next-auth/react"
import { SignIn } from './SignIn'
import { useRouter } from 'next/navigation'


function MobileMenu() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter();

  const handleAbout = () => {
    router.push("/about");
    setMenuOpen(false);
  }

  const handleNewBlog = () => {
    router.push("/newblog");
    setMenuOpen(false);
  }

  return (
    <div className="mobileMenu">
      <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>⏛</div>
      {menuOpen && (
        <div className="menuOverlay" onClick={() => setMenuOpen(false)}>
          <div className="menuList">
            <div className="menuItem" onClick={handleAbout}>
              <span>About</span>
            </div>
            <div className="menuItem" onClick={handleNewBlog}>
              <span>New Blog</span>
            </div>
            <div className="menuItem" onClick={() => setMenuOpen(false)}>
                {(!session?.user) ? (<SignIn />) : (<UserButton />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
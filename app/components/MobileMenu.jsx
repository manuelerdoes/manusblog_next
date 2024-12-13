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
    <div className="mobile-menu">
      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>⏛</div>
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu-list">
            <div className="mobile-menu-item" onClick={handleAbout}>
              <span>About</span>
            </div>
            <div className="mobile-menu-item" onClick={handleNewBlog}>
              <span>New Blog</span>
            </div>
            <div className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
                {(!session?.user) ? (<SignIn />) : (<UserButton />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
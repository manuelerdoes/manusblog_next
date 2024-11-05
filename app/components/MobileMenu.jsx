'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import UserButton from './UserButton'

function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="mobileMenu">
      <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>⏛</div>
      {menuOpen && (
        <div className="menuOverlay" onClick={() => setMenuOpen(false)}>
          <div className="menuList">
            <div className="menuItem" onClick={() => setMenuOpen(false)}>
              <Link href="/about">About</Link>
            </div>
            <div className="menuItem" onClick={() => setMenuOpen(false)}>
              <Link href="/newblog">New Blog</Link>
            </div>
            <div className="menuItem" onClick={() => setMenuOpen(false)}>
              <Link href="/user"><UserButton /></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
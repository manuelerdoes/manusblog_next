import React from 'react'
import { pageTitle } from '../lib/const'
import Link from 'next/link'
import UserButton from './UserButton'
import MobileMenu from './MobileMenu'
import { SignIn } from './SignIn'
import { auth } from '../auth'
import { SessionProvider } from "next-auth/react"

async function BlogHeader() {
    const session = await auth();

    return (
        <div className='blog-header'>
            <nav>
                {/* only shown in responsive mode */}
                <div className="mobile-search">
                    <Link href="/allblogs">⚲</Link>
                </div>
                {/* end of responsive stuff */}

                <div className="about-link">
                    <Link href="/about">About</Link>
                </div>
                <div className="new-blog-link button-style">
                    <Link href="/newblog">New Blog</Link>
                </div>
                <div className="page-title">
                    <Link href="/">{pageTitle}</Link>
                </div>
                <div className="all-blogs-link button-style">
                    <Link href="/allblogs">All Blogs</Link>
                </div>
                <div className="user-link">
                    <SessionProvider>
                        {(!session?.user) ? <SignIn /> : <UserButton />}
                    </SessionProvider>
                </div>

                {/* only shown in responsive mode */}
                <div className="mobile-menu">
                    <SessionProvider>
                        <MobileMenu />
                    </SessionProvider>
                </div>
                {/* end of responsive stuff */}
            </nav>
        </div>
    )
}

export default BlogHeader
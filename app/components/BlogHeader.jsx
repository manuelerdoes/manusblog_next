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
    // const session = {
    //     user: "oergel"
    // }


    return (
        <div className='blogheader'>
            <nav>
                {/* only shown in responsive mode */}
                <div className="mobileSearch">
                    <Link href="/allblogs">⚲</Link>
                </div>
                {/* end of responsive stuff */}

                <div className="aboutLink">
                    <Link href="/about">About</Link>
                </div>
                <div className="newBlogLink buttonStyle">
                    <Link href="/newblog">New Blog</Link>
                </div>
                <div className="pageTitle">
                    <Link href="/">{pageTitle}</Link>
                </div>
                <div className="allBlogsLink buttonStyle">
                    <Link href="/allblogs">All Blogs</Link>
                </div>
                <div className="userLink">
                    {(!session?.user) ? (<SignIn />) : (<SessionProvider><UserButton /></SessionProvider>)}
                </div>

                {/* only shown in responsive mode */}
                <div className="mobileMenu">
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
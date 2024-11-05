import React from 'react'
import { pageTitle } from '../lib/const'
import Link from 'next/link'
import UserButton from './UserButton'
import MobileMenu from './MobileMenu'

function BlogHeader() {
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
                    <Link href="/user"><UserButton /></Link>
                </div>

                {/* only shown in responsive mode */}
                <div className="mobileMenu">
                    <MobileMenu />
                </div>
                {/* end of responsive stuff */}
            </nav>
        </div>
    )
}

export default BlogHeader
import React from 'react'
import { pageTitle } from '../lib/const'
import Link from 'next/link'
import UserButton from './UserButton'

function BlogHeader() {
    return (
        <div className='blogheader'>
            <nav>
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
            </nav>
        </div>
    )
}

export default BlogHeader
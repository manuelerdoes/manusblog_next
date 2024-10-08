import React from 'react'
import { blogTitle } from '../const'
import Link from 'next/link'

function BlogHeader() {
    return (
        <div className='blogheader'>
            <nav>
                <div className="aboutLink">
                    <Link href="/about">About</Link>
                </div>
                <div className="newBlogLink buttonStyle">
                    <Link href="/newBlog">New Blog</Link>
                </div>
                <div className="blogTitle">
                    <Link href="/">{blogTitle}</Link>
                </div>
                <div className="allBlogsLink buttonStyle">
                    <Link href="/allBlogs">All Blogs</Link>
                </div>
                <div className="userLink">
                    <Link href="/user">User</Link>
                </div>
            </nav>
        </div>
    )
}

export default BlogHeader
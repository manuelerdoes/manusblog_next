import { getLatestBlogId } from '@/app/lib/dbActions';
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {

  const latestBlog = await getLatestBlogId();

  redirect(`/blog/${latestBlog}`);


  return (
    <div className="containero">
      <div>redirecting to latest blog...</div>
    </div>
  )
}

export default page
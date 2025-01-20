import { getLatestBlogTitle } from '@/app/lib/dbActions';
import { get } from 'lodash';
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {

  //const latestBlog = await getLatestBlogId();
  const latestBlog = await getLatestBlogTitle();

  redirect(`/blog/${latestBlog}`);


  return (
    <div className="containero">
      <div>redirecting to latest blog...</div>
    </div>
  )
}

export default page
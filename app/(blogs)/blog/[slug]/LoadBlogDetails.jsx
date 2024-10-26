import Details from '@/app/components/Details';
import { apiServer } from '@/app/lib/const';
import React from 'react'

async function getBlog(id) {
  const res = await fetch(`${apiServer}/api/blog/${id}`, {
    next: {
      revalidate: 30
    }
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json(); // Ensure the response is parsed as JSON
  return data;
}

async function LoadBlogDetails({blogId}) {

  const currentBlog = await getBlog(blogId);

  return (
    <Details currentBlog={currentBlog} />
  )
}

export default LoadBlogDetails
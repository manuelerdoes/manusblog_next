import Comments from '@/app/components/Comments'
import { apiServer } from '@/app/lib/const';
import React from 'react'

async function getComments(blogId) {
  const res = await fetch(`${apiServer}/api/comments/${blogId}`, {
    next: {
      revalidate: 0
    }
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json(); 
  return data;
}

async function LoadComments({blogId}) {

  try {
    const comments = await getComments(blogId);
    return (
      <Comments blogId={blogId} comments={comments} />
    )
  } catch (error) {
    console.error("Could not load comments: " + error);
    return null;
  }


}

export default LoadComments
import Comments from '@/app/components/Comments'
import { apiServer } from '@/app/lib/const';
import React from 'react'
import { SessionProvider } from "next-auth/react"
import { intToBool } from '@/app/lib/utils';

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

async function checkIfCommentsDisabled(blogId) {
  const res = await fetch(`${apiServer}/api/blog/${blogId}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json(); 
  return intToBool(data.disableComments);
}

async function LoadComments({blogId}) {

  try {
    // const comments = await getComments(blogId);
     const disabled = await checkIfCommentsDisabled(blogId);
    return (
      <SessionProvider>
        <Comments blogId={blogId} disabled={disabled}/>
      </SessionProvider>
    )
  } catch (error) {
    console.error("Could not load comments: " + error);
    return null;
  }


}

export default LoadComments
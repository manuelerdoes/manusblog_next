import { apiServer } from '@/app/lib/const';
import React from 'react'
import { Suspense } from 'react';
import LoadComments from './LoadComments';

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

async function LoadBlogContent({ blogId }) {

  const currentBlog = await getBlog(blogId);

  return (
    <>
      <div className="blogtitle">
        <h2>{currentBlog.title}</h2>
        {!currentBlog?.isPublic && (<span>not public</span>)}
      </div>
      <div className="blogcontent">
        {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(currentBlog.content)) }} /> */}
        <p>{currentBlog.content}</p>
      </div>
      {(!currentBlog.disableComments) ? (
        <Suspense fallback={<p>loading comments...</p>}>
          <LoadComments blogId={blogId} />
        </Suspense>
      ) : (
        <div className="comments">
          <p>comments disabled</p>
        </div>
      )}
    </>
  )
}

export default LoadBlogContent
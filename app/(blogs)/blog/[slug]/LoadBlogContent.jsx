import { apiServer } from '@/app/lib/const';
import React from 'react'
import DOMPurify from "isomorphic-dompurify";
import { marked } from 'marked';

async function getBlog(id) {
  const res = await fetch(`${apiServer}/api/blog/${id}`, {
    next: {
      revalidate: 10
    }
  });
  if (!res.ok) {
    console.error("Could not fetch blog content");
    return null;
  }
  const data = await res.json(); // Ensure the response is parsed as JSON
  return data;
}

async function LoadBlogContent({ blogId }) {

  const currentBlog = await getBlog(blogId);

  if (!currentBlog) { 
    return <div className="loadingerror"><h2>Error</h2><p>Could not load blog content.<br></br>
      You might be trying to access a non-public blogpost. Please check if you are signed in.</p></div>
  }

  return (
    <>
      <div className="blogtitle">
        <h2>{currentBlog.title}</h2>
        {!currentBlog.isPublic && (<span>not public</span>)}
      </div>
      <div className="blogcontent">
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(currentBlog.content)) }} />
        {/* <div dangerouslySetInnerHTML={{ __html: marked.parse(currentBlog.content) }} /> */}
        {/* <p>{currentBlog.content}</p> */}
      </div>
      {/* {(!currentBlog.disableComments) ? (
        <Suspense fallback={<p>loading comments...</p>}>
          <LoadComments blogId={blogId} />
        </Suspense>
      ) : (
        <div className="comments">
          <p>comments disabled</p>
        </div>
      )} */}
    </>
  )
}

export default LoadBlogContent
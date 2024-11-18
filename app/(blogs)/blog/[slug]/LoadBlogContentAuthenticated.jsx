'use client'

import { apiServer } from '@/app/lib/const';
import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';
import { marked } from 'marked';



function LoadBlogContentAuthenticated({ blogId }) {
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`${apiServer}/api/blog/${blogId}`);
      if (!res.ok) {
        console.error("Could not fetch blog content");
        return;
      }
      const data = await res.json();
      setCurrentBlog(data);
    };

    fetchBlog();
  }, []);

  if (!currentBlog) {
    return <div className="loadingerror"><p>could not load blog content</p></div>
  }

  return (
    <>
      <div className="blogtitle">
        <h2>{currentBlog.title}</h2>
        {!currentBlog.isPublic && (<span>not public</span>)}
      </div>
      <div className="blogcontent">
        {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(currentBlog.content)) }} /> */}
        <div dangerouslySetInnerHTML={{ __html: marked.parse(currentBlog.content) }} />
        {/* <p>{currentBlog.content}</p> */}
      </div>
      {/* {(!currentBlog.disableComments) ? (
        <Suspense fallback={<p>loading comments...</p>}>
          <LoadCommentsAuthenticated blogId={blogId} />
        </Suspense>
      ) : (
        <div className="comments">
          <p>comments disabled</p>
        </div>
      )} */}
    </>
  )
}

export default LoadBlogContentAuthenticated
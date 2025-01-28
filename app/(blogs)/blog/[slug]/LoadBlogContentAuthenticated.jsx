'use client'

import { apiServer } from '@/app/lib/const';
import React, { useEffect, useState } from 'react'
import DOMPurify from "isomorphic-dompurify";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    sanitize: false,
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

function LoadBlogContentAuthenticated({ blogId }) {
  const [currentBlog, setCurrentBlog] = useState(null);
  const [parsedByDOMPurify, setParsedByDOMPurify] = useState(null);
  // const { setTheme } = useTheme();

  useEffect(() => {
    // const storageHandler = () => setTheme(sessionStorage.getItem('topic'));
    // window.addEventListener('storage', storageHandler);
    const fetchBlog = async () => {
      const res = await fetch(`${apiServer}/api/blog/${blogId}`);
      if (!res.ok) {
        console.error("Could not fetch blog content");
        return;
      }
      const data = await res.json();
      setCurrentBlog(data);
      const marki = marked.parse(data.content);
      const puri = DOMPurify.sanitize(marki, {
        ADD_TAGS: ['iframe'], // Add iframe as an allowed tag
        ADD_ATTR: ['src', 'width', 'height', 'frameborder', 'allowfullscreen'], // Allow necessary attributes for iframes
      });
      setParsedByDOMPurify(puri);
    };

    fetchBlog();

    // return () => {
    //   window.removeEventListener('storage', storageHandler);
    // };
  }, []);

  if (!currentBlog) {
    return <div className="loading-error">
      {/* <p>could not load blog content</p> */}
    </div>
  }

  return (
    <>
      <div className="blog-title">
        <h2>{currentBlog.title}</h2>
        {!currentBlog.isPublic && (<span>not public</span>)}
      </div>
      <div className="blog-content">
        <div dangerouslySetInnerHTML={{ __html: parsedByDOMPurify }} />
      </div>
    </>
  )
}

export default LoadBlogContentAuthenticated
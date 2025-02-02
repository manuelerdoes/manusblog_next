import { apiServer } from '@/app/lib/const';
import DOMPurify from "isomorphic-dompurify";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

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
  const data = await res.json();
  return data;
}

async function LoadBlogContent({ blogId }) {
  const currentBlog = await getBlog(blogId);

  if (!currentBlog) {
    return <div className="loading-error"><h2>Error</h2><p>Could not load blog content.<br></br>
      You might be trying to access a non-public blogpost. Please check if you are signed in.</p></div>
  }

  return (
    <>
      <div className="blog-title">
        <h2>{currentBlog.title}</h2>
        {!currentBlog.isPublic && (<span>not public</span>)}
      </div>
      <div className="blog-content">
        <div dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(currentBlog.content), {
            ADD_TAGS: ['iframe'], // Add iframe as an allowed tag
            ADD_ATTR: ['src', 'width', 'height', 'frameborder', 'allowfullscreen'], // Allow necessary attributes for iframes
          })
        }} />
      </div>
    </>
  )
}

export default LoadBlogContent;
import { apiServer } from '@/app/lib/const';
import DOMPurify from "isomorphic-dompurify";
import { marked } from 'marked';
import prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-tomorrow.css";
// import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

// Set up prism and marked options outside the component to prevent unnecessary reconfigurations
marked.setOptions({
  highlight: (code, lang) => {
    const language = prism.languages[lang] || prism.languages.markup;
    return prism.highlight(code, language, lang);
  },
});

// const marked = new Marked(
//   markedHighlight({
// 	emptyLangClass: 'hljs',
//     langPrefix: 'hljs language-',
//     highlight(code, lang, info) {
//       const language = hljs.getLanguage(lang) ? lang : 'plaintext';
//       return hljs.highlight(code, { language }).value;
//     }
//   })
// );

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
    return <div className="loadingerror"><h2>Error</h2><p>Could not load blog content.<br></br>
      You might be trying to access a non-public blogpost. Please check if you are signed in.</p></div>
  }

  const blogContentHTML = DOMPurify.sanitize(marked.parse(currentBlog.content), {
    ALLOWED_ATTR: ['class'], // Ensure class attributes are not stripped by DOMPurify
  });

  return (
    <>
      <div className="blogtitle">
        <h2>{currentBlog.title}</h2>
        {!currentBlog.isPublic && (<span>not public</span>)}
      </div>
      <div className="blogcontent">
        <div dangerouslySetInnerHTML={{ __html: blogContentHTML }} />
      </div>
    </>
  )
}

export default LoadBlogContent;
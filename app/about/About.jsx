'use client'

import { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// This is a Server Component (or Client-Side React Component)
export default function About() {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch the markdown file from the public/files folder
    fetch('/files/about.md')
      .then((res) => res.text()) // Get the content as text
      .then((data) => {
        // Convert the markdown into HTML
        const htmlContent = DOMPurify.sanitize(marked.parse(data));
        setContent(htmlContent);
      })
      .catch((err) => {
        console.error('Error loading file:', err);
        setContent('default about page');
      });
  }, []);

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
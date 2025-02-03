'use client'

import React, { useEffect, useState } from 'react'
import PublicButton from './PublicButton';
import CommentsButton from './CommentsButton';
import UploadPictures from '@/app/components/UploadPictures';
import { useRouter } from 'next/navigation';
import { apiServer } from '@/app/lib/const';
import { getFormattedDateTime } from '@/app/lib/utils';
import { useTheme } from 'next-themes';
import UploadFiles from '@/app/components/UploadFiles';

function EditBlogForm({ currentUser, blogid }) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [uploadedPictures, setUploadedPictures] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { setTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiServer}/api/blog/${blogid}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [blogid]);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


  const currentBlog = data;

  const updateBlog = async (title, topic, tags, content, isPublic, disableComments) => {
    const res = await fetch(`${apiServer}/api/blog/${blogid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        modified: getFormattedDateTime(),
        content: content,
        tags: tags,
        topic: topic,
        isPublic: isPublic,
        disableComments: disableComments,
      }),
    });
    if (!res.ok) {
      throw new Error('response was not ok');
    }
    const modified = await res.json();

    return modified.res;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, selectedtopic, tags, rawcontent } = Object.fromEntries(formData);
    const pub = document.getElementById('isPublicButton').value;
    const com = document.getElementById('commentsButton').value;

    const res = updateBlog(title, selectedtopic, tags, rawcontent, pub, com);
    router.push(`/blog/${blogid}`);
  }

  return (
    !currentUser ? (
      <div className="containero">
        <div className="newblog">
          <h2>You are not permitted to edit this blogpost</h2>
        </div>
      </div>
    ) : (
      <div className="containero">
        <div className='newblog'>
          <form onSubmit={handleSubmit} >
            <div className="settitle new-blog-item">
              <label htmlFor="">Blog Title:</label>
              <input type="text" placeholder='Blog Title'
                name="title" required defaultValue={currentBlog?.title} />
            </div>
            <div className="settopic new-blog-item">
              <label htmlFor="">Topic:</label>
              <select name="selectedtopic" defaultValue={currentBlog?.topic} onChange={(e) => setTheme(e.target.value)}>
                <option value="computer">Computer</option>
                <option value="food">Food</option>
                <option value="music">Music</option>
                <option value="photography">Photography</option>
                <option value="robotics">Robotics/Embedded</option>
                <option value="travel">Travel</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="settags new-blog-item">
              <label htmlFor="">Tags:</label>
              <input type="text" placeholder='Tags' name="tags" defaultValue={currentBlog?.tags} />
            </div>
            <div className="new-blog-options new-blog-item">
              <label htmlFor="">Options:</label>
              <div className="new-blog-options-buttons">
                <PublicButton publi={currentBlog?.isPublic} />
                <CommentsButton isDisabled={currentBlog?.disableComments} />
              </div>
            </div>
            <div className="new-blog-content new-blog-item">
              <label htmlFor="">Content:</label>
              <textarea placeholder='Lorem ipsum, dolor sit amet' name="rawcontent" rows="12" required defaultValue={currentBlog?.content}></textarea>
            </div>
            <div className="new-blog-buttons new-blog-item">
              <div className="cancelblog">
                <button type="button" onClick={router.back}>Cancel</button>
              </div>
              <div className="saveblog">
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div className="uploaders">
          <div className="pictureUpload">
            <UploadPictures currentUser={currentUser} blogid={blogid} uploadedPictures={uploadedPictures} setUploadedPictures={setUploadedPictures}/>
          </div>
          <div className="upload-separator"></div>
          <div className="fileUpload">
            <UploadFiles currentUser={currentUser} blogid={blogid} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
          </div>
        </div>
      </div>

    )
  );
}

export default EditBlogForm
'use client'

import React, { useEffect } from 'react'
import PublicButton from './PublicButton';
import CommentsButton from './CommentsButton';
import UploadPictures from '@/app/components/UploadPictures';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { apiServer } from '@/app/lib/const';
import { getFormattedDateTime } from '@/app/lib/utils';

function EditBlogForm({currentUser, blogid}) {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, error } = useSWR(`${apiServer}/api/blog/${blogid}`, fetcher)
 
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
      throw new Error('§sponse was not ok');
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
            <div className="settitle item">
              <label htmlFor="">Blog Title:</label>
              <input type="text" placeholder='Blog Title'
                name="title" required defaultValue={currentBlog?.title} />
            </div>
            <div className="settopic item">
              <label htmlFor="">Topic:</label>
              <select name="selectedtopic" defaultValue={currentBlog?.topic}>
                <option value="computer">Computer</option>
                <option value="food">Food</option>
                <option value="music">Music</option>
                <option value="photography">Photography</option>
                <option value="robotics">Robotics/Embedded</option>
                <option value="travel">Travel</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="settags item">
              <label htmlFor="">Tags:</label>
              <input type="text" placeholder='Tags' name="tags" defaultValue={currentBlog?.tags} />
            </div>
            <div className="setoptions item">
              <label htmlFor="">Options:</label>
              <div className="optionsbuttons">
                <PublicButton publi={currentBlog?.isPublic} />
                <CommentsButton isDisabled={currentBlog?.disableComments} />
              </div>
            </div>
            <div className="setcontent item">
              <label htmlFor="">Content:</label>
              <textarea placeholder='Lorem ipsum, dolor sit amet' name="rawcontent" required defaultValue={currentBlog?.content}></textarea>
            </div>
            <div className="newblogbuttons item">
              <div className="cancelblog">
                <button type="button" onClick={router.back}>Cancel</button>
              </div>
              <div className="saveblog">
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div className="pictureUpload">
          <UploadPictures currentUser={currentUser} blogid={blogid}/>
        </div>
      </div>

    )
  );
}

export default EditBlogForm
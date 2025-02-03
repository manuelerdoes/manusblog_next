'use client'
import React, { useState } from 'react'
import PublicButton from './PublicButton';
import CommentsButton from './CommentsButton';
import UploadPictures from '../../components/UploadPictures';
import { useRouter } from 'next/navigation';
import { getFormattedDateTime, sleep } from '@/app/lib/utils';
import { apiServer } from '@/app/lib/const';
import { useSession } from "next-auth/react"
import { useTheme } from 'next-themes';
import UploadFiles from '@/app/components/UploadFiles';

function NewBlog() {
  const router = useRouter();
  const { data: session } = useSession()
  const [uploadedPictures, setUploadedPictures] = useState([]);
  const { setTheme } = useTheme();

  const currentUser = {
    email: session?.user.email,
  }

  //const currentUser = auth.currentUser;

     const connectFileToBlog = async (fileName, blogId) => {
        try {
            const res = await fetch(`${apiServer}/api/file/${blogId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileName: fileName,
                }),
            });
            if (!res.ok) {
                console.error("Could not connect blog to file");
            }
        } catch (error) {
            console.error("Error connecting blog to file: ", error);
        }
    }

  const postNewBlog = async (title, topic, tags, content, isPublic, disableComments) => {
    const res = await fetch(`${apiServer}/api/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: currentUser.email,
        title: title,
        created: getFormattedDateTime(),
        content: content,
        tags: tags,
        topic: topic,
        isPublic: isPublic,
        disableComments: disableComments,
      }),
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const blogId = await res.json();
      
    if (uploadedPictures.length > 0) {
      for (let i = 0; i < uploadedPictures.length; i++) {
        await connectFileToBlog(uploadedPictures[i], blogId.res);
      }
    }


    return blogId.res;
  }

  const newBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, selectedtopic, tags, rawcontent } = Object.fromEntries(formData);
    const pub = document.getElementById('isPublicButton').value;
    const com = document.getElementById('commentsButton').value;
    const res = postNewBlog(title, selectedtopic, tags, rawcontent, pub, com);
    console.log("new blog added! id: ", res);
    await sleep(500);
    router.push('/blog/latest');
  }


  return (
    !session ? (
      <div className="containero">
        <div className="newblog">
          <h2>Please log in to create a new blog</h2>
        </div>
      </div>
    ) : (
      <div className="containero">
        <div className='newblog'>
          <form onSubmit={newBlog} >
            <div className="settitle new-blog-item">
              <label htmlFor="">Blog Title:</label>
              <input type="text" placeholder='Blog Title'
                name="title" required />
            </div>
            <div className="settopic new-blog-item">
              <label htmlFor="">Topic:</label>
              <select name="selectedtopic" onChange={(e) => setTheme(e.target.value)}>
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
              <input type="text" placeholder='Tags' name="tags" />
            </div>
            <div className="new-blog-options new-blog-item">
              <label htmlFor="">Options:</label>
              <div className="new-blog-options-buttons">
                <PublicButton />
                <CommentsButton />
              </div>
            </div>
            <div className="new-blog-content new-blog-item">
              <label htmlFor="">Content:</label>
              <textarea placeholder='Lorem ipsum, dolor sit amet' name="rawcontent" rows="12" required></textarea>
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
            <UploadPictures currentUser={currentUser} uploadedPictures={uploadedPictures} setUploadedPictures={setUploadedPictures} />
          </div>
          <div className="upload-separator"></div>
          <div className="fileUpload">
            <UploadFiles currentUser={currentUser} />
          </div>
        </div>
      </div>

    )
  );
}

export default NewBlog
'use client'
import React, { useState } from 'react'
import PublicButton from './PublicButton';
import CommentsButton from './CommentsButton';
import UploadPictures from '../../components/UploadPictures';
import { useRouter } from 'next/navigation';
import { getFormattedDateTime, sleep } from '@/app/lib/utils';
import { apiServer } from '@/app/lib/const';
import { useSession } from "next-auth/react"

function NewBlog() {
  const router = useRouter();
  const { data: session } = useSession()
  const [uploadedPictures, setUploadedPictures] = useState([]);

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
            <div className="settitle item">
              <label htmlFor="">Blog Title:</label>
              <input type="text" placeholder='Blog Title'
                name="title" required />
            </div>
            <div className="settopic item">
              <label htmlFor="">Topic:</label>
              <select name="selectedtopic">
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
              <input type="text" placeholder='Tags' name="tags" />
            </div>
            <div className="setoptions item">
              <label htmlFor="">Options:</label>
              <div className="optionsbuttons">
                <PublicButton />
                <CommentsButton />
              </div>
            </div>
            <div className="setcontent item">
              <label htmlFor="">Content:</label>
              <textarea placeholder='Lorem ipsum, dolor sit amet' name="rawcontent" required></textarea>
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
          <UploadPictures currentUser={currentUser} uploadedPictures={uploadedPictures} setUploadedPictures={setUploadedPictures}/>
        </div>
      </div>

    )
  );
}

export default NewBlog
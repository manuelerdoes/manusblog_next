'use client'

import React, { useState } from 'react'
import { useEffect } from 'react';
import { adminUserId } from '../lib/const';
import { useRouter } from 'next/navigation';


const Details = () => {

  const [showEditButton, setShowEditButton] = useState(false);
  const [author, setAuthor] = useState(null);
  const router = useRouter();

  const allowed = true; // TODO find out if user is allowed to read blog


  const currentUser = {
    username: "Max Muster",
    email: "maximux@mesongo.com",
    avatar: "/avatar.png"
  }

  const currentBlog = {
    id: 1,
    title: "Test Blog Title",
    tags: "gaggi, bisi",
    created: 123, 
    modified: 453,
    topic: "computer",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia quidem quia neque facilis ut \
  harum repellat unde, maiores laboriosam excepturi animi optio voluptatem dolor consequuntur minima autem, \
  enim, sapiente corporis."
  }

  useEffect(() => {
    if (currentUser?.id === currentBlog?.userid || currentUser?.id === adminUserId) {
      setShowEditButton(true);
    } else {
      setShowEditButton(false);
    }
  }, [currentUser, currentBlog]);

  useEffect(() => {
    if (currentBlog && currentBlog.userid) {
      // TODO fetch author data
    }
  }, [/*currentBlog*/]);

  const handleClickEditButton = () => {
    // TODO: change to method that works with client component
    router.push('/editblog/' + currentBlog.id);
  }

  const handleClickDeleteButton = async () => {
    try {

      // TODO: delete blog 

    } catch (error) {
      console.log(error.message);
    }
  }


  return (

    !currentBlog ? (
      <div className="details">
        <p>no data</p>
      </div>
    ) : (
      allowed ? (
        <div className='details'>
          {showEditButton && (
            <div className="manageButtons">
              <div className="editButton">
                <button onClick={handleClickEditButton}>Edit Blog</button>
              </div>
              <div className="deleteButton">
                <button onClick={handleClickDeleteButton}>Delete Blog</button>
              </div>
            </div>
          )}
          <div className="author item">
            <h3>created by</h3>
            <div className="authorinfo">
              <div className="authorimage">
                <img src={author ? author.avatar || "/avatar.png" : "/avatar.png"} alt="" />
              </div>
              <div className="username">
                {currentBlog.username}
              </div>
            </div>
          </div>
          <div className="topic item">
            <h3>topic</h3>
            <div className="topico">
              <p className={currentBlog.topic}>{currentBlog.topic}</p>
            </div>
          </div>
          <div className="tags item">
            <h3>tags</h3>
            <p>{currentBlog.tags}</p>
          </div>
          <div className="timestamps item">
            <h3>created on</h3>
            <p>{currentBlog.created}</p>
            <h3>last modified</h3>
            <p>{currentBlog.modified}</p>
          </div>
        </div>
      ) : (
        <div className="details">
          <p>Access Denied</p>
        </div>
      )
    )
  )
}

export default Details
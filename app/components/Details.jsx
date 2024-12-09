'use client'

import React, { useState } from 'react'
import { useEffect } from 'react';
import { adminUserId, apiServer } from '../lib/const';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"


const Details = ({currentBlog, author}) => {

  const [showEditButton, setShowEditButton] = useState(false);
  const router = useRouter();

  const allowed = true; // TODO find out if user is allowed to read blog

  const { data: session } = useSession();

  const currentUser = session?.user;


  // useEffect(() => {
  //   if (currentUser?.id === currentBlog?.userId || currentUser?.id === adminUserId) {
  //     setShowEditButton(true);
  //   } else {
  //     setShowEditButton(false);
  //   }
  // }, [currentUser, currentBlog]);


  useEffect(() => {
    if (session?.user && (currentBlog?.userId === session?.user.email || session?.user.role === "admin")) {
      setShowEditButton(true);
    } else {
      setShowEditButton(false);
    }
  }, [session, currentBlog]);

  useEffect(() => {
    if (currentBlog && currentBlog.userId) {
      // TODO fetch author data
    }
  }, [/*currentBlog*/]);

  const handleClickEditButton = () => {
    router.push('/editblog/' + currentBlog.id);
  }

  const handleClickDeleteButton = async () => {
    try {

      const res = await fetch(`${apiServer}/api/blog/${currentBlog.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      router.push('/blog/latest');

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
                <img src={author ? author.image || "/avatar.png" : "/avatar.png"} alt="" />
              </div>
              <div className="username">
                {author?.name}
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
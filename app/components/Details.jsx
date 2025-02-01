'use client'

import React, { useState } from 'react'
import { useEffect } from 'react';
import { apiServer } from '../lib/const';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import { useTheme } from 'next-themes';
import { pageTitle, hostUrl } from '../lib/const';
import Link from 'next/link';

const commaListToArray = (commaList) => {
  return commaList.split(',').map((item) => item.trim());
}


const Details = ({ blogId }) => {

  const [showEditButton, setShowEditButton] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [tagArray, setTagArray] = useState([]);
  const router = useRouter();
  const { setTheme } = useTheme();

  const allowed = true; // TODO: find out if user is allowed to read blog

  const { data: session } = useSession();


  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`${apiServer}/api/blog/${blogId}`);
      if (!res.ok) {
        console.error("Could not fetch blog content");
        return;
      }
      const data = await res.json();
      setCurrentBlog(data);
      document.title = data.title + " | " + pageTitle;
      getUserInfo(data.userId);
      setTheme(data.topic);
      setTagArray(commaListToArray(data.tags));
      if (session?.user && (data.userId === session?.user.email || session?.user.role === "admin")) {
        setShowEditButton(true);
      } else {
        setShowEditButton(false);
      }
    };

    const getUserInfo = async (id) => {
      const res = await fetch(`${apiServer}/api/user/${id}`);
      if (!res.ok) {
        console.error('Could not fetch user info');
        return null;
      }
      const data = await res.json(); // Ensure the response is parsed as JSON
      setAuthor(data);
    }

    fetchBlog();

  }, [blogId]);



  useEffect(() => {
    if (session?.user && (currentBlog?.userId === session?.user.email || session?.user.role === "admin")) {
      setShowEditButton(true);
    } else {
      setShowEditButton(false);
    }
  }, [session]);

  // useEffect(() => {
  //   if (currentBlog) {
  //     setTheme(currentBlog.topic);
  //     // window.sessionStorage.setItem("topic", currentBlog.topic);
  //     // window.dispatchEvent(new Event("storage"));
  //   }
  // }, [blogId]);

  const handleClickEditButton = () => {
    router.push('/editblog/' + currentBlog.slug);
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
      <div className="blog-details">
        <p></p>
      </div>
    ) : (
      allowed ? (
        <div className='blog-details'>
          {showEditButton && (
            <div className="manage-buttons">
              <div className="edit-blog-button">
                <button onClick={handleClickEditButton}>Edit Blog</button>
              </div>
              <div className="delete-blog-button">
                <button onClick={handleClickDeleteButton}>Delete Blog</button>
              </div>
            </div>
          )}
          <div className="detail-author detail-item">
            <h3>created by</h3>
            <div className="detail-author-info">
              <div className="detail-author-image">
                <img src={author ? author.image || "/avatar.png" : "/avatar.png"} alt="" />
              </div>
              <div className="detail-author-username">
                {author?.name}
              </div>
            </div>
          </div>
          <div className="detail-topic detail-item">
            <h3>topic</h3>
            <div className="detail-topico">
              <p className={`detail-${currentBlog.topic}`}>
                <Link href={`${hostUrl}/allblogs?search=${currentBlog.topic}`}>{currentBlog.topic}</Link>
              </p>
            </div>
          </div>
          <div className="detail-tags detail-item">
            <h3>tags</h3>
            {/* <p>{currentBlog.tags}</p> */}
            <p>
              {tagArray.map((tag, index) => (
                <React.Fragment key={index}>
                  <Link href={`${hostUrl}/allblogs?search=${tag}`}>{tag}</Link>
                  {index < tagArray.length - 1 && ', '}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="detail-timestamps detail-item">
            <h3>created on</h3>
            <p>{currentBlog.created}</p>
            <h3>last modified</h3>
            <p>{currentBlog.modified}</p>
          </div>
        </div>
      ) : (
        <div className="blog-details">
          <p>Access Denied</p>
        </div>
      )
    )
  )
}

export default Details
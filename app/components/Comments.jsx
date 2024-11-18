'use client'

import React, { useState, useEffect } from 'react'
import { getFormattedDateTime } from '../lib/utils';
import { apiServer } from '../lib/const';
import { useSession } from "next-auth/react"

function Comments({ blogId/*, comments */ }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const currentUser = {
    email: session?.user.email
  }

  const currentBlog = {
    id: blogId,
    comments: comments,
  }

  useEffect(() => {
    // Fetch initial comments when component mounts
    const fetchComments = async () => {
      const res = await fetch(`${apiServer}/api/comments/${currentBlog.id}`);
      if (!res.ok) {
        console.error("Could not fetch comments");
        return;
      }
      const data = await res.json();
      setComments(data);
    };

    if (currentBlog?.id) {
      fetchComments();
    }
  }, [loading]);

  const toggleComments = async () => {
    const newShowComments = !showComments;
    setShowComments(newShowComments);

    // Scroll only if the new value of showComments is true (i.e., the comments are being shown)
    if (newShowComments) {
      window.scrollTo({
        top: document.documentElement.scrollHeight, // Scroll to the bottom of the page
        behavior: 'smooth'
      });
    }
  }

  const postNewComment = async (newcomment) => {
    const res = await fetch(`${apiServer}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blogId: currentBlog.id,
        userId: currentUser.email,
        created: getFormattedDateTime(),
        content: newcomment,
      }),
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const commentId = await res.json();

    return commentId.res;
  }


  const handleNewComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { newcomment } = Object.fromEntries(formData);

    if (!newcomment || !currentBlog?.id || !currentUser?.email) {
      console.log("Missing necessary data to submit the comment.");
      console.log("newcomment: ", newcomment);
      console.log("currentblogid: ", currentBlog.id);
      return;
    }

    try {
      const res = await postNewComment(newcomment);
      setCommentText("");
      console.log("Comment added successfully! id: " + res);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCommentAuthor = async (userId) => {
    const res = await fetch(`${apiServer}/api/user/${userId}`);
    if (!res.ok) {
      console.error("Could not fetch user");
      return;
    }
    const data = await res.json();
    return data.name;
  }



  return (
    !currentBlog.disableComments ? (
      <div className='comments'>
        <div className="commentsheader" onClick={toggleComments}>
          <h2>Comments</h2>
          <span onClick={toggleComments}>👁️</span>
        </div>
        {showComments && (
          <div className="allcomments">
            {!currentBlog.comments ? (
              <div className="commentcontainer">
                <h3>no comments</h3>
              </div>
            ) : (
              currentBlog?.comments.map((comment, index) => (
                <div key={comment.id || index} className="commentcontainer">
                  <div className="commentuser">
                    <h3>name of author</h3>
                    <span>{comment.created}</span>
                  </div>
                  <div className="commentcontent">
                    <p>{comment?.text}</p>
                  </div>
                </div>
              ))
            )
            }
            {session?.user ? (


              <div className="newcomment">
                <form onSubmit={handleNewComment}>
                  <div className="texti">
                    {/* <input type="text" placeholder='Comment' name='newcomment' /> */}
                    <textarea name='newcomment' id='newcomment'
                      value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                  </div>
                  <div className="boetton">
                    <button disabled={loading}>Submit</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="newcomment">
                <div className="signinmessage">
                  <p>Sign in to comment</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    ) : (
      <div className="comments">
        <p>comments disabled</p>
      </div>
    )
  )
}

export default Comments
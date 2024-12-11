'use client'

import React, { useState, useEffect } from 'react'
import { getFormattedDateTime } from '../lib/utils';
import { apiServer } from '../lib/const';
import { useSession } from "next-auth/react"

function Comments({ blogId/*, comments */ , disabled}) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUsernameWarning, setShowUsernameWarning] = useState(false);
  const [commentsDisabled, setCommentsDisabled] = useState(false);
  const { data: session } = useSession();

  const currentUser = {
    email: session?.user.email,
    username: session?.user.name
  }

  const currentBlog = {
    id: blogId,
    comments: comments,
  }

  useEffect(() => {
    // Fetch initial comments when component mounts
   // const disabled = checkIfCommentsDisabled(blogId);
    setCommentsDisabled(disabled);

    if (disabled) return;
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

  useEffect(() => {
    if (!session?.user.name) {
      setShowUsernameWarning(true);
    } else {
      setShowUsernameWarning(false);
    }
  }, [session?.user.name]);

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
        // TODO: change to userName, once db is updated
        userId: currentUser.username,
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
    if (!session) {
      console.log("User is not logged in.");
      return;
    }

    const formData = new FormData(e.target);
    const { newcomment } = Object.fromEntries(formData);

    if (!newcomment || !currentBlog?.id || !currentUser.username) {
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
    !commentsDisabled ? (
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
                    {/* TODO: change userId to userName once db is updated */}
                    <h3>{comment.userId.substring(0, 12) + (comment.userId.length > 15 ? '...' : '')}</h3>
                    <span>{comment.created}</span>
                  </div>
                  <div className="commentcontent">
                    <p>{comment?.text}</p>
                  </div>
                </div>
              ))
            )
            }
            {session?.user && !showUsernameWarning ? (


              <div className="newcomment">
                {/* {showUsernameWarning && <div className="warning">you need to set a username to comment</div>} */}
                <form onSubmit={handleNewComment}>
                  {/* <div className="namei">
                    <input type="text" name='nickname' id='nickname' placeholder='nickname' />
                  </div> */}
                  <div className="texti">
                    {/* <input type="text" placeholder='Comment' name='newcomment' /> */}
                    <textarea name='newcomment' id='newcomment' placeholder='your comment'
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
                  <p>Sign in to comment. Make sure to set a username.</p>
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
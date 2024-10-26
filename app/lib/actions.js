'use server'

import { newBlog, newComment } from "./dbActions";


const currentUser = {
  uid: 1,
  username: "Max Muster",
  email: "mumu@mu.com"
}


export async function addNewBlog(formdata, isPublic, disableComments) {
  const { title, selectedtopic, tags, rawcontent } = Object.fromEntries(formdata);
  newBlog(currentUser.uid, title, Date.now(), rawcontent, tags, selectedtopic, isPublic, disableComments);
}

export async function addNewComment(blogId, comment) {
  try {
    const commentId = newComment(blogId, currentUser.uid, comment, Date.now());
    return commentId;
  } catch (error) {
    console.error("Error adding comment: ", error.message);
    throw error;
  }
}

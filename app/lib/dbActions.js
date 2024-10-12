'use server'

// user actions

export async function newUser(id /* id from firebase user */, username, email, avatarURL) {

}

export async function updateUsername(id, newUsername) {

}

export async function updateAvatarURL(id, newAvatarURL) {

}

export async function deleteUser(id) {

}

export async function getUser(id) {
    
}


// blog actions

export async function newBlog(userId, title, username, created, content, tags, topic, isPublic, disableComments) {

}

export async function updateBlog(id, userId, title, username, created, modified, content, tags, topic, isPublic, disableComments) {

}

export async function deleteBlog(id) {

}

export async function getBlogList() {

}

export async function getAuthenticatedBlogList(userId) {

}

export async function getBlog(id) {

}


// comment actions

export async function newComment(blogId, userId, text, created) {

}

export async function getComments(blogId) {

}




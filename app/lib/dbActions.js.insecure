'use server'

import { pool, authPool } from './mysql';
import { boolStringToInt } from './utils';


// user actions

export async function getUser(email) {
  try {
    const [rows] = await authPool.query(`SELECT name, image FROM user WHERE email = '${email}'`);
    return rows[0];
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}


// blog actions

export async function newBlog(userId, title, created, content, tags, topic, isPublic, disableComments) {
  let isPublicInt = boolStringToInt(isPublic);
  let disableCommentsInt = boolStringToInt(disableComments);

  try {
    const [rows] = await pool.query(`INSERT INTO blog (userId, title, created, modified, content, tags, topic, isPublic, disableComments) 
        VALUES ('${userId}', '${title}', '${created}', '${created}', '${content}', '${tags}', '${topic}', '${isPublicInt}', '${disableCommentsInt}')`);
    return rows.insertId;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

export async function updateBlog(id, title, modified, content, tags, topic, isPublic, disableComments) {
  let isPublicInt = boolStringToInt(isPublic);
  let disableCommentsInt = boolStringToInt(disableComments);

  try {
    const [rows] = await pool.query(`UPDATE blog SET title = '${title}', modified = '${modified}', content = '${content}', tags = '${tags}', 
      topic = '${topic}', isPublic = '${isPublicInt}', disableComments = '${disableCommentsInt}' WHERE id = '${id}'`);
    return rows.affectedRows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

export async function deleteBlog(id) {
  try {
    const [rows] = await pool.query(`DELETE FROM blog WHERE id = '${id}'`);
    return rows.affectedRows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

export async function getBlogList() {
  try {
    const [rows] = await pool.query(`SELECT * FROM blog WHERE isPublic = 1 ORDER BY id DESC`);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}


export async function getAuthenticatedBlogList(userId) {
  try {
    const [rows] = await pool.query(`SELECT * FROM blog WHERE isPublic = 1 OR userId = '${userId}' GROUP BY id ORDER BY id DESC`);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}


export async function getBlog(id) {
  try {
    const [rows] = await pool.query(`SELECT * FROM blog WHERE id = '${id}' AND isPublic = 1`);
    return rows[0];
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

export async function getBlogAuthenticated(id, userId) {
  try {
    const [rows] = await pool.query(`SELECT * FROM blog WHERE id = '${id}' AND (isPublic = 1 OR userId = '${userId}')`);
    return rows[0];
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}


export async function getLatestBlogId() {
  try {
    const [rows] = await pool.query(`SELECT id FROM blog WHERE isPublic = 1 ORDER BY id DESC LIMIT 1`);
    return rows[0].id;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}


// comment actions

export async function newComment(blogId, userId, text, created) {
  try {
    const [rows] = await pool.query(`INSERT INTO Comment (blogId, userId, text, created) VALUES ('${blogId}', '${userId}', '${text}', '${created}')`);
    return rows.insertId;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

export async function getComments(blogId) {
  try {
    const [rows] = await pool.query(`SELECT * FROM Comment WHERE blogId = '${blogId}';`);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}




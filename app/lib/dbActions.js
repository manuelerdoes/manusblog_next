'use server';

import { pool, authPool } from './mysql';
import { boolStringToInt } from './utils';

// Helper function to log errors
function logError(action, error) {
  console.error(`${action} failed:`, error.message);
  throw new Error(`Database operation failed during ${action}`);
}

// User actions
export async function getUser(email) {
  try {
    const [rows] = await authPool.query(
      'SELECT name, image FROM User WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  } catch (error) {
    logError('getUser', error);
  }
}

// Blog actions
export async function newBlog(userId, title, created, content, tags, topic, isPublic, disableComments, slug) {
  const isPublicInt = boolStringToInt(isPublic);
  const disableCommentsInt = boolStringToInt(disableComments);

  try {
    const [rows] = await pool.query(
      `INSERT INTO Blog (userId, title, created, modified, content, tags, topic, isPublic, disableComments, slug) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, title, created, created, content, tags, topic, isPublicInt, disableCommentsInt, slug]
    );
    return rows.insertId;
  } catch (error) {
    logError('newBlog', error);
  }
}

export async function updateBlog(id, title, modified, content, tags, topic, isPublic, disableComments) {
  const isPublicInt = boolStringToInt(isPublic);
  const disableCommentsInt = boolStringToInt(disableComments);

  try {
    const [rows] = await pool.query(
      `UPDATE Blog SET title = ?, modified = ?, content = ?, tags = ?, topic = ?, isPublic = ?, disableComments = ? 
      WHERE id = ?`,
      [title, modified, content, tags, topic, isPublicInt, disableCommentsInt, id]
    );
    return rows.affectedRows;
  } catch (error) {
    logError('updateBlog', error);
  }
}

export async function deleteBlog(id) {
  try {
    const [rows] = await pool.query(
      'DELETE FROM Blog WHERE id = ?',
      [id]
    );
    return rows.affectedRows;
  } catch (error) {
    logError('deleteBlog', error);
  }
}

export async function getBlogList() {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Blog WHERE isPublic = 1 ORDER BY id DESC'
    );
    return rows;
  } catch (error) {
    logError('getBlogList', error);
  }
}

export async function getAuthenticatedBlogList(userId) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Blog WHERE isPublic = 1 OR userId = ? 
      GROUP BY id ORDER BY id DESC`,
      [userId]
    );
    return rows;
  } catch (error) {
    logError('getAuthenticatedBlogList', error);
  }
}

export async function getBlog(id) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Blog WHERE id = ? AND isPublic = 1',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    logError('getBlog', error);
  }
}

export async function getBlogBySlug(slug) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Blog WHERE slug = ? AND isPublic = 1',
      [slug]
    );
    return rows[0] || null;
  } catch (error) {
    logError('getBlog', error);
  }
}

export async function getBlogAuthenticated(id, userId) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Blog WHERE id = ? AND (isPublic = 1 OR userId = ?)`,
      [id, userId]
    );
    return rows[0] || null;
  } catch (error) {
    logError('getBlogAuthenticated', error);
  }
}

export async function getBlogBySlugAuthenticated(slug, userId) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Blog WHERE slug = ? AND (isPublic = 1 OR userId = ?)`,
      [slug, userId]
    );
    return rows[0] || null;
  } catch (error) {
    logError('getBlogAuthenticated', error);
  }
}

export async function getLatestBlogId() {
  try {
    const [rows] = await pool.query(
      `SELECT id FROM Blog WHERE isPublic = 1 ORDER BY id DESC LIMIT 1`
    );
    return rows[0]?.id || null;
  } catch (error) {
    logError('getLatestBlogId', error);
  }
}

export async function getLatestBlogSlug() {
  try {
    const [rows] = await pool.query(
      `SELECT slug FROM Blog WHERE isPublic = 1 ORDER BY id DESC LIMIT 1`
    );
    return rows[0]?.slug || null;
  } catch (error) {
    logError('getLatestBlogSlug', error);
  }
}

// Comment actions
export async function newComment(blogId, userId, text, created) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO Comment (blogId, userId, text, created) 
      VALUES (?, ?, ?, ?)`,
      [blogId, userId, text, created]
    );
    return rows.insertId;
  } catch (error) {
    logError('newComment', error);
  }
}

export async function getComments(blogId) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Comment WHERE blogId = ?`,
      [blogId]
    );
    return rows;
  } catch (error) {
    logError('getComments', error);
  }
}
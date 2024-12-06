import { pool } from "../mysql";

export async function getFilesOfBlog(blogId) {
  try {
    const [rows] = await pool.query(`SELECT fileName FROM BlogFile WHERE blogId = '${blogId}';`);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}
import { pool } from "../mysql";

export async function getFilesOfBlog(slug) {
  try {
    const [rows] = await pool.query(`SELECT fileName FROM BlogFileWithSlug WHERE slug = '${slug}';`);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}
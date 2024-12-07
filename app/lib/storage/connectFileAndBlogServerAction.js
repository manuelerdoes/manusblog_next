import { pool } from "../mysql";

export const connectFileAndBlog = async (file, blogId) => {
  try {
    pool.query(
      `INSERT INTO BlogFile (fileName, blogId) VALUES ('${file}', '${blogId}');`
    );
  } catch (error) {
    console.error('Database query failed:', error);
  }
}
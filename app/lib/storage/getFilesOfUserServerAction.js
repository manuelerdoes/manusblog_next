import { pool } from "../mysql";

export async function getFilesOfUser(email) {
  try {
    const [rows] = await pool.query(`SELECT name FROM File WHERE email = '${email}';`);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}
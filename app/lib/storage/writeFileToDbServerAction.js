import { pool } from "../mysql";

export const writeFileToDb = async (file, email) => {
  try {
    pool.query(
      `INSERT INTO File (name, email) VALUES ('${file}', '${email}');`
    );
  } catch (error) {
    console.error('Database query failed:', error);
  }
}
import { authPool } from "../mysql";

export const hasUsername = async (email) => {
  try {
    const [rows] = await authPool.query(`SELECT name FROM User WHERE email = '${email}';`);
    if (rows.length === 0) return false;
    if (rows[0].username === null) return false;
    return true;
  } catch (error) {
    console.error("Database query failed:", error);
  }
};

import { authPool } from "../mysql"
import { auth } from "@/app/auth";


export const getUsername = async () => {

  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  
  try {
    const [rows] = await authPool.query(`SELECT name FROM User WHERE id = '${session.user.id}';`);
    return rows[0].name;
  } catch (error) {
    console.error("Database query failed:", error);
  }
}
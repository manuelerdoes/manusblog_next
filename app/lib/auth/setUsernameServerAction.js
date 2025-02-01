'use server'

import { auth } from "@/app/auth";
import { authPool, pool } from "../mysql";

export const setNewUsername = async (username) => {

  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const uuid = session.user.id;
  const email = session.user.email;

  // Sanitize input
  // const uuidRegExp =
  //   /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  // if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
  //   throw new Error("Invalid UUID");
  // }

  console.log("username", username)
  const name = username.trim();

  try {
    await authPool.query(`UPDATE User SET name = '${name}' WHERE id = '${uuid}';`);
    await pool.query(`UPDATE Blog SET userName = '${name}' WHERE userId = '${email}';`);
    return "ok"
  } catch (error) {
    console.error("Database query failed:", error);
    return "error"
  }

}
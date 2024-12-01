'use server'

import { auth } from "@/app/auth";
import { authPool } from "../mysql";

export const setNewUsername = async (username) => {

  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const uuid = session.user.id;

  // Sanitize input
  // const uuidRegExp =
  //   /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  // if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
  //   throw new Error("Invalid UUID");
  // }

  console.log("username", username)
  const name = username.trim();

  try {
    await authPool.query(`UPDATE User SET name = '${username}' WHERE id = '${uuid}';`);
    return "ok"
  } catch (error) {
    console.error("Database query failed:", error);
    return "error"
  }

}
"use server";

import { auth } from "@/app/auth";

export const checkIsAuthenticated = async () => {
  const session = await auth();
  if (session) {
    return true;
  }
  return false;
};
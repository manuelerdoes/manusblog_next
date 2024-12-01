'use server'

import { authPool } from "../mysql";

export const clearStaleTokens = async () => {
  try {
    await authPool.query("DELETE FROM VerificationToken WHERE expires < NOW();");
  } catch (error) {
    throw error;
  }
};
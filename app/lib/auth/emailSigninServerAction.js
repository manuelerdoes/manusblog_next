"use server";

import { signIn } from "@/app/auth";

export const handleEmailSignIn = async (email) => {
  try {

    await signIn("nodemailer", { email, callbackUrl: "/usermanager" });

  } catch (error) {
    throw error;
  }
};
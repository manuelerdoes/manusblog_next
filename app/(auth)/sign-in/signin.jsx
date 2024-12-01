"use client";

import { handleEmailSignIn } from "@/app/lib/auth/emailSigninServerAction";
import { useTransition, useState } from "react";

export const SignInPage = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      startTransition(async () => {
        await handleEmailSignIn(formData.email);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="containero">
      <div className="login">
        <div className="loginitem">
          <h2>Sign In</h2>
          <form className="email-signin-form" onSubmit={handleSubmit}>
            <input
              className="form-input"
              type="email"
              maxLength={320}
              placeholder="Email Address"
              onChange={(e) =>
                setFormData({ email: e.target.value })
              }
              disabled={isPending}
              required
            />
            <button className="submit-button" type="submit">
              Sign in with email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
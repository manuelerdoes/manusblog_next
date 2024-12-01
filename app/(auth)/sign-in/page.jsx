import { redirect } from "next/navigation";
import { SignInPage } from "./signin";
import { checkIsAuthenticated } from "@/app/lib/auth/checkIsAuthenticated";

const SignIn = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/");
  } else {
    return <SignInPage />;
  }
};

export default SignIn;
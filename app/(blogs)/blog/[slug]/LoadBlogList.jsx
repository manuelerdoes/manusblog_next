import BlogList from "@/app/components/BlogList";
import { SessionProvider } from "next-auth/react"

async function LoadBlogList() {

  return (
    <>
    <SessionProvider>
      <BlogList />
    </SessionProvider>
    </>
  );
}

export default LoadBlogList;
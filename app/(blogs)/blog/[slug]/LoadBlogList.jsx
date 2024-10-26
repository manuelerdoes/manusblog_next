import BlogList from "@/app/components/BlogList";
import { apiServer } from "@/app/lib/const";

async function getBlogList() {
  const res = await fetch(`${apiServer}/api/blog`, {
    next: {
      revalidate: 10
    }
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json(); // Ensure the response is parsed as JSON
  return data;
}

async function LoadBlogList() {
  const currentBlogList = await getBlogList();

  return (
    <>
      <BlogList currentBlogList={currentBlogList} />
    </>
  );
}

export default LoadBlogList;
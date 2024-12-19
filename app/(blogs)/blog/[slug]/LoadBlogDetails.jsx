import Details from '@/app/components/Details';
import { apiServer } from '@/app/lib/const';
import React from 'react'

// async function getBlog(id) {
//   const res = await fetch(`${apiServer}/api/blog/${id}`);
//   if (!res.ok) {
//     console.error('Could not fetch blog');
//     return null;
//   }
//   const data = await res.json(); // Ensure the response is parsed as JSON
//   return data;
// }

// export async function getServerSideProps(context) {
//   console.log("get!!!!")
//   const res = await fetch(`${apiServer}/api/blog/${context.params.slug}`, {
//     next: {
//       revalidate: 10
//     }
//   });
//   if (!res.ok) {
//     console.error('Could not pre fetch blog');
//     return null;
//   }
//   const data = await res.json(); // Ensure the response is parsed as JSON
//   return { props: { data } };
// }

// async function getUserInfo(id) {
//   const res = await fetch(`${apiServer}/api/user/${id}`);
//   if (!res.ok) {
//     console.error('Could not fetch user info');
//     return null;
//   }
//   const data = await res.json(); // Ensure the response is parsed as JSON
//   return data;
// }

async function LoadBlogDetails({blogId}) {
 // const currentBlog = await getBlog(blogId);

  // if (!data) {
  //   return <div className="loadingerror"><p>could not load blog detail</p></div>
  // }

  //const author = await getUserInfo(currentBlog.userId);

  return (
    <Details blogId={blogId} />
  )
}

export default LoadBlogDetails
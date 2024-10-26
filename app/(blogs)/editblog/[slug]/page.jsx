import React, { Suspense } from 'react'
import EditBlogForm from './EditBlogForm';
import { apiServer } from '@/app/lib/const';

function EditBlog({ params }) {

  const currentUser = {
    id: 1,
    username: "Max Muster",
    email: "mumu@mu.com"
  }
  //const currentUser = auth.currentUser;


  // const fetchBlog = async () => {
  //   console.log("starti fetchi")
  //   const res = await fetch(`${apiServer}/api/blog/${params.slug}`, {
  //     next: {
  //       revalidate: 0,
  //     }
  //   });
  //   if (!res.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const blog = await res.json();
  //   //console.log(blog);
  //   return blog;
  // }

  // const currentBlog = fetchBlog();




  return (
    <>
      <Suspense fallback={<p>loading ...</p>}>
        <EditBlogForm /*blog={currentBlog}*/ currentUser={currentUser} blogid={params.slug}/>
      </Suspense>
    </>
  );
}

export default EditBlog
import { deleteBlog, getBlog, getBlogAuthenticated, getBlogBySlugAuthenticated, getBlogBySlug, getLatestBlogId, getLatestBlogSlug, updateBlog } from "@/app/lib/dbActions";
import { NextResponse } from "next/server";
import { auth } from "@/app/auth";

export const dynamic = 'force-dynamic';

export const GET = auth(async function GET(req, { params }) {
  //let searchId = params.slug;
  let searchId = params.slug;
  let res = null;

  if (params.slug === 'latest') {
    //searchId = await getLatestBlogId();
    searchId = await getLatestBlogSlug();
  } 
  // else if (!/^\d+$/.test(params.slug)) { // Ensure `id` is numeric
  //   return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
  // }

  if (req.auth) {
    //res = await getBlogAuthenticated(searchId, req.auth.user.email);
    res = await getBlogBySlugAuthenticated(searchId, req.auth.user.email);
  } else {
    res = await getBlogBySlug(searchId);
  }

  if (!res) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(res, { status: 200 });
})

export const PUT = auth(async function PUT(request, { params }) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const blog = await request.json();
  // console.log("update blog: ", params.slug, blog.title, blog.modified,
  //   blog.content, blog.tags, blog.topic, blog.isPublic, blog.disableComments);
  const res = await updateBlog(params.slug, blog.title, blog.modified,
    blog.content, blog.tags, blog.topic, blog.isPublic, blog.disableComments);
  if (!res) {
    return NextResponse.json({ error: res }, { status: 404 });
  }
  return NextResponse.json(res, { status: 200 });
})

export const DELETE = auth(async function DELETE(request, { params }) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const blogId = params.slug;
  const authenticatedUser = request.auth.user;

  // Check if the authenticated user is the author of the blog or has the role "admin"
  const blog = await getBlogAuthenticated(blogId, authenticatedUser.email);

  if (!blog || (blog.userId !== authenticatedUser.email && authenticatedUser.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized to delete blog" }, { status: 403 });
  }
  
  const res = await deleteBlog(params.slug);
  if (!res) {
    return NextResponse.json({ error: res }, { status: 404 });
  }
  return NextResponse.json(res, { status: 200 });
})
import { deleteBlog, getBlog, getLatestBlogId, updateBlog } from "@/app/lib/dbActions";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(_, { params }) {

  let searchId = params.id;

  if (params.id === 'latest') {
    searchId = await getLatestBlogId();
  }

  const res = await getBlog(searchId);

  if (!res) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }


  return NextResponse.json(res, { status: 200 });
}

export async function PUT(request, { params }) {
  const blog = await request.json();
  // console.log("update blog: ", params.id, blog.title, blog.modified,
  //   blog.content, blog.tags, blog.topic, blog.isPublic, blog.disableComments);
  const res = await updateBlog(params.id, blog.title, blog.modified,
    blog.content, blog.tags, blog.topic, blog.isPublic, blog.disableComments);
  if (!res) {
    return NextResponse.json({ error: res }, { status: 404 });
  }
  return NextResponse.json(res, { status: 200 });
}

export async function DELETE(_, { params }) {
  const res = await deleteBlog(params.id);
  if (!res) {
    return NextResponse.json({ error: res }, { status: 404 });
  }
  return NextResponse.json(res, { status: 200 });
}
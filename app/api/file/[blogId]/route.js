import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { getFilesOfBlog } from "@/app/lib/storage/getFilesOfBlogServerAction";
import { connectFileAndBlog } from "@/app/lib/storage/connectFileAndBlogServerAction";
import { fileStorageUrl } from "@/app/lib/const";


export const dynamic = 'force-dynamic';

export const GET = auth(async function GET(request, { params }) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const files = await getFilesOfBlog(params.blogId);
  if (!files) {
    return NextResponse.json({ error: "no files" }, { status: 200 });
  }
  return NextResponse.json(files, { status: 200 });
})

export const POST = auth(async function POST(request, { params }) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const data = await request.json();

  try {
    //const fileUrl = fileStorageUrl + "/" + encodeURIComponent(data.fileName);
    const fileUrl = new URL(fileStorageUrl + '/' + data.fileName, import.meta.url).href;
    //const fileUrl = data.fileName;
    const res = await connectFileAndBlog(fileUrl, params.blogId);
    return NextResponse.json({ res }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
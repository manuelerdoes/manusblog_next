import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { getFilesOfBlog } from "@/app/lib/storage/getFilesOfBlogServerAction";

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
import { getBlogList, newBlog } from "@/app/lib/dbActions";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await getBlogList();
  // const blogs = JSON.stringify(res);
  return NextResponse.json(res, { status: 200 });
}

export async function POST(request) {
  const data = await request.json();

  try {
    const res = await newBlog(data.userId, data.title, data.created, data.content,
      data.tags, data.topic, data.isPublic, data.disableComments);
    return NextResponse.json({ res }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


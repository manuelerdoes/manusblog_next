import { newComment } from "@/app/lib/dbActions";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  try {
    const res = await newComment(data.blogId, data.userId, data.content, data.created);
    return NextResponse.json({ res }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
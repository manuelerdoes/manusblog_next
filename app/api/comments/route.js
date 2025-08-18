import { newComment } from "@/app/lib/dbActions";
import { NextResponse } from "next/server";
import { auth } from "@/app/auth";

export const POST = auth(async function POST(request) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  } else if (!request.auth.user.role) {
    // TODO: check for roles like admin or author
    return NextResponse.json({ message: "Not permitted to write comment" }, { status: 401 });
  }

  const data = await request.json();

  try {
    const res = await newComment(data.blogId, data.userId, data.content, data.created);
    return NextResponse.json({ res }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
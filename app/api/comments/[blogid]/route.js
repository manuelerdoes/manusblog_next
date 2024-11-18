import { getComments, newComment } from "@/app/lib/dbActions";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {  
  const res = await getComments(params.blogid)
  return NextResponse.json(res, { status: 200 });
}

import { getBlog, getLatestBlogId } from "@/app/lib/dbActions";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(_, { params }) {

  let searchId = params.id;

  if (params.id === 'latest') {
    searchId = await getLatestBlogId();
  }

  const res = await getBlog(searchId);

  if (!res) {
    return NextResponse.json({error: "Blog not found"}, { status: 404 });
  }
  
  
  return NextResponse.json(res, { status: 200 });
}
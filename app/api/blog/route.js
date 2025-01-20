import { getAuthenticatedBlogList, getBlogList, newBlog } from "@/app/lib/dbActions";
import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
export const dynamic = 'force-dynamic';
import { nanoid } from 'nanoid'

var slugify = require('slugify')

export const GET = auth(async function GET(req) {
  let res = null;
  if (req.auth) {
    res = await getAuthenticatedBlogList(req.auth.user.email);
  } else {
    res = await getBlogList();
  }
  // const blogs = JSON.stringify(res);
  return NextResponse.json(res, { status: 200 });
})

export const POST = auth(async function POST(request) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const data = await request.json();

  try {
    const slug = `${slugify(data.title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      replacement: '-',
    })}-${nanoid(5)}`;

    const res = await newBlog(data.userId, data.title, data.created, data.content,
      data.tags, data.topic, data.isPublic, data.disableComments, slug);
    return NextResponse.json({ res }, { status: 201 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})


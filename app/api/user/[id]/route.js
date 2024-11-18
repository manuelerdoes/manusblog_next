import { NextResponse } from "next/server";
import { getUser } from "@/app/lib/dbActions";

export const dynamic = 'force-dynamic';

export async function GET(_, { params }) {
  const user = await getUser(params.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}
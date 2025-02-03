import { NextResponse } from "next/server";
import { getUser } from "@/app/lib/dbActions";
import { auth } from "@/app/auth";
import { saveFileToStorage } from "@/app/lib/storage/saveFileToStorageServerAction";
import { fileStorageDirectory, fileStorageUrl } from "@/app/lib/const";
import { writeUserImageUrlToDb } from "@/app/lib/storage/writeUserImageUrlToDbServerAction";
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const user = await getUser(params.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}


export const POST = auth(async function POST(request, { params }) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file'); // assuming the file is sent with the name 'file'
  const email = params.id;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Process the file here, e.g., save it to storage
  const uniqueFileName = `${nanoid(5)}-${file.name}`;
  const filePath = `${fileStorageDirectory}/${uniqueFileName}`;
  const fileBuffer = await file.arrayBuffer();
  const fileData = Buffer.from(fileBuffer);
  //const fileUrl = fileStorageUrl + "/" + encodeURIComponent(file.name);
  const fileUrl = new URL(fileStorageUrl + '/' + uniqueFileName, import.meta.url).href;
  await saveFileToStorage(filePath, fileData);
  await writeUserImageUrlToDb(fileUrl, email);

  return NextResponse.json({ message: 'File uploaded successfully', fileUrl }, { status: 201 });
});
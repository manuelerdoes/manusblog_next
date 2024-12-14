import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { saveFileToStorage } from "@/app/lib/storage/saveFileToStorageServerAction";
import { fileStorageDirectory, fileStorageUrl } from "@/app/lib/const";
import { writeFileToDb } from "@/app/lib/storage/writeFileToDbServerAction";
import { getFilesOfUser } from "@/app/lib/storage/getFilesOfUserServerAction";

export const dynamic = 'force-dynamic';

export const POST = auth(async function POST(request) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file'); // assuming the file is sent with the name 'file'
  const email = formData.get('email');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Process the file here, e.g., save it to storage
  const filePath = `${fileStorageDirectory}/${file.name}`;
  const fileBuffer = await file.arrayBuffer();
  const fileData = Buffer.from(fileBuffer);
  //const fileUrl = fileStorageUrl + "/" + encodeURIComponent(file.name);
  const fileUrl = new URL(fileStorageUrl + '/' + file.name, import.meta.url).href;
  await saveFileToStorage(filePath, fileData);
  await writeFileToDb(fileUrl, email);

  return NextResponse.json({ message: 'File uploaded successfully', fileUrl }, { status: 201 });
});

export const GET = auth(async function GET(request) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const email = request.auth.user.email;
  const files = await getFilesOfUser(email);

  return NextResponse.json(files, { status: 200 });
});
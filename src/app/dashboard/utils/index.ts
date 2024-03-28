"use server";
import { writeFile } from "fs/promises";
import { extname, join } from "path";

async function upload(data: FormData, userName: any) {
  const date = Date.now();

  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  // Validate file type
  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed");
  }

  // Validate file size (max 1MB)
  if (file.size > 1024 * 1024) {
    throw new Error("File size exceeds the maximum limit (1MB)");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filenameWithoutExt = file.name.split(".")[0];
  const extension = extname(file.name);
  const UserNameWithoutSpaces = userName.replace(/\s+/g, "");
  const FileNameWithoutSpaces = filenameWithoutExt.replace(/\s+/g, "");

  const fileName = `${FileNameWithoutSpaces}-${date}-${UserNameWithoutSpaces}${extension}`;
  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = join("./public", "uploads", fileName);
  await writeFile(path, buffer);

  return { success: true, fileName };
}

export default upload;

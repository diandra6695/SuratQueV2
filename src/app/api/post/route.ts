import prisma from "@/lib/db";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const posts = await prisma.post.findMany({});
  return NextResponse.json({ posts });
};

export const POST = async (req: NextRequest): Promise<Response> => {
  const { title, content, file } = await req.json();

  // const file: File | null = data.get("file") as unknown as File;

  // if (!file) {
  //   return NextResponse.json({ success: false });
  // }

  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);

  // // With the file data in the buffer, you can do whatever you want with it.
  // // For this, we'll just write it to the filesystem in a new location
  // const path = `/uploads/${file.name}`;
  // await writeFile(path, buffer);

  const post = await prisma.post.create({
    data: {
      title,
      content,
      file,
    },
  });
  return NextResponse.json({ post });
};

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id) || 0;

  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ post });
};

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id) || 0;

  const post = await prisma.post.delete({
    where: {
      id: id,
    },
  });

  if (!post) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }

  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
};

export const PATCH = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id) || 0;

  const { title, content } = await req.json();

  const post = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
    },
  });

  return NextResponse.json({ post });
};

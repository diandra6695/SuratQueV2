import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await prisma.user.findMany({
    include: {
      organization: true,
    },
  });
  return NextResponse.json({ user });
};

export const POST = async (req: NextRequest) => {
  const { username, email, avatar } = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        avatar,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: "create failed", error },
      { status: 400 }
    );
  }
};

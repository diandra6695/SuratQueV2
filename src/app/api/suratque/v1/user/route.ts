import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// get all users
export const GET = async (req: NextRequest) => {
  const user = await prisma.user.findMany({
    include: {
      organization: true,
    },
  });
  return NextResponse.json({ user });
};

// create new user
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

// update user
export const PUT = async (req: NextRequest) => {
  const { id, username, email, avatar } = await req.json();
  if (!(id && username && email && avatar)) {
    return NextResponse.json(
      { message: "Some fields are missing" },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        avatar,
      },
    });
    return NextResponse.json(
      { message: "update success", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "update failed", error },
      { status: 400 }
    );
  }
};

// update user
export const PATCH = async (req: NextRequest) => {
  const { id, username, email, avatar } = await req.json();
  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        avatar,
      },
    });
    return NextResponse.json(
      { message: "update success", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "update failed", error },
      { status: 400 }
    );
  }
};

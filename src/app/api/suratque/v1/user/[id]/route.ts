import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// get all users by id
export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id) || 0;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        organization: true,
      },
    });

    if (user == null) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id) || 0;
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "delete success", user });
  } catch (error) {
    return NextResponse.json(
      { message: "delete failed", error },
      { status: 400 }
    );
  }
};

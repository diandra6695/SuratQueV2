import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id) || 0;
  try {
    const organization = await prisma.organization.findFirst({
      where: {
        id,
      },
    });
    if (organization == null) {
      return NextResponse.json(
        { message: "organization not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ organization });
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
    const organization = await prisma.organization.delete({
      where: {
        id,
      },
    });
    if (!organization) {
      return NextResponse.json(
        { message: "organization not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "delete success", organization });
  } catch (error) {
    return NextResponse.json(
      { message: "delete failed", error },
      { status: 400 }
    );
  }
};

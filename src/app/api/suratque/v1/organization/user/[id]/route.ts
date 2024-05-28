import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const user_id = Number(context.params.id) || 0;
  try {
    const organization = await prisma.organization.findMany({
      where: {
        user_id,
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

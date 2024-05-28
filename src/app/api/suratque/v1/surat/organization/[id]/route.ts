import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const org_id = Number(context.params.id) || 0;
  try {
    const surat = await prisma.surat.findMany({
      where: {
        organization_id: org_id,
      },
    });
    if (surat == null) {
      return NextResponse.json(
        { message: "organization not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(surat);
  } catch (error) {
    return NextResponse.json({ error });
  }
};

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id) || 0;
  try {
    const surat = await prisma.surat.delete({
      where: {
        id,
      },
    });
    if (!surat) {
      return NextResponse.json({ message: "surat not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "delete success", surat });
  } catch (error) {
    return NextResponse.json(
      { message: "delete failed", error },
      { status: 400 }
    );
  }
};

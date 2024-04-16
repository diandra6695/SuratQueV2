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

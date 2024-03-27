import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const organizations = await prisma.organization.findMany({});
  return NextResponse.json({ organizations });
};

export const POST = async (req: NextRequest) => {
  const { name, type_organization } = await req.json();

  const organization = await prisma.organization.create({
    data: {
      name,
      type_organization,
      user_id: 1,
    },
  });

  return NextResponse.json({ organization });
};

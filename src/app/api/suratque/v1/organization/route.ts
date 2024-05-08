import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// get all organizations
export const GET = async (req: NextRequest) => {
  const organizations = await prisma.organization.findMany({});
  return NextResponse.json({ organizations });
};

// create new organization
export const POST = async (req: NextRequest) => {
  const { name, type_organization, user_id } = await req.json();

  try {
    const organization = await prisma.organization.create({
      data: {
        name,
        type_organization,
        user_id,
      },
    });

    return NextResponse.json({ organization });
  } catch (error) {
    return NextResponse.json(
      { message: "create failed", error },
      { status: 400 }
    );
  }
};

// update organization
export const PUT = async (req: NextRequest) => {
  const { id, name, type_organization } = await req.json();
  if (!(id && name && type_organization)) {
    return NextResponse.json(
      { message: "Some fields are missing" },
      { status: 400 }
    );
  }
  try {
    const organization = await prisma.organization.update({
      where: {
        id,
      },
      data: {
        name,
        type_organization,
      },
    });
    return NextResponse.json({
      message: "update success",
      organization,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "update failed", error },
      { status: 400 }
    );
  }
};

// update organization
export const PATCH = async (req: NextRequest) => {
  const { id, name, type_organization } = await req.json();

  try {
    const organization = await prisma.organization.update({
      where: {
        id,
      },
      data: {
        name,
        type_organization,
      },
    });

    return NextResponse.json(
      { message: "update success", organization },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "update failed", error },
      { status: 400 }
    );
  }
};

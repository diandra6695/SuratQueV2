import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const surat = await prisma.surat.findMany({});
  return NextResponse.json(surat);
};

export const POST = async (req: NextRequest) => {
  const {
    jenis_surat,
    no_surat,
    tanggal_surat,
    tanggal_terima,
    perihal,
    organisasi,
    pengirim,
    file,
    organization_id,
  } = await req.json();
  try {
    const surat = await prisma.surat.create({
      data: {
        organization_id,
        jenis_surat,
        no_surat,
        tanggal_surat,
        tanggal_terima,
        perihal,
        organisasi,
        pengirim,
        file,
      },
    });

    return NextResponse.json(surat);
  } catch (error) {
    return NextResponse.json(
      { message: "create failed", error },
      { status: 400 }
    );
  }
};

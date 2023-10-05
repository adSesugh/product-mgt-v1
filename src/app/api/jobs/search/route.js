import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const job_roles = await prisma.jobRole.findMany({
      select: { id: true, name: true },
    });

    return NextResponse.json({
      job_roles,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
      },
      { status: 500 }
    );
  }
}

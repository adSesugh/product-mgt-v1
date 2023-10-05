import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const job_roles = await prisma.jobRole.findMany();
    return NextResponse.json({ job_roles }, { status: 200 });
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

export async function POST(req) {
  const { name, description, salary } = await req.json();
  const formattedSalary = parseFloat(salary);
  try {
    const job_role = await prisma.jobRole.create({
      data: {
        name,
        description,
        salary: formattedSalary,
      },
    });
    return NextResponse.json(
      { job_role, message: "Job role created!" },
      { status: 201 }
    );
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

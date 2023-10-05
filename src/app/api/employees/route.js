import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({});
    return NextResponse.json({ employees }, { status: 200 });
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
  const { first_name, middle_name, last_name, jobRoleId } = await req.json();

  try {
    const employee = await prisma.employee.create({
      data: {
        first_name,
        middle_name,
        last_name,
        jobRoleId,
      },
    });
    return NextResponse.json(
      { employee, message: "Employee created!" },
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

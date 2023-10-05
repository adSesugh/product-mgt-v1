import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, route) {
  const { id } = route.params;
  try {
    const job_role = await prisma.jobRole.findUnique({
      where: {
        id,
      },
    });
    if (!job_role) {
      return NextResponse.json(
        {
          message: "Job Role not found!",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        job_role,
      },
      { status: 200 }
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

export async function PUT(req, route) {
  const { id } = route.params;
  const { name, description, salary } = await req.json();
  const formattedSalary = parseFloat(salary);
  try {
    const job_role = await prisma.jobRole.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        salary: formattedSalary,
      },
    });
    return NextResponse.json(
      {
        job_role,
        message: "Job Role updated!",
      },
      { status: 200 }
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

export async function DELETE(req, route) {
  const { id } = route.params;
  try {
    const job_role = await prisma.jobRole.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Job Role deleted!",
      },
      { status: 204 }
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

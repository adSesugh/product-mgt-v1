import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, route) {
  const { id } = route.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    if (!employee) {
      return NextResponse.json(
        {
          message: "Job Role not found!",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        employee,
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
  const { first_name, middle_name, last_name, jobRole } = await req.json();
  try {
    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data: {
        first_name,
        middle_name,
        last_name,
        jobRoleId: jobRole,
      },
    });
    return NextResponse.json(
      {
        employee,
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
    const employee = await prisma.employee.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Employee deleted!",
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

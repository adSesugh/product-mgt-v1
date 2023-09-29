import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Couldn't create user" },
        { status: 400, statusText: "Bad Request" }
      );
    }

    return NextResponse.json(
      { user, message: "User created!" },
      { status: 201, statusText: "Ok" }
    );
  } catch (error) {
    console.log(error);
  }
}

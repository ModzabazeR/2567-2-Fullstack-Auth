import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { isValidEmail, isValidPassword } from "@/lib/auth";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, username, bio } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    // Validate email and password format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          message: "Invalid email",
        },
        { status: 400 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          message:
            "Invalid password. Only letters and numbers are allowed, and must be at least 8 characters long.",
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await argon2.hash(password);

    // Store user in database
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error: error.code,
            message: "User already exists",
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: "Error registering user", error },
      { status: 500 }
    );
  }
}

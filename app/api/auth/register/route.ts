import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as argon2 from "argon2";
import * as yup from "yup";

const prisma = new PrismaClient();

// Define validation schema
const registerSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 
      "Password must contain at least one uppercase letter, one lowercase letter, and one number")
    .required("Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the request data
    await registerSchema.validate(body);

    const { email, password } = body;

    // Hash password
    const hashedPassword = await argon2.hash(password);

    // Store user in database
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ message: error.errors[0] }, { status: 400 });
    }

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

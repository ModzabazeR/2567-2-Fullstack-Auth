import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { isValidPassword, isValidEmail } from "@/lib/auth";
import * as argon2 from "argon2";
import * as yup from "yup";

// Define validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the request data
    await loginSchema.validate(body);

    const { email, password } = body;

    // Find user from MySQL database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (user.password === "") {
      return NextResponse.json(
        { message: "Wrong login method" },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token, role: user.role });
  } catch (error) {
    console.log(error);

    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ message: error.errors[0] }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Error logging in", error },
      { status: 500 }
    );
  }
}

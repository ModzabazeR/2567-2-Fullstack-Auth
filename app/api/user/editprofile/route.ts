import { authorizeRole } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as yup from "yup";

// Define validation schema
const profileSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  bio: yup.string().max(255, "Bio must be less than 255 characters"),
});

export async function PUT(req: NextRequest) {
  try {
    // Authorize the user
    const user = authorizeRole(["user", "manager", "admin"], req);

    // If user is not authorized, return 401
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();

    // Validate the request data
    await profileSchema.validate(body);

    // Check if username is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        username: body.username,
        NOT: {
          id: user.id,
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username is already taken" },
        { status: 400 }
      );
    }

    // Update the user profile
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        bio: body.bio,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        bio: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);

    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ message: error.errors[0] }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}

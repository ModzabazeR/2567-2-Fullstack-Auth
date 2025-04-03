import { authorizeRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

// Define validation schema
const updateRoleSchema = yup.object({
  userId: yup.number().required("User ID is required"),
  newRole: yup
    .string()
    .oneOf(["user", "manager", "admin"], "Invalid role")
    .required("New role is required"),
});

export async function PATCH(req: NextRequest) {
  const user = authorizeRole(["admin"], req);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  try {
    const body = await req.json();

    // Validate request body
    await updateRoleSchema.validate(body);

    const { userId, newRole } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        bio: true,
        role: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user role:", error);

    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ message: error.errors[0] }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Error updating user role" },
      { status: 500 }
    );
  }
}

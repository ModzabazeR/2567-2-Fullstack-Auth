import { NextRequest, NextResponse } from "next/server";
import { authorizeRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as yup from "yup";

// Define validation schemas
const getCommentsSchema = yup.object({
  userId: yup.string().required("User ID is required"),
});

const createCommentSchema = yup.object({
  commentedOn: yup.number().required("User ID to comment on is required"),
  content: yup
    .string()
    .required("Comment content is required")
    .max(1000, "Comment must be less than 1000 characters"),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Validate query parameters
    await getCommentsSchema.validate({ userId });

    const comments = await prisma.comment.findMany({
      where: {
        commentedOn: userId!,
      },
      include: {
        commentedByUser: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);

    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ message: error.errors[0] }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const user = authorizeRole(["user", "manager", "admin"], request);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  try {
    const body = await request.json();

    // Validate request body
    await createCommentSchema.validate(body);

    const { commentedOn, content } = body;

    const comment = await prisma.comment.create({
      data: {
        commentedOn: commentedOn,
        commentedBy: user.id,
        content,
      },
      include: {
        commentedByUser: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);

    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ message: error.errors[0] }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

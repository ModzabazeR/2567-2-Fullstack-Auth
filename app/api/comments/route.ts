import { NextRequest, NextResponse } from "next/server";
import { authorizeRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        commentedOn: parseInt(userId),
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
    const { commentedOn, content } = body;

    if (!commentedOn || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        commentedOn: parseInt(commentedOn),
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
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

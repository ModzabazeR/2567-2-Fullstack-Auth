import { authorizeRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(req: NextRequest) {
  console.log(req);
  const posts = await prisma.post.findMany({
    include: {
      User_Post_writerIdToUser: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return NextResponse.json(
    posts.map((post) => {
      // rename to writer
      return {
        ...post,
        writer: post.User_Post_writerIdToUser,
      };
    })
  );
}

// Define validation schema
const createPostSchema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

export async function POST(req: NextRequest) {
  const user = authorizeRole(["user", "manager", "admin"], req);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  try {
    const body = await req.json();
    await createPostSchema.validate(body);

    const { title, content } = body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        writerId: user.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);

    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ message: error.errors[0] }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user = authorizeRole(["manager"], req);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  try {
    const postId = req.nextUrl.searchParams.get("postId");
    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

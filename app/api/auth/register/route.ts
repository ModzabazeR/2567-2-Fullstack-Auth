import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
	try {
		const { username, password } = await req.json();
		if (!username || !password) {
			return NextResponse.json({ message: "Username and password required" }, { status: 400 });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Store user in database
		const user = await prisma.user.create({
			data: { username, password: hashedPassword },
		});

		return NextResponse.json({ message: "User registered successfully", user });
	} catch (error: any) {
		const errorMessage = "Error registering user";

		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return NextResponse.json({
					message: errorMessage, error: {
						code: error.code,
						description: "Username already exists",
					}
				}, { status: 400 });
			}
		}

		return NextResponse.json({ message: errorMessage, error }, { status: 500 });
	}
}

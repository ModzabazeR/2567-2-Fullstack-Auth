import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

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
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return NextResponse.json({
					error: error.code,
					message: "Username already exists"
				}, { status: 400 });
			}
		}

		return NextResponse.json({ message: "Error registering user", error }, { status: 500 });
	}
}

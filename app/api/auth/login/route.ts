import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const { username, password } = await req.json();
		if (!username || !password) {
			return NextResponse.json({ message: "Username and password required" }, { status: 400 });
		}

		// Find user from MySQL database
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		// Verify password
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		// Generate JWT token
		const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });

		return NextResponse.json({ token, role: user.role });
	} catch (error) {
		return NextResponse.json({ message: "Error logging in", error }, { status: 500 });
	}
}

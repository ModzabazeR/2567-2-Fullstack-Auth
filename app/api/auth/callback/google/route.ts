import { NextRequest, NextResponse } from "next/server";
import { oAuth2Client } from "@/lib/googleAuth";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      // Redirect กลับไปหน้า login เมื่อไม่มี code
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login`
      );
    }

    // exchange code to token
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // use token เพื่อเข้าถึงข้อมูลผู้ใช้จาก Google
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Google API error:", response.status);
      // Redirect to login พร้อมแสดงข้อความ error
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login`
      );
    }

    const userData = await response.json();

    if (!userData.email) {
      // Redirect กลับไปหน้า login เมื่อไม่พบอีเมลผู้ใช้
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login`
      );
    }

    // is user in db yet?
    let user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    // if not. create new user.
    if (!user) {
      try {
        user = await prisma.user.create({
          data: {
            email: userData.email,
            // split name and capitalize then join with empty string
            username: userData.name
              .split(" ")
              .map(
                (name: string) => name.charAt(0).toUpperCase() + name.slice(1)
              )
              .join(""),
            firstName: userData.given_name || null,
            lastName: userData.family_name || null,
            password: "",
            role: "user", // กำหนด role เริ่มต้นเป็น user
          },
        });
      } catch (dbError) {
        console.error("Database error creating user:", dbError);
        return NextResponse.redirect(
          `${
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
          }/login?error=database_error`
        );
      }
    }

    // create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Google login error:", error);
    // Redirect กลับไปหน้า login เมื่อเกิดข้อผิดพลาดใดๆ
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login`
    );
  }
}

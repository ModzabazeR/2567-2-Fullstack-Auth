import { NextRequest, NextResponse } from 'next/server';
import { oAuth2Client } from '@/lib/googleAuth';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // get code , error from URL query params
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    // if has error parameter or no code (กรณียกเลิกหรือเกิดข้อผิดพลาด) redirect to login
    if (error || !code) {
      console.log("Google auth error or canceled:", error || "No code provided");
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`);
    }

    // exchange code to token
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // use token เพื่อเข้าถึงข้อมูลผู้ใช้จาก Google
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Google API error:", response.status);
      // Redirect to login พร้อมแสดงข้อความ error
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`);
    }

    const userData = await response.json();

    if (!userData.email) {
      // Redirect กลับไปหน้า login เมื่อไม่พบอีเมลผู้ใช้
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`);
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
            password: Math.random().toString(36).slice(-10) + Date.now().toString(),
            role: 'user', // กำหนด role เริ่มต้นเป็น user
          },
        });
      } catch (dbError) {
        console.error("Database error creating user:", dbError);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login?error=database_error`);
      }
    }

    // create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // ส่ง redirect พร้อม token และ role ในรูปแบบของ URL parameters
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback?token=${token}&role=${user.role}`
    );
  } catch (error) {
    console.error('Google login error:', error);
    // Redirect กลับไปหน้า login เมื่อเกิดข้อผิดพลาดใดๆ
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`);
  }
}
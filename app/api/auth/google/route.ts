import { NextResponse } from 'next/server';
import { oAuth2Client } from '@/lib/googleAuth';

export async function GET() {
  try {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
    });

    return NextResponse.redirect(authorizeUrl);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to initialize login' },
      { status: 500 }
    );
  }
}

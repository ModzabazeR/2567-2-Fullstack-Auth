import { OAuth2Client } from 'google-auth-library';

// ใช้ base URL จาก environment variables และเพิ่มเส้นทาง callback
const baseUrl = process.env.NEXT_PUBLIC_API_URL ;
const redirectUri = `${baseUrl}/api/auth/callback/google`;

// สร้าง OAuth client
export const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri
);

// // Log เพื่อตรวจสอบว่า redirect URI ถูกต้อง (เฉพาะในขั้นตอนการพัฒนา)
// if (process.env.NODE_ENV === 'development') {
//   console.log('Google OAuth Redirect URI:', redirectUri);
// }
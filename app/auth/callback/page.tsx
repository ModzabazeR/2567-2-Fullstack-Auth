"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const role = searchParams.get('role');

    if (token) {
      // เก็บ token ใน localStorage
      localStorage.setItem('token', token);

      // redirect ตาม role
      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'manager') {
        router.push('/manager');
      } else {
        router.push('/dashboard'); // สำหรับ user ทั่วไป
      }
    } else {
      router.push('/login?error=authentication_failed');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Authenticating...</p>
    </div>
  );
}
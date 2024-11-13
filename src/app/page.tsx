"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the signup page
    router.push('/Signup');
  }, [router]);

  return null; // Render nothing while redirecting
}

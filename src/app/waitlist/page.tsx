'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WaitlistRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/signup');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Redirecting to sign up...</p>
    </div>
  );
}

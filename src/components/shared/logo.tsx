
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

export function Logo({ className }: { className?: string }) {
  const { user } = useAuth();
  const href = user ? '/dashboard' : '/';

  return (
    <Link
      href={href}
      className={cn("text-xl font-bold font-headline text-foreground", className)}
      suppressHydrationWarning
    >
      <span>Meet A Cause</span>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

export function NotificationBell() {
  const { user } = useAuth();
  const unreadCount = user?.notifications?.filter(n => !n.isRead).length || 0;

  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <Link href="/notifications">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className={cn(
            'absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground',
            'text-[10px] font-bold flex items-center justify-center'
          )}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </Link>
    </Button>
  );
}

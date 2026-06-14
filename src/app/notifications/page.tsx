'use client';

import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function formatNotificationTime(createdAt: string): string {
  try {
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) return createdAt;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return createdAt;
  }
}

export default function NotificationsPage() {
  const { user, markNotificationRead, markAllNotificationsRead } = useAuth();

  const notifications = [...(user?.notifications || [])].sort((a, b) => {
    if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
    try {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } catch {
      return 0;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 animate-slide-in-from-bottom">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-muted-foreground text-sm mt-1">
              You have {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}.
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllNotificationsRead}>
            <Check className="mr-2 h-3 w-3" /> Mark all as read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mb-3 opacity-30" />
              <p className="text-sm font-medium">No notifications yet</p>
              <p className="text-xs mt-1">Sign up for events to get started.</p>
            </div>
          ) : (
            <div>
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={cn(
                    'grid grid-cols-[12px_1fr_auto] items-start gap-3 p-4 border-b last:border-b-0 transition-colors',
                    !notification.isRead && 'bg-primary/5 hover:bg-primary/8',
                    notification.isRead && 'hover:bg-muted/30'
                  )}
                >
                  <span className={cn(
                    'flex h-2 w-2 rounded-full mt-1.5 shrink-0',
                    !notification.isRead ? 'bg-primary' : 'bg-transparent'
                  )} />
                  <div className="grid gap-1 min-w-0">
                    <p className={cn('text-sm leading-none', !notification.isRead ? 'font-semibold' : 'font-medium')}>
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatNotificationTime(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs shrink-0"
                      onClick={() => markNotificationRead(notification.id)}
                    >
                      Mark read
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { notifications } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NotificationsPage() {
  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 animate-slide-in-from-bottom">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadNotifications > 0 && (
            <p className="text-muted-foreground text-sm mt-1">
              You have {unreadNotifications} unread messages.
            </p>
          )}
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
             <CardTitle className="text-base">All Notifications</CardTitle>
             {notifications.length > 0 && <Button variant="outline" size="sm">Mark all as read</Button>}
          </CardHeader>
          <CardContent className="p-0">
             <div className="grid">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="grid grid-cols-[25px_1fr] items-start p-4 border-b last:border-b-0"
                    >
                        <span className={cn("flex h-2 w-2 translate-y-1.5 rounded-full", !notification.isRead && "bg-primary")} />
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {notification.createdAt}
                            </p>
                        </div>
                    </div>
                ))}
                { notifications.length === 0 && <p className="text-sm text-muted-foreground text-center p-6">No new notifications.</p> }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

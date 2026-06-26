'use client';

import Link from 'next/link';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth-context';
import { Logo } from '../shared/logo';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user, logout } = useAuth();

  if (user) {
    const unreadCount = user.notifications?.filter(n => !n.isRead).length || 0;

    return (
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-lg px-4 sm:px-6">
        <div className="flex items-center gap-4 md:hidden">
          <Logo />
        </div>

        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button asChild variant="ghost" size="icon" className="rounded-full relative">
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className={cn(
                  'absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full',
                  'bg-primary text-primary-foreground',
                  'text-[10px] font-bold flex items-center justify-center'
                )}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
              <span className="sr-only">View notifications</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'V'}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="mailto:support@meetacause.vercel.app">Support</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  }

  // Public header for unauthenticated users
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-lg px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Logo />
      </div>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-2 md:flex">
        <Button variant="ghost" asChild><Link href="/events">Events</Link></Button>
        <Button variant="ghost" asChild><Link href="/ngos">Organizations</Link></Button>
        <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
        <Button asChild><Link href="/signup">Sign Up</Link></Button>
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="p-4 border-b">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <Logo />
            </div>
            <nav className="grid gap-4 text-base p-4">
              <Link href="/events" className="text-muted-foreground hover:text-foreground">Events</Link>
              <Link href="/ngos" className="text-muted-foreground hover:text-foreground">Organizations</Link>
            </nav>
            <div className="mt-auto p-4 space-y-4 border-t">
              <Button asChild variant="outline" className="w-full"><Link href="/login">Login</Link></Button>
              <Button asChild className="w-full"><Link href="/signup">Sign Up</Link></Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

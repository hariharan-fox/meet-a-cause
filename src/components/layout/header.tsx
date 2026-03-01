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
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notifications, volunteer } from '@/lib/placeholder-data';
import { Logo } from '../shared/logo';

export default function Header() {
    const { user, logout } = useAuth();

    if (user) {
        const volunteerAvatar = PlaceHolderImages.find(p => p.id === 'avatar-priya-sharma');
        const volunteerName = user?.name || volunteer.name;
        const unreadNotifications = notifications.filter(n => !n.isRead).length;
        
        return (
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-lg px-4 sm:px-6">
                <div className="flex items-center gap-4 md:hidden">
                  <Logo />
                </div>

                <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <Button asChild variant="ghost" size="icon" className="rounded-full relative">
                        <Link href="/notifications">
                            <Bell className="h-5 w-5" />
                            {unreadNotifications > 0 && (
                                <span className="absolute top-1 right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                </span>
                            )}
                            <span className="sr-only">View notifications</span>
                        </Link>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                {volunteerAvatar && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={volunteerAvatar.imageUrl} alt={volunteerName} data-ai-hint={volunteerAvatar.imageHint} />
                                        <AvatarFallback>{volunteerName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{volunteerName}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href="/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href="mailto:support@just-hands.app">Support</a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        );
    }

    // Public header
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-lg px-4 sm:px-6">
             <div className="flex items-center gap-4">
                <Logo />
             </div>
             
             {/* Desktop Menu */}
             <nav className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" asChild><Link href="/events">Events</Link></Button>
                <Button variant="ghost" asChild><Link href="/ngos">NGOs</Link></Button>
                <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
                <Button asChild><Link href="/signup">Sign Up</Link></Button>
             </nav>
             
             {/* Mobile Menu */}
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
                        <Link href="/ngos" className="text-muted-foreground hover:text-foreground">NGOs</Link>
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

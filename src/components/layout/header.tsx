'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Home, Calendar, Building, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from '../shared/logo';
import { useAuth } from '@/lib/auth-context';

const navLinks = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/ngos', label: 'NGOs', icon: Building },
];

export default function Header() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-card px-4 sticky top-0 z-30 md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0" aria-describedby={undefined}>
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <div className="flex h-16 items-center border-b px-6">
                        <Logo />
                    </div>
                    <div className="flex-1 py-4">
                        <nav className="grid items-start gap-1 px-2 text-sm font-medium">
                            {navLinks.map((link) => {
                                const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent',
                                            isActive && 'bg-accent text-primary font-semibold'
                                        )}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="mt-auto p-4 border-t">
                        <div className="grid gap-2">
                            <Button variant="ghost" className="w-full justify-start" asChild>
                                <Link href="/settings">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <div className="md:hidden">
                <Logo />
            </div>

            <div className="w-10 h-10 md:hidden" />

        </header>
    );
}

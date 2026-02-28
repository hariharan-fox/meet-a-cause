'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Building, User, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { PanelLeft } from 'lucide-react';
import { Logo } from '../shared/logo';

const mainNavLinks = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/dashboard/my-impact', label: 'Badges', icon: Award },
    { href: '/ngos', label: 'NGOs', icon: Building },
];

const allNavLinks = [
    ...mainNavLinks,
    { href: '/settings', label: 'Profile', icon: User },
]

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t">
            <div className="flex justify-around h-16 items-center">
                {mainNavLinks.map((link) => {
                    const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'flex flex-col items-center justify-center text-center text-muted-foreground w-full h-full transition-all hover:text-primary',
                                isActive && 'text-primary font-semibold'
                            )}
                        >
                            <link.icon className="h-5 w-5 mb-1" />
                            <span className="text-xs">{link.label}</span>
                        </Link>
                    );
                })}
                 <Sheet>
                    <SheetTrigger asChild>
                        <button className="flex flex-col items-center justify-center text-center text-muted-foreground w-full h-full transition-all hover:text-primary">
                           <PanelLeft className="h-5 w-5 mb-1" />
                            <span className="text-xs">More</span>
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-60 bg-background/90 backdrop-blur-lg">
                        <div className="flex h-16 items-center border-b px-6">
                            <Logo />
                        </div>
                         <div className="flex-1 py-4 overflow-y-auto">
                            <nav className="grid items-start gap-1 px-2 text-sm font-medium">
                                {allNavLinks.map((link) => {
                                    const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href);
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent',
                                                isActive && 'bg-primary text-primary-foreground font-semibold hover:bg-primary/90'
                                            )}
                                        >
                                            <link.icon className="h-4 w-4" />
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}

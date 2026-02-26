'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Building, User, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/dashboard/my-impact', label: 'Badges', icon: Award },
    { href: '/ngos', label: 'NGOs', icon: Building },
    { href: '/settings', label: 'Profile', icon: User },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t">
            <div className="flex justify-around h-16 items-center">
                {navLinks.map((link) => {
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
            </div>
        </nav>
    );
}

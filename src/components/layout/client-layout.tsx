'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from './header';
import Sidebar from './sidebar';
import { useAuth } from '@/lib/auth-context';
import BottomNav from './bottom-nav';
import Footer from './footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isLoading } = useAuth();

    const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup');
    const isPublicPage = isAuthPage || pathname?.startsWith('/events') || pathname?.startsWith('/ngos');

    useEffect(() => {
        if (isLoading) return;

        if (!user && !isPublicPage) {
            router.push('/login');
        }
        if (user && isAuthPage) {
            router.push('/');
        }
    }, [user, isLoading, isPublicPage, isAuthPage, router, pathname]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (user) {
        // Authenticated user layout
        return (
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <Sidebar />
                <div className="flex flex-col">
                    <Header />
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 pb-20 md:pb-6">
                        {children}
                    </main>
                </div>
                <BottomNav />
            </div>
        );
    }
    
    // Public layout for unauthenticated users
    if (isAuthPage) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 flex items-center justify-center p-4">
                    {children}
                </main>
                <Footer />
            </div>
        );
    }

    if (isPublicPage) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        );
    }

    return null; // Should be redirected
}

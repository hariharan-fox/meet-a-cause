'use client';

import { Logo } from '../shared/logo';

export default function Header() {
    return (
        <header className="flex h-16 items-center justify-center border-b bg-background/80 backdrop-blur-lg px-4 sticky top-0 z-30 md:hidden">
            <Logo />
        </header>
    );
}

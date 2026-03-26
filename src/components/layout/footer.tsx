import Link from 'next/link';
import { Logo } from '../shared/logo';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Connecting volunteers with NGOs for a better world.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">Events</Link></li>
              <li><Link href="/ngos" className="text-sm text-muted-foreground hover:text-foreground">NGOs</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">For NGOs</h4>
            <ul className="space-y-1">
              <li><Link href="/signup" className="text-sm text-muted-foreground hover:text-foreground">Register</Link></li>
              <li><Link href="/best-practices" className="text-sm text-muted-foreground hover:text-foreground">Best Practices</Link></li>
              <li><Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">Support</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-1">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Meet A Cause. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

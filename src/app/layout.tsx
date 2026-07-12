import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/lib/auth-context';
import { BadgeUnlockProvider } from '@/lib/badge-unlock-context';
import { ClientLayout } from '@/components/layout/client-layout';
import { FirebaseClientProvider } from '@/firebase';
import { Merriweather, Inter } from 'next/font/google';
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoScript,
} from '@/components/GoogleTagManager';

const headlineFont = Merriweather({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-headline',
});

const bodyFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Meet A Cause',
  description: 'Meet a cause worth showing up for. Real events. Real people. Real impact.',
  openGraph: {
    title: 'Meet A Cause',
    description: 'Meet a cause worth showing up for. Real events. Real people. Real impact.',
    url: 'https://meetacause.in',
    siteName: 'Meet A Cause',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/studio-9823971235-a7e78.firebasestorage.app/o/meet%20a%20cause%20logo.jpg?alt=media&token=c378dc24-1d4d-4711-8633-a79b3e47d529',
        width: 1200,
        height: 630,
      },
    ],
  },
  verification: {
    google: '9sQq3hzdXUliJdYWaT25cTlwmze_Tz_clUhW7e6BWno',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(headlineFont.variable, bodyFont.variable)}>
      <head>
        <GoogleTagManagerScript />
        {/* Google Translate */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'ta,hi,te,kn,ml,bn,mr,gu,pa,ur,en',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false,
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <script
          type="text/javascript"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />
        {/* Hide Google Translate banner and branding */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .goog-te-banner-frame { display: none !important; }
            .goog-te-gadget-icon { display: none !important; }
            .goog-te-gadget { font-size: 0 !important; }
            .goog-te-gadget .goog-te-combo { 
              font-size: 13px !important;
              border: 1px solid hsl(var(--border)) !important;
              border-radius: 6px !important;
              padding: 4px 8px !important;
              background: hsl(var(--background)) !important;
              color: hsl(var(--foreground)) !important;
              cursor: pointer !important;
              outline: none !important;
            }
            body { top: 0 !important; }
            #goog-gt-tt { display: none !important; }
          `,
        }} />
      </head>
      <body className={cn('min-h-screen bg-background font-body text-foreground/90 antialiased')}>
        <GoogleTagManagerNoScript />
        <FirebaseClientProvider>
          <BadgeUnlockProvider>
            <AuthProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
            </AuthProvider>
          </BadgeUnlockProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}

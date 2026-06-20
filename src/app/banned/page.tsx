'use client';

import { Shield, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BannedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <Shield className="h-10 w-10 text-destructive" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-destructive">Account Suspended</h1>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Your account has been suspended by the Meet A Cause team.
            If you believe this is a mistake, please contact us and we will review your case.
          </p>
        </div>
        <Button asChild variant="outline" className="gap-2">
          <a href="mailto:support@meetacause.in">
            <Mail className="h-4 w-4" /> Contact Support
          </a>
        </Button>
      </div>
    </div>
  );
}

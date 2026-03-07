'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Logo } from '@/components/shared/logo';
import { CheckCircle2 } from 'lucide-react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Please fill out your name and email.");
      return;
    }
    setIsLoading(true);
    setError(null);
    // Mock API call to add to waitlist
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
        <Card className="mx-auto max-w-md w-full">
            <CardHeader className="text-center">
            <Logo className="justify-center mb-2" />
            {isSubmitted ? (
                    <CardTitle className="text-lg">You're on the list!</CardTitle>
            ) : (
                    <CardTitle className="text-lg">Join the Volunteer Waitlist</CardTitle>
            )}
            
            <CardDescription>
                    {isSubmitted 
                    ? "We'll notify you as soon as we launch. Get ready to make a difference!"
                    : "Be the first to know when we launch! Sign up for early access to amazing volunteering opportunities."
                    }
            </CardDescription>
            </CardHeader>
            <CardContent>
            {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4 my-8">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                    <p className="font-semibold">Thank you for your interest!</p>
                        <Button asChild variant="outline">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                    {error && (
                    <div className="text-sm text-red-500 text-center font-medium bg-red-100 p-2 rounded-md">
                        {error}
                    </div>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input
                            id="full-name"
                            placeholder="Priya Sharma"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="priya@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                        <div className="grid gap-2">
                        <Label htmlFor="interests">What causes or skills interest you? (Optional)</Label>
                        <Textarea
                            id="interests"
                            placeholder="e.g., environmental work, teaching children, graphic design..."
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                    </Button>
                </form>
            )}
                <div className="mt-4 text-center text-sm">
                Are you an NGO?{' '}
                <Link href="/signup" className="underline">
                Register here
                </Link>
            </div>
            </CardContent>
        </Card>
    </div>
  );
}

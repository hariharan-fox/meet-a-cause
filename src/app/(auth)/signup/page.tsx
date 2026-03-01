'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Logo } from '@/components/shared/logo';
import { useAuth } from '@/lib/auth-context';

export default function SignupPage() {
  const { signup } = useAuth();
  const searchParams = useSearchParams();
  const referrerId = searchParams.get('ref');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'volunteer' | 'ngo'>('volunteer');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signup(name, email, password, role, referrerId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <Logo className="justify-center mb-2" />
          <CardTitle className="text-lg">Sign Up</CardTitle>
          <CardDescription>Create your account to start making a difference</CardDescription>
        </CardHeader>
        <CardContent>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Account Type</Label>
              <RadioGroup
                value={role}
                onValueChange={(val) => setRole(val as 'volunteer' | 'ngo')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="volunteer" id="volunteer" />
                  <Label htmlFor="volunteer">I'm a Volunteer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ngo" id="ngo" />
                  <Label htmlFor="ngo">We're an NGO</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create an account'}
            </Button>
            <Button variant="outline" className="w-full" type="button">
              Sign up with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

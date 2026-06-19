'use client';

import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Logo } from '@/components/shared/logo';
import { useAuth } from '@/lib/auth-context';
import { sanitizeName, sanitizeEmail } from '@/lib/sanitize';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100).regex(/^[a-zA-Z\s\-'\.]+$/, { message: 'Name can only contain letters, spaces, hyphens and apostrophes.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }).max(254),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }).max(128).regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter.' }).regex(/[0-9]/, { message: 'Must contain at least one number.' }),
});

export default function SignupPage() {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const { errors } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    form.clearErrors();
    try {
      const cleanName = sanitizeName(values.name);
      const cleanEmail = sanitizeEmail(values.email);
      if (!cleanName) { form.setError('name', { message: 'Please enter a valid name.' }); return; }
      await signup(cleanName, cleanEmail, values.password);
    } catch (err: any) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          form.setError('root.serverError', { type: 'email-in-use', message: 'An account with this email already exists.' }); break;
        case 'auth/weak-password':
          form.setError('password', { message: 'Password is too weak.' }); break;
        default:
          form.setError('root.serverError', { message: 'An error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <Logo className="justify-center mb-2" />
          <CardTitle className="text-lg">Create a Volunteer Account</CardTitle>
          <CardDescription>Enter your details to join the community.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {errors.root?.serverError && (
                <div className="text-sm text-destructive text-center font-medium bg-destructive/10 p-3 rounded-md flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{errors.root.serverError.message}</span>
                  </div>
                  {errors.root.serverError.type === 'email-in-use' && (
                    <Button variant="link" asChild className="h-auto p-0 text-sm text-destructive underline">
                      <Link href="/">Click here to log in instead</Link>
                    </Button>
                  )}
                </div>
              )}
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="Priya Sharma" {...field} maxLength={100} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input placeholder="priya@example.com" {...field} maxLength={254} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} {...field} maxLength={128} className="pr-10" />
                      <button type="button" onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" tabIndex={-1}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <p className="text-xs text-muted-foreground">Min 8 characters, one uppercase, one number.</p>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account? <Link href="/" className="underline">Login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

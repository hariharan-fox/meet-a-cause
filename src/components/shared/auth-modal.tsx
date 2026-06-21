'use client';

import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Eye, EyeOff, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth-context';
import { sanitizeName, sanitizeEmail } from '@/lib/sanitize';

// ── Schemas ──────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100)
    .regex(/^[a-zA-Z\s\-'\.]+$/, { message: 'Name can only contain letters, spaces, hyphens and apostrophes.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }).max(254),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }).max(128)
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter.' })
    .regex(/[0-9]/, { message: 'Must contain at least one number.' }),
});

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'signup';
};

export function AuthModal({ open, onOpenChange, defaultTab = 'login' }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <DialogTitle className="sr-only">{tab === 'login' ? 'Log in' : 'Sign up'}</DialogTitle>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 border-b border-border">
          <button
            onClick={() => setTab('login')}
            className={`py-4 text-sm font-medium transition-colors ${
              tab === 'login'
                ? 'text-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`py-4 text-sm font-medium transition-colors ${
              tab === 'signup'
                ? 'text-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign up
          </button>
        </div>

        <div className="px-6 pb-6 pt-4">
          {tab === 'login' ? (
            <LoginForm onSuccess={() => onOpenChange(false)} onSwitchTab={() => setTab('signup')} />
          ) : (
            <SignupForm onSuccess={() => onOpenChange(false)} onSwitchTab={() => setTab('login')} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Login Form ────────────────────────────────────────────
function LoginForm({ onSuccess, onSwitchTab }: { onSuccess: () => void; onSwitchTab: () => void }) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { errors } = form.formState;

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    form.clearErrors();
    try {
      await login(values.email, values.password);
      onSuccess();
    } catch (err: any) {
      let message = 'An unknown error occurred.';
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          message = 'Invalid email or password.'; break;
        default:
          message = 'Failed to log in. Please try again.';
      }
      form.setError('root.serverError', { type: 'manual', message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-4">
          <h2 className="font-headline text-lg text-foreground">Welcome back</h2>
          <p className="text-sm text-muted-foreground">Log in to your Meet A Cause account.</p>
        </div>
        {errors.root?.serverError && (
          <div className="text-sm text-destructive flex items-center gap-2 bg-destructive/10 p-3 rounded-lg">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            {errors.root.serverError.message}
          </div>
        )}
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input placeholder="priya@example.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} {...field} className="pr-10" />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" tabIndex={-1}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={onSwitchTab} className="text-primary underline">
            Sign up
          </button>
        </p>
      </form>
    </Form>
  );
}

// ── Signup Form ───────────────────────────────────────────
function SignupForm({ onSuccess, onSwitchTab }: { onSuccess: () => void; onSwitchTab: () => void }) {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const { errors } = form.formState;

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setIsLoading(true);
    form.clearErrors();
    try {
      const cleanName = sanitizeName(values.name);
      const cleanEmail = sanitizeEmail(values.email);
      if (!cleanName) { form.setError('name', { message: 'Please enter a valid name.' }); return; }
      await signup(cleanName, cleanEmail, values.password);
      onSuccess();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-4">
          <h2 className="font-headline text-lg text-foreground">Join Meet A Cause</h2>
          <p className="text-sm text-muted-foreground">Create your account and start showing up.</p>
        </div>
        {errors.root?.serverError && (
          <div className="text-sm text-destructive flex items-center gap-2 bg-destructive/10 p-3 rounded-lg">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            {errors.root.serverError.message}
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
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchTab} className="text-primary underline">
            Log in
          </button>
        </p>
      </form>
    </Form>
  );
}

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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'A valid email is required.' }),
});

export default function HomePage() {
  const { login, sendPasswordReset } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);
  const [isForgotPassDialogOpen, setIsForgotPassDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const { errors } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    form.clearErrors();
    try {
      await login(values.email, values.password);
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

  async function onForgotPasswordSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsSendingReset(true);
    try { await sendPasswordReset(values.email); } catch {}
    setIsResetSent(true);
    setIsSendingReset(false);
  }

  const handleForgotPassDialogChange = (open: boolean) => {
    setIsForgotPassDialogOpen(open);
    if (!open) setTimeout(() => { forgotPasswordForm.reset(); setIsResetSent(false); }, 300);
  };

  return (
    <Dialog open={isForgotPassDialogOpen} onOpenChange={handleForgotPassDialogChange}>
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader className="text-center">
            <Logo className="justify-center mb-2" />
            <CardTitle className="text-lg">Volunteer Login</CardTitle>
            <CardDescription>Enter your details to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {errors.root?.serverError && (
                  <div className="text-sm text-destructive text-center font-medium bg-destructive/10 p-3 rounded-md flex items-center gap-2 justify-center">
                    <AlertTriangle className="h-4 w-4" />
                    {errors.root.serverError.message}
                  </div>
                )}
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="priya.sharma@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <DialogTrigger asChild>
                        <Button variant="link" className="ml-auto text-sm underline h-auto p-0">Forgot your password?</Button>
                      </DialogTrigger>
                    </div>
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
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account? <Link href="/signup" className="underline">Sign up</Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            {isResetSent ? 'A reset link has been sent if the account exists.' : "Enter your email to receive a reset link."}
          </DialogDescription>
        </DialogHeader>
        {isResetSent ? (
          <div className="py-8 text-center space-y-4">
            <p className="text-lg font-semibold text-primary">Check your email</p>
            <p className="text-muted-foreground text-sm">Do not forget to check your spam folder.</p>
            <Button onClick={() => handleForgotPassDialogChange(false)}>Close</Button>
          </div>
        ) : (
          <Form {...forgotPasswordForm}>
            <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4 py-4">
              <FormField control={forgotPasswordForm.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input placeholder="name@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={isSendingReset}>
                {isSendingReset ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

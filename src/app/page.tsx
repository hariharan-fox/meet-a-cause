'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Logo } from '@/components/shared/logo';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "A valid email is required." }),
});


export default function HomePage() {
  const { login, sendPasswordReset } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [isSendingReset, setIsSendingReset] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);
  const [isForgotPassDialogOpen, setIsForgotPassDialogOpen] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const { errors } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    form.clearErrors();

    try {
      await login(values.email, values.password);
      // The client-layout component will handle redirection to /dashboard
    } catch (err: any) {
      let message = 'An unknown error occurred.';
      if (err.code) {
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            message = 'Invalid email or password.';
            break;
          default:
            message = 'Failed to log in. Please try again.';
            break;
        }
      }
       form.setError("root.serverError", {
        type: "manual",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast({
      title: 'Feature Coming Soon!',
      description: 'Google sign-in is not yet available but will be in a future update.',
    });
  };

  async function onForgotPasswordSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsSendingReset(true);
    forgotPasswordForm.clearErrors();
    try {
      await sendPasswordReset(values.email);
      setIsResetSent(true);
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      // For security, don't reveal if an email doesn't exist.
      // Always show the success message.
      setIsResetSent(true);
    } finally {
      setIsSendingReset(false);
    }
  }

  const handleForgotPassDialogChange = (open: boolean) => {
    setIsForgotPassDialogOpen(open);
    if (!open) {
        // Reset form when closing
        setTimeout(() => {
          forgotPasswordForm.reset();
          setIsResetSent(false);
        }, 300); // delay to allow for closing animation
    }
  }


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
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="priya.sharma@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <DialogTrigger asChild>
                            <Button variant="link" className="ml-auto inline-block text-sm underline h-auto p-0">
                              Forgot your password?
                            </Button>
                          </DialogTrigger>
                        </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <Button variant="outline" className="w-full" type="button" onClick={handleGoogleLogin}>
                  Login with Google
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
                {isResetSent 
                    ? "A password reset link has been sent if an account with this email exists."
                    : "Enter your email address and we'll send you a link to reset your password."
                }
            </DialogDescription>
          </DialogHeader>
          {isResetSent ? (
              <div className="py-8 text-center space-y-4">
                  <p className="text-lg font-semibold text-primary">Please check your email</p>
                  <p className="text-muted-foreground text-sm">
                    You'll receive a link to create a new password. Don't forget to check your spam folder.
                  </p>
                  <Button onClick={() => handleForgotPassDialogChange(false)} className="mt-4">
                    Close
                  </Button>
              </div>
          ) : (
              <Form {...forgotPasswordForm}>
                  <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4 py-4">
                      {forgotPasswordForm.formState.errors.root && (
                          <div className="text-sm text-destructive flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            {forgotPasswordForm.formState.errors.root.message}
                          </div>
                      )}
                      <FormField
                          control={forgotPasswordForm.control}
                          name="email"
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                              <Input placeholder="name@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
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

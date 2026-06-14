'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth-context';
import { LogOut, ArrowRight, Copy, ShieldCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { Event } from '@/lib/types';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useAuth as useFirebaseAuth } from '@/firebase/provider';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, linkWithCredential, type ConfirmationResult } from 'firebase/auth';

declare global {
  interface Window { recaptchaVerifier?: RecaptchaVerifier; }
}

export default function SettingsPage() {
  const { user, logout, changePassword, deleteAccount, updateUser } = useAuth();
  const firebaseAuth = useFirebaseAuth();
  const { toast } = useToast();
  const db = useFirestore();

  const [name, setName] = useState(user?.name || '');
  const [skills, setSkills] = useState(user?.skills?.join(', ') || '');
  const [interests, setInterests] = useState(user?.interests?.join(', ') || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');

  // Real event history from Firestore
  const [completedEvents, setCompletedEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setSkills(user.skills?.join(', ') || '');
    setInterests(user.interests?.join(', ') || '');

    // Fetch completed events from Firestore
    async function fetchCompletedEvents() {
      if (!user?.completedEventIds?.length) return;
      try {
        const snap = await getDocs(collection(db, 'events'));
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Event[];
        setCompletedEvents(all.filter(e => user.completedEventIds.includes(e.id)));
      } catch (err) {
        console.error('Failed to fetch completed events:', err);
      }
    }
    fetchCompletedEvents();
  }, [user, db]);

  const referralLink = `https://meetacause.vercel.app/signup?ref=${user?.id || ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast({ title: 'Referral Link Copied!', description: 'Share it with your friends.' });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      await updateUser({
        name,
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        interests: interests.split(',').map(i => i.trim()).filter(Boolean),
      });
      toast({ title: 'Profile Updated', description: 'Your profile has been saved.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone) { setPhoneError('Please enter a phone number.'); return; }
    if (window.recaptchaVerifier) window.recaptchaVerifier.clear();
    setPhoneError(null);
    setIsSendingOtp(true);
    try {
      const verifier = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', { size: 'invisible' });
      window.recaptchaVerifier = verifier;
      const result = await signInWithPhoneNumber(firebaseAuth, `+91${phone}`, verifier);
      setConfirmationResult(result);
      toast({ title: 'OTP Sent!', description: `OTP sent to +91${phone}.` });
    } catch (error: any) {
      setPhoneError('Failed to send OTP. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) { setPhoneError('Please enter the OTP.'); return; }
    setPhoneError(null);
    setIsVerifyingOtp(true);
    try {
      const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, otp);
      if (user?.auth) {
        await linkWithCredential(user.auth, credential);
        const updatedUser = firebaseAuth.currentUser;
        if (updatedUser?.phoneNumber) await updateUser({ phoneNumber: updatedUser.phoneNumber });
        toast({ title: 'Phone Verified!', description: 'Your phone number has been linked.' });
        setConfirmationResult(null);
        setOtp('');
        setPhone('');
      }
    } catch (error: any) {
      setPhoneError(error.code === 'auth/invalid-verification-code' ? 'Invalid OTP.' : 'Verification failed.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    if (newPassword !== confirmPassword) { setPasswordError('Passwords do not match.'); return; }
    if (newPassword.length < 6) { setPasswordError('Password must be at least 6 characters.'); return; }
    setIsChangingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess('Password changed successfully.');
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(
        err.code === 'auth/requires-recent-login' ? 'Please log out and log back in first.' :
        err.code === 'auth/wrong-password' ? 'Current password is incorrect.' : err.message
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount(deleteReason);
      toast({ title: 'Account Deleted', description: 'Your account has been permanently deleted.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Deletion Failed', description: error.message });
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 animate-slide-in-from-bottom">
      <div id="recaptcha-container" className="fixed bottom-0 right-0" />
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-lg font-bold">My Profile & Settings</h1>

        {/* Profile */}
        <Card>
          <form onSubmit={handleProfileUpdate}>
            <CardHeader>
              <CardTitle className="text-base">Public Profile</CardTitle>
              <CardDescription>Update your name, skills, and interests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">{user.name?.charAt(0).toUpperCase() || 'V'}</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user.email || ''} disabled />
                <p className="text-xs text-muted-foreground">Your email is not displayed publicly.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Your Skills</Label>
                <Textarea id="skills" placeholder="e.g. Web Development, Graphic Design" value={skills} onChange={e => setSkills(e.target.value)} />
                <p className="text-xs text-muted-foreground">Separate with commas.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Your Interests</Label>
                <Textarea id="interests" placeholder="e.g. Environment, Education" value={interests} onChange={e => setInterests(e.target.value)} />
                <p className="text-xs text-muted-foreground">Separate with commas.</p>
              </div>
              <Button type="submit" disabled={isUpdatingProfile}>
                {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
              </Button>
            </CardContent>
          </form>
        </Card>

        {/* Phone Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Phone Verification</CardTitle>
            <CardDescription>Verify your phone number to unlock the "Communicator" badge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.phoneNumber ? (
              <div className="flex items-center gap-2 text-green-600 font-medium p-3 bg-green-50 rounded-md border border-green-200">
                <ShieldCheck className="h-5 w-5" />
                <span>Verified: {user.phoneNumber}</span>
              </div>
            ) : (
              <div className="space-y-4">
                {phoneError && <p className="text-sm text-destructive flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> {phoneError}</p>}
                {!confirmationResult ? (
                  <div className="flex items-end gap-2">
                    <div className="grid gap-2 flex-1">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center">
                        <span className="text-sm border border-r-0 rounded-l-md bg-muted h-10 px-3 flex items-center">+91</span>
                        <Input id="phone" type="tel" placeholder="98765 43210" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className="rounded-l-none" />
                      </div>
                    </div>
                    <Button onClick={handleSendOtp} disabled={isSendingOtp}>{isSendingOtp ? 'Sending...' : 'Send OTP'}</Button>
                  </div>
                ) : (
                  <div className="flex items-end gap-2">
                    <div className="grid gap-2 flex-1">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input id="otp" placeholder="123456" value={otp} onChange={e => setOtp(e.target.value)} />
                    </div>
                    <Button onClick={handleVerifyOtp} disabled={isVerifyingOtp}>{isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}</Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referral */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Refer a Friend</CardTitle>
            <CardDescription>Invite friends to join Meet A Cause and earn badges.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="referral-link">Your Unique Referral Link</Label>
              <div className="flex gap-2">
                <Input id="referral-link" value={referralLink} readOnly />
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Share this link with friends to earn referral badges.</p>
          </CardContent>
        </Card>

        {/* Event History */}
        <section>
          <h2 className="text-lg font-bold mb-4">Event History</h2>
          <Card>
            <CardContent className="p-0">
              {completedEvents.length > 0 ? (
                <ul className="divide-y">
                  {completedEvents.map(event => (
                    <li key={event.id} className="p-4 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/events/${event.id}`}>View <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm p-6 text-center">No completed events yet.</p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account</CardTitle>
            <CardDescription>Manage your account security and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button variant="ghost" onClick={logout} className="w-full justify-start px-0 -ml-2">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
            <Separator />
            <form onSubmit={handleChangePassword} className="space-y-4">
              <h3 className="text-base font-medium">Change Password</h3>
              {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
              {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              </div>
              <Button type="submit" variant="outline" disabled={isChangingPassword}>
                {isChangingPassword ? 'Changing...' : 'Update Password'}
              </Button>
            </form>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-base font-medium">Danger Zone</h3>
              <div className="rounded-lg border border-destructive p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h4 className="font-semibold">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone and will permanently delete your account.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="py-4 space-y-2">
                        <Label htmlFor="delete-reason" className="text-sm font-medium">Why are you leaving? (optional)</Label>
                        <Textarea id="delete-reason" placeholder="I'm leaving because..." value={deleteReason} onChange={e => setDeleteReason(e.target.value)} />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          {isDeleting ? 'Deleting...' : 'Delete Account'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

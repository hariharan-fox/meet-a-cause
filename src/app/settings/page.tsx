'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { LogOut, ArrowRight, Gift, Copy, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { allEvents } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth as useFirebaseAuth } from "@/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, linkWithCredential, ConfirmationResult } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export default function SettingsPage() {
  const { user, logout, changePassword, deleteAccount, updateUser } = useAuth();
  const firebaseAuth = useFirebaseAuth();
  const { toast } = useToast();
  
  // State for editable profile fields
  const [name, setName] = useState(user?.name || '');
  const [skills, setSkills] = useState(user?.skills?.join(', ') || '');
  const [interests, setInterests] = useState(user?.interests?.join(', ') || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  
  // State for phone verification
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  
  // State for photo change dialog
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setSkills(user.skills?.join(', ') || '');
    setInterests(user.interests?.join(', ') || '');
  }, [user]);

  const referralLink = `https://meet-a-cause.app/signup?ref=${user?.id || 'volunteer123'}`;
  const availableAvatars = PlaceHolderImages.filter(p => p.id.startsWith('avatar-'));

  const userCompletedEvents = allEvents.filter(event => 
    user?.completedEventIds?.includes(event.id)
  );

  const userAvatar = user?.avatarUrl ? PlaceHolderImages.find(p => p.id === user.avatarUrl) : undefined;

  // State for password change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // State for account deletion
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  const handleSendOtp = async () => {
    if (!phone || !firebaseAuth) {
      setPhoneError('Please enter a phone number.');
      return;
    }
    
    // Ensure we have a clean slate for the verifier
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
    
    // Simple validation for Indian numbers, can be improved
    const phoneNumber = `+91${phone}`;
    setPhoneError(null);
    setIsSendingOtp(true);

    try {
      // Create the verifier on-demand
      const verifier = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {
        'size': 'invisible',
      });
      window.recaptchaVerifier = verifier;

      const result = await signInWithPhoneNumber(firebaseAuth, phoneNumber, verifier);
      setConfirmationResult(result);
      toast({ title: "OTP Sent!", description: `An OTP has been sent to ${phoneNumber}.` });
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      let message = 'Failed to send OTP. Please try again.';
      if (error.code === 'auth/invalid-phone-number') {
        message = 'The phone number is not valid.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'You have sent too many OTP requests. Please try again later.';
      } else if (error.message.includes('reCAPTCHA')) {
        message = 'reCAPTCHA challenge failed. Please refresh and try again.'
      }
      setPhoneError(message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setPhoneError('Please enter the OTP.');
      return;
    }
    if (!confirmationResult) {
      setPhoneError('Please request an OTP first.');
      return;
    }
    setPhoneError(null);
    setIsVerifyingOtp(true);
    try {
      const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, otp);
      if (user?.auth) {
        await linkWithCredential(user.auth, credential);
        
        const updatedUser = firebaseAuth.currentUser;
        if (updatedUser?.phoneNumber) {
            await updateUser({ phoneNumber: updatedUser.phoneNumber });
        }
        
        toast({ title: "Phone Number Verified!", description: "Your phone number has been successfully linked to your account." });
        setConfirmationResult(null);
        setOtp('');
        setPhone('');
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      let message = 'Failed to verify OTP. Please try again.';
      if (error.code === 'auth/invalid-verification-code') {
        message = 'The OTP you entered is invalid.';
      } else if (error.code === 'auth/credential-already-in-use') {
        message = 'This phone number is already linked to another account.';
      }
      setPhoneError(message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };
  // End Phone Verification Logic

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Referral Link Copied!",
      description: "You can now share it with your friends.",
    });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    
    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
    const interestsArray = interests.split(',').map(i => i.trim()).filter(Boolean);

    try {
      await updateUser({
        name,
        skills: skillsArray,
        interests: interestsArray,
      });
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message,
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };
  
  const handleAvatarSelect = async (avatarId: string) => {
    setIsPhotoDialogOpen(false); // Close the dialog immediately
    try {
      await updateUser({ avatarUrl: avatarId });
      toast({
        title: "Avatar Updated",
        description: "Your new profile photo has been saved.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update your avatar. Please try again.",
      });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("The new passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess("Your password has been changed successfully!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      let message = err.message;
      if (err.code === 'auth/requires-recent-login') {
          message = "This is a sensitive operation. Please log out and log back in before changing your password.";
      } else if (err.code === 'auth/wrong-password') {
          message = "The current password you entered is incorrect.";
      }
      setPasswordError(message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount(deleteReason);
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted. We're sad to see you go.",
      });
    } catch (error: any) {
      let message = error.message;
       if (error.code === 'auth/requires-recent-login') {
          message = "This is a sensitive operation. Please log out and log back in before deleting your account.";
      }
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: message,
      });
      setIsDeleting(false);
    }
  };

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 animate-slide-in-from-bottom">
      <div id="recaptcha-container" className="fixed bottom-0 right-0"></div>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-lg font-bold">My Profile & Settings</h1>
        
        <Card>
          <form onSubmit={handleProfileUpdate}>
            <CardHeader>
              <CardTitle className="text-base">Public Profile</CardTitle>
              <CardDescription>
                This is how others will see you on the site. Your skills and interests help us recommend events.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  {userAvatar ? (
                    <AvatarImage src={userAvatar.imageUrl} alt={user.name} />
                  ) : (
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase() || 'V'}</AvatarFallback>
                  )}
                </Avatar>
                <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" type="button">Change Photo</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Choose Your Avatar</DialogTitle>
                      <DialogDescription>
                        Select a new photo for your profile from the options below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-4 gap-4 py-4">
                      {availableAvatars.map((avatar) => (
                        <button
                          key={avatar.id}
                          className="rounded-full ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onClick={() => handleAvatarSelect(avatar.id)}
                        >
                          <Avatar className="h-20 w-20 hover:opacity-75 transition-opacity">
                            <AvatarImage src={avatar.imageUrl} alt={avatar.description} />
                            <AvatarFallback>{avatar.id.slice(-1)}</AvatarFallback>
                          </Avatar>
                        </button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user.email || ''} disabled />
                <p className="text-xs text-muted-foreground">Your email address is not displayed publicly.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Your Skills</Label>
                <Textarea id="skills" placeholder="e.g. Web Development, Graphic Design, Public Speaking" value={skills} onChange={(e) => setSkills(e.target.value)} />
                <p className="text-xs text-muted-foreground">Separate skills with a comma. This helps us recommend relevant volunteer opportunities.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Your Interests</Label>
                 <Textarea id="interests" placeholder="e.g. Environment, Education, Animal Welfare" value={interests} onChange={(e) => setInterests(e.target.value)} />
                <p className="text-xs text-muted-foreground">Separate interests with a comma.</p>
              </div>
              <Button type="submit" disabled={isUpdatingProfile}>
                {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
              </Button>
            </CardContent>
          </form>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-base">Phone Number Verification</CardTitle>
                <CardDescription>Verify your phone number to unlock the "Communicator" badge and enhance account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {user.phoneNumber ? (
                    <div className="flex items-center gap-2 text-green-600 font-medium p-3 bg-green-50 rounded-md border border-green-200">
                        <ShieldCheck className="h-5 w-5" />
                        <span>Verified: {user.phoneNumber}</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {phoneError && <p className="text-sm text-destructive flex items-center gap-2"><AlertTriangle className="h-4 w-4"/> {phoneError}</p>}
                        {!confirmationResult ? (
                            <div className="flex items-end gap-2">
                                <div className="grid gap-2 flex-1">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="flex items-center">
                                        <span className="text-sm border border-r-0 rounded-l-md bg-muted h-10 px-3 flex items-center">+91</span>
                                        <Input id="phone" type="tel" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0,10))} className="rounded-l-none" />
                                    </div>
                                </div>
                                <Button onClick={handleSendOtp} disabled={isSendingOtp}>
                                    {isSendingOtp ? 'Sending...' : 'Send OTP'}
                                </Button>
                            </div>
                        ) : (
                             <div className="flex items-end gap-2">
                                <div className="grid gap-2 flex-1">
                                    <Label htmlFor="otp">Enter OTP</Label>
                                    <Input id="otp" type="text" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                </div>
                                <Button onClick={handleVerifyOtp} disabled={isVerifyingOtp}>
                                    {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              Refer a Friend
            </CardTitle>
            <CardDescription>
              Share your love for volunteering! Invite friends to join Meet A Cause and earn badges.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="referral-link">Your Unique Referral Link</Label>
              <div className="flex gap-2">
                <Input id="referral-link" value={referralLink} readOnly />
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy Link</span>
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
                For each friend that signs up and completes an event, you'll make progress towards new referral badges.
            </p>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-lg font-bold mb-4">Event History</h2>
          <Card>
            <CardContent className="p-0">
              {userCompletedEvents.length > 0 ? (
                <ul className="divide-y">
                  {userCompletedEvents.map((event) => (
                    <li key={event.id} className="p-4 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/events/${event.id}`}>
                            View Event <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm p-6 text-center">You haven't completed any events yet.</p>
              )}
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account</CardTitle>
            <CardDescription>
              Manage your account settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Button variant="ghost" onClick={logout} className="w-full justify-start px-0 -ml-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
              </Button>
            </div>
            <Separator />
             <form onSubmit={handleChangePassword} className="space-y-4">
                <h3 className="text-base font-medium">Change Password</h3>
                {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
                {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
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
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all of your content.</p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="py-4 space-y-2">
                            <Label htmlFor="delete-reason" className="text-sm font-medium">Please let us know why you are leaving (optional)</Label>
                            <Textarea 
                                id="delete-reason" 
                                placeholder="I'm leaving because..."
                                value={deleteReason}
                                onChange={(e) => setDeleteReason(e.target.value)}
                            />
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
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

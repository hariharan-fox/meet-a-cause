'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { LogOut, ArrowRight, Gift, Copy } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { allEvents } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function SettingsPage() {
  const { user, logout, changePassword } = useAuth();
  const { toast } = useToast();
  
  const referralLink = `https://meet-a-cause.app/signup?ref=${user?.id || 'volunteer123'}`;

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


  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Referral Link Copied!",
      description: "You can now share it with your friends.",
    });
  };

  const showComingSoonToast = (feature: string) => {
    toast({
      title: 'Feature Coming Soon!',
      description: `${feature} is not yet available but will be in a future update.`,
    });
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
      setPasswordError(err.message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 animate-slide-in-from-bottom">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-lg font-bold">My Profile & Settings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Public Profile</CardTitle>
            <CardDescription>
              This is how others will see you on the site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                {userAvatar ? (
                  <AvatarImage src={userAvatar.imageUrl} alt={user?.name || 'User'} />
                ) : (
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'V'}</AvatarFallback>
                )}
              </Avatar>
              <Button variant="outline" onClick={() => showComingSoonToast('Changing your photo')}>Change Photo</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user?.name || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
              <p className="text-xs text-muted-foreground">Your email address is not displayed publicly.</p>
            </div>
            <Button onClick={() => showComingSoonToast('Updating your profile')}>Update Profile</Button>
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
                        <Button variant="destructive" onClick={() => showComingSoonToast('Deleting your account')}>Delete Account</Button>
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { LogOut, ArrowRight, Gift, Copy, Phone } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";


export default function SettingsPage() {
  const { user, logout, changePassword, deleteAccount, updateUser } = useAuth();
  const { toast } = useToast();
  
  // State for editable profile fields
  const [name, setName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [skills, setSkills] = useState(user?.skills?.join(', ') || '');
  const [interests, setInterests] = useState(user?.interests?.join(', ') || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  
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

  // State for account deletion
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");


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

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    
    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
    const interestsArray = interests.split(',').map(i => i.trim()).filter(Boolean);

    try {
      updateUser({
        name,
        phoneNumber,
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

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount(deleteReason);
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: error.message,
      });
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 animate-slide-in-from-bottom">
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
                    <AvatarImage src={userAvatar.imageUrl} alt={user?.name || 'User'} />
                  ) : (
                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'V'}</AvatarFallback>
                  )}
                </Avatar>
                <Button variant="outline" type="button" onClick={() => showComingSoonToast('Changing your photo')}>Change Photo</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="e.g. 9876543210" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email || ''} disabled />
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

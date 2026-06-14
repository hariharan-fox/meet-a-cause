'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserPlus, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EventSignUpButton({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle: string;
}) {
  const { user, registerForEvent, completeEvent } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [hoursInput, setHoursInput] = useState('4');

  const isRegistered = user?.registeredEventIds?.includes(eventId);
  const isCompleted = user?.completedEventIds?.includes(eventId);

  const handleRegister = async () => {
    if (!user) {
      router.push('/');
      return;
    }
    setIsLoading(true);
    try {
      await registerForEvent(eventId, eventTitle);
      toast({
        title: 'Registration Confirmed!',
        description: `You are now registered for "${eventTitle}".`,
      });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: err.message || 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    const hours = parseFloat(hoursInput);
    if (isNaN(hours) || hours <= 0) {
      toast({ variant: 'destructive', title: 'Invalid hours', description: 'Please enter a valid number of hours.' });
      return;
    }
    setIsLoading(true);
    try {
      await completeEvent(eventId, eventTitle, hours);
      toast({
        title: 'Event Completed!',
        description: `You logged ${hours} hours for "${eventTitle}".`,
      });
      setIsCompleteDialogOpen(false);
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message || 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCompleted) {
    return (
      <Button size="lg" className="w-full text-base" disabled>
        <CheckCircle className="mr-2 h-4 w-4" />
        Event Completed
      </Button>
    );
  }

  if (isRegistered) {
    return (
      <>
        <Button
          size="lg"
          className="w-full text-base"
          variant="outline"
          onClick={() => setIsCompleteDialogOpen(true)}
        >
          <Clock className="mr-2 h-4 w-4" />
          Mark as Completed
        </Button>

        <Dialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Mark Event as Completed</DialogTitle>
              <DialogDescription>
                How many hours did you volunteer at "{eventTitle}"?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="hours">Hours Volunteered</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={hoursInput}
                  onChange={e => setHoursInput(e.target.value)}
                  placeholder="e.g. 4"
                />
                <p className="text-xs text-muted-foreground">
                  This will be added to your total logged hours and may unlock badges.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCompleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleMarkComplete} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Confirm Completion'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Button size="lg" className="w-full text-base" onClick={handleRegister} disabled={isLoading}>
      <UserPlus className="mr-2 h-4 w-4" />
      {isLoading ? 'Registering...' : 'Sign Up for this Event'}
    </Button>
  );
}

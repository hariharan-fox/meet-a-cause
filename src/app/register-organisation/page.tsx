'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { useToast } from '@/hooks/use-toast';

const CAUSES = ['Education', 'Environment', 'Health', 'Community', 'Animals', 'Technology', 'Arts', 'Sports', 'Elder Care', 'Women Empowerment', 'Disability', 'Livelihoods', 'Other'];

export default function RegisterOrganisationPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    orgName: '',
    orgEmail: '',
    contactName: '',
    contactPhone: '',
    cause: '',
    location: '',
    mission: '',
    vision: '',
    impact: '',
    panNumber: '',
    website: '',
    eventName: '',
    eventDetails: '',
    eventDate: '',
  });

  const set = (field: string, value: string) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'ngo_applications'), {
        ...form,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      toast({ title: 'Submission Failed', description: err.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="font-headline text-2xl text-foreground mb-3">Application Received</h1>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              Thank you for applying to list your organisation on Meet A Cause. We will review your application and get back to you at <span className="font-medium text-foreground">{form.orgEmail}</span> within 48 hours.
            </p>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild>
              <Link href="/events">Browse Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">

        {/* Back */}
        <Link href="/for-ngos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to For Organisations
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-3">
            Organisation Registration
          </p>
          <h1 className="font-headline text-3xl md:text-4xl text-foreground leading-snug mb-4">
            Get your organisation listed on Meet A Cause
          </h1>
          <p className="font-body text-muted-foreground text-sm leading-relaxed">
            Fill in the details below. We review every application and respond within 48 hours. Listing is completely free.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Section 1 — Organisation Details */}
          <div className="space-y-5">
            <div className="border-b border-border pb-3">
              <h2 className="font-headline text-lg text-foreground">Organisation Details</h2>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgName">Organisation Name *</Label>
              <Input
                id="orgName"
                placeholder="e.g. Green Earth Foundation"
                required
                value={form.orgName}
                onChange={e => set('orgName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgEmail">Organisation Email *</Label>
              <Input
                id="orgEmail"
                type="email"
                placeholder="contact@yourorg.in"
                required
                value={form.orgEmail}
                onChange={e => set('orgEmail', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cause">Primary Cause *</Label>
                <Select required value={form.cause} onValueChange={v => set('cause', v)}>
                  <SelectTrigger id="cause">
                    <SelectValue placeholder="Select a cause" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAUSES.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g. Chennai, Tamil Nadu"
                  required
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourorganisation.in"
                value={form.website}
                onChange={e => set('website', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="panNumber">PAN Number *</Label>
              <Input
                id="panNumber"
                placeholder="ABCDE1234F"
                required
                value={form.panNumber}
                onChange={e => set('panNumber', e.target.value.toUpperCase())}
                maxLength={10}
              />
              <p className="text-xs text-muted-foreground">Required for verification purposes only. Not displayed publicly.</p>
            </div>
          </div>

          {/* Section 2 — Contact Person */}
          <div className="space-y-5">
            <div className="border-b border-border pb-3">
              <h2 className="font-headline text-lg text-foreground">Contact Person</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Full Name *</Label>
                <Input
                  id="contactName"
                  placeholder="e.g. Priya Subramaniam"
                  required
                  value={form.contactName}
                  onChange={e => set('contactName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number *</Label>
                <div className="flex items-center">
                  <span className="text-sm border border-r-0 rounded-l-md bg-muted h-10 px-3 flex items-center text-muted-foreground">+91</span>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="98765 43210"
                    required
                    className="rounded-l-none"
                    value={form.contactPhone}
                    onChange={e => set('contactPhone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 — Mission & Impact */}
          <div className="space-y-5">
            <div className="border-b border-border pb-3">
              <h2 className="font-headline text-lg text-foreground">Mission & Impact</h2>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mission">Mission *</Label>
              <Textarea
                id="mission"
                placeholder="What is your organisation's primary mission? What problem are you solving?"
                required
                className="min-h-[100px]"
                value={form.mission}
                onChange={e => set('mission', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vision">Vision *</Label>
              <Textarea
                id="vision"
                placeholder="Where do you see your organisation and the communities you serve in 5 years?"
                required
                className="min-h-[100px]"
                value={form.vision}
                onChange={e => set('vision', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="impact">Impact So Far *</Label>
              <Textarea
                id="impact"
                placeholder="Share numbers, stories, or milestones. How many people have you reached? What has changed?"
                required
                className="min-h-[100px]"
                value={form.impact}
                onChange={e => set('impact', e.target.value)}
              />
            </div>
          </div>

          {/* Section 4 — First Event */}
          <div className="space-y-5">
            <div className="border-b border-border pb-3">
              <h2 className="font-headline text-lg text-foreground">Your First Event</h2>
              <p className="text-xs text-muted-foreground mt-1">Tell us about the event you want to list first. You can add more later.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name *</Label>
              <Input
                id="eventName"
                placeholder="e.g. Marina Beach Cleanup Drive"
                required
                value={form.eventName}
                onChange={e => set('eventName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDetails">Event Details *</Label>
              <Textarea
                id="eventDetails"
                placeholder="Describe the event — what will volunteers do, what to bring, how many people you need, etc."
                required
                className="min-h-[120px]"
                value={form.eventDetails}
                onChange={e => set('eventDetails', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate">Planned Event Date *</Label>
              <Input
                id="eventDate"
                type="date"
                required
                value={form.eventDate}
                onChange={e => set('eventDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 space-y-4">
            <Button
              type="submit"
              className="w-full rounded-full py-6 text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By submitting you agree to our{' '}
              <Link href="/terms" className="text-primary hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              We will respond within 48 hours at the email provided.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

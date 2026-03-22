'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, HandHeart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { testimonials } from '@/lib/placeholder-data';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-volunteers');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-12 md:pt-24 lg:pt-32 pb-12 md:pb-24 lg:pb-32 text-center">
          <div className="container px-4 md:px-6 space-y-8 z-10 relative">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your Compassion Has a Calling.
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                Somewhere in your city, a story is waiting for its hero. A classroom needs a teacher, a stray needs a friend, a community needs a leader. That hero is you. Start your story today.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/signup">Join as a Volunteer</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/events">Explore Opportunities</Link>
              </Button>
            </div>
          </div>
          {heroImage && (
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroImage.imageUrl}
                    alt="A group of diverse volunteers working together happily outdoors."
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.imageHint}
                />
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
            </div>
          )}
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">A Story in Three Acts</div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">Your Journey of Impact</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Every great story has a beginning, a middle, and an impact that lasts a lifetime. Here’s how yours unfolds with Meet A Cause.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-12 lg:max-w-none lg:gap-16 pt-12">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Act I: Find Your Chapter</h3>
                <p className="text-sm text-muted-foreground">
                  Your story begins with a single step. Browse opportunities that resonate with your heart—from nurturing the environment to educating young minds. Your calling is waiting to be discovered.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <HandHeart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Act II: Live the Story</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with organizations and join fellow heroes on the ground. Sign up for an event, lend your skills, and become part of a narrative of change. This is where your compassion becomes action.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Act III: Share the Legend</h3>
                <p className="text-sm text-muted-foreground">
                  Your impact creates ripples. Track your hours, earn badges that celebrate your journey, and see the tangible difference you've made. Your story doesn't end; it inspires others to begin theirs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tighter md:text-4xl">Chapters from Our Community</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from the heroes who are already writing their stories of change.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm sm:max-w-4xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-8">
              {testimonials.map((testimonial, index) => {
                const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarId);
                return (
                  <Card key={index} className="text-left p-4">
                    <CardContent className="p-2">
                      <p className="text-sm text-foreground/90 mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="flex items-center gap-3">
                        {avatar && (
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div>
                          <p className="font-semibold text-sm">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tighter md:text-4xl">Ready to Write Your Story?</h2>
              <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The next chapter is yours to write. Join a community of change-makers and turn your compassion into action.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" variant="secondary" className="w-full">
                <Link href="/signup">
                  Become a Volunteer Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


'use client';

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CheckCircle, Clock, Award, Users, ArrowRight } from "lucide-react";

import { volunteer, featuredEvents, featuredNgos, upcomingCommitments, allEvents } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Event } from "@/lib/types";
import EventCard from "@/components/shared/event-card";
import NgoCard from "@/components/shared/ngo-card";
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const volunteerAvatar = PlaceHolderImages.find(p => p.id === 'avatar-priya-sharma');
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  
  const carouselEvents = allEvents.slice(0, 4);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 space-y-12">
      <div className="flex items-center gap-4">
        {volunteerAvatar && (
            <Avatar className="h-12 w-12 md:h-16 md:w-16">
              <AvatarImage src={volunteerAvatar.imageUrl} alt={volunteer.name} data-ai-hint={volunteerAvatar.imageHint} />
              <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
            </Avatar>
        )}
        <div>
          <h1 className="text-lg md:text-xl font-bold">Welcome back, {volunteer.name}!</h1>
        </div>
      </div>
      
      <section className="animate-slide-in-from-bottom" style={{ animationDelay: '100ms' }}>
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {carouselEvents.map((event) => {
              const eventImage = PlaceHolderImages.find(p => p.id === event.imageUrl);
              return (
                <CarouselItem key={event.id} className="lg:basis-1/2">
                  <Link href={`/events/${event.id}`}>
                    <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden group">
                      {eventImage && (
                        <Image
                          src={eventImage.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          data-ai-hint={eventImage.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 md:p-8 flex flex-col justify-end">
                        <h2 className="text-xl md:text-2xl font-bold text-white shadow-lg">{event.title}</h2>
                        <p className="text-sm text-white/90 mt-2 shadow-md max-w-lg hidden md:block">{event.description.substring(0, 100)}...</p>
                         <Button variant="secondary" size="sm" className="mt-4 w-fit">
                            View Event
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in-from-bottom" style={{ animationDelay: '200ms' }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">42</div>
            <p className="text-xs text-muted-foreground">in the last 3 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Events Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card className="hover:bg-accent transition-colors">
          <Link href="/dashboard/my-impact">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">3</div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">View all badges</p>
            </CardContent>
          </Link>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Causes Supported</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">3</div>
            <p className="text-xs text-muted-foreground">Education, Environment</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-in-from-bottom" style={{ animationDelay: '300ms' }}>
        
        <div className="lg:col-span-2 space-y-8">
          
          <section>
            <h2 className="text-xl font-bold mb-4">Featured Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Featured NGOs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {featuredNgos.map((ngo) => (
                <NgoCard key={ngo.id} ngo={ngo} />
              ))}
            </div>
          </section>

        </div>

        <div className="lg:col-span-1 space-y-8">
          
          <section>
            <h2 className="text-xl font-bold mb-4">Upcoming Commitments</h2>
            <Card>
              <CardContent className="p-6">
                 {upcomingCommitments.length > 0 ? (
                    <ul className="space-y-4">
                      {upcomingCommitments.map((event: Event) => {
                         const eventImage = PlaceHolderImages.find(p => p.id === event.imageUrl);
                         return (
                          <li key={event.id} className="flex items-center gap-4">
                            {eventImage && (
                              <Avatar className="h-12 w-12 rounded-md">
                                <AvatarImage src={eventImage.imageUrl} alt={event.title} className="rounded-md" data-ai-hint={eventImage.imageHint} />
                                <AvatarFallback className="rounded-md">{event.title.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <Link href={`/events/${event.id}`} className="font-semibold hover:underline text-sm">{event.title}</Link>
                              <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                            </div>
                          </li>
                         )
                      })}
                    </ul>
                 ) : (
                    <p className="text-muted-foreground text-sm">No upcoming commitments.</p>
                 )}
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </div>
  );
}

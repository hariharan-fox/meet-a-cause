
'use client';

import { useRef, useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CheckCircle, Clock, Award, Users, ArrowRight } from 'lucide-react';
import { allEvents } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import EventCard from '@/components/shared/event-card';
import NgoCard from '@/components/shared/ngo-card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { featuredEvents, featuredNgos } from '@/lib/placeholder-data';

export default function DashboardPage() {
  const { user } = useAuth();
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const carouselEvents = allEvents.slice(0, 4);
  const userAvatar = user?.avatarUrl ? PlaceHolderImages.find(p => p.id === user.avatarUrl) : undefined;

  const stats = useMemo(() => {
    if (!user) {
      return { hours: 0, completed: 0, badges: 0, causes: 0 };
    }
    const completed = user.completedEventIds?.length || 0;
    const badges = user.earnedBadgeIds?.length || 0;
    const hours = user.loggedHours || 0;
    const supportedCauses = new Set(
      allEvents
        .filter((event) => user.completedEventIds?.includes(event.id))
        .map((event) => event.cause)
    );
    const causes = supportedCauses.size;
    return { hours, completed, badges, causes };
  }, [user]);
  
  const upcomingCommitments = useMemo(() => {
    if (!user?.registeredEventIds) return [];
    return allEvents.filter(event => user.registeredEventIds.includes(event.id))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [user?.registeredEventIds]);


  return (
    <div className="container mx-auto px-4 md:px-6 py-8 space-y-12">
      <div className="flex items-center gap-4">
        {user && (
          <Avatar className="h-12 w-12 md:h-16 md:w-16">
            {userAvatar ? (
              <AvatarImage src={userAvatar.imageUrl} alt={user?.name || 'User'} />
            ) : (
              <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'V'}</AvatarFallback>
            )}
          </Avatar>
        )}
        <div>
          <h1 className="text-lg md:text-xl font-bold">
            {user ? `Welcome back, ${user.name?.split(' ')[0]}!` : 'Welcome to Meet A Cause!'}
          </h1>
           {!user && <p className="text-sm text-muted-foreground">Log in or sign up to see your impact.</p>}
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
                        <h2 className="text-base md:text-lg font-bold text-white shadow-lg">{event.title}</h2>
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
            <div className="text-lg font-bold">{stats.hours}</div>
            <p className="text-xs text-muted-foreground">{stats.hours > 0 ? 'Making an impact!' : 'Your journey begins!'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Events Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">{stats.completed > 0 ? 'Thank you!' : "Let's get started."}</p>
          </CardContent>
        </Card>
        <Card className="hover:bg-accent transition-colors">
           <Link href="/my-impact">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">{stats.badges}</div>
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
            <div className="text-lg font-bold">{stats.causes}</div>
            <p className="text-xs text-muted-foreground">{stats.causes > 0 ? 'Thank you for your support!' : 'Discover your cause.'}</p>
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
              <CardContent className="p-0">
                 {upcomingCommitments.length > 0 ? (
                    <ul className="divide-y">
                      {upcomingCommitments.map((event) => (
                        <li key={event.id} className="p-4 flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="font-semibold text-sm">{event.title}</p>
                              <p className="text-xs text-muted-foreground">{event.date}</p>
                            </div>
                            <Button variant="ghost" size="sm" asChild className="text-xs">
                              <Link href={`/events/${event.id}`}>
                                View <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                        </li>
                      ))}
                    </ul>
                 ) : (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground text-sm">No upcoming commitments yet.</p>
                    <Button variant="link" asChild className="mt-2 text-sm">
                      <Link href="/events">Explore Events</Link>
                    </Button>
                  </div>
                 )}
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </div>
  );
}

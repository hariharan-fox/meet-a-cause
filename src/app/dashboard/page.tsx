'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CheckCircle, Clock, Award, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { collection, getDocs, query, where, limit, doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { Event, NGO } from '@/lib/types';
import EventCard from '@/components/shared/event-card';
import NgoCard from '@/components/shared/ngo-card';

export default function DashboardPage() {
  const { user } = useAuth();
  const db = useFirestore();
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [carouselEvents, setCarouselEvents] = useState<Event[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [featuredNgos, setFeaturedNgos] = useState<NGO[]>([]);
  const [upcomingCommitments, setUpcomingCommitments] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch events for carousel (latest 4)
        const eventsSnap = await getDocs(collection(db, 'events'));
        const allEvents = eventsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Event[];

        setCarouselEvents(allEvents.slice(0, 4));
        setFeaturedEvents(allEvents.slice(0, 4));

        // Fetch NGOs
        const ngosSnap = await getDocs(collection(db, 'ngo_profiles'));
        const allNgos = ngosSnap.docs.map(d => ({ id: d.id, ...d.data() })) as NGO[];
        setFeaturedNgos(allNgos.slice(0, 4));

        // Fetch upcoming commitments for this user
        if (user?.registeredEventIds?.length) {
          const committed = allEvents.filter(e =>
            user.registeredEventIds.includes(e.id)
          ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          setUpcomingCommitments(committed);
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [db, user?.registeredEventIds]);

  const stats = useMemo(() => {
    if (!user) return { hours: 0, completed: 0, badges: 0, causes: 0 };
    return {
      hours: user.loggedHours || 0,
      completed: user.completedEventIds?.length || 0,
      badges: user.earnedBadgeIds?.length || 0,
      causes: 0,
    };
  }, [user]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 space-y-12">

      {/* Welcome */}
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 md:h-16 md:w-16">
          <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'V'}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg md:text-xl font-bold">
            {user ? `Welcome back, ${user.name?.split(' ')[0]}!` : 'Welcome to Meet A Cause!'}
          </h1>
          {!user && <p className="text-sm text-muted-foreground">Log in or sign up to see your impact.</p>}
        </div>
      </div>

      {/* Carousel */}
      {!isLoading && carouselEvents.length > 0 && (
        <section className="animate-slide-in-from-bottom">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{ align: 'start', loop: true }}
          >
            <CarouselContent>
              {carouselEvents.map((event) => (
                <CarouselItem key={event.id} className="lg:basis-1/2">
                  <Link href={`/events/${event.id}`}>
                    <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden group bg-muted">
                      {event.imageUrl && (
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 md:p-8 flex flex-col justify-end">
                        <h2 className="text-base md:text-lg font-bold text-white">{event.title}</h2>
                        <p className="text-sm text-white/90 mt-2 max-w-lg hidden md:block">
                          {event.description?.substring(0, 100)}...
                        </p>
                        <Button variant="secondary" size="sm" className="mt-4 w-fit">
                          View Event <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      )}

      {isLoading && (
        <div className="aspect-[16/7] w-full rounded-2xl bg-muted animate-pulse" />
      )}

      {!isLoading && carouselEvents.length === 0 && (
        <div className="aspect-[16/7] w-full rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground text-sm">
          No events yet. Check back soon.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in-from-bottom">
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
            <p className="text-xs text-muted-foreground">Discover your cause.</p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Content + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-in-from-bottom">
        <div className="lg:col-span-2 space-y-8">

          <section>
            <h2 className="text-xl font-bold mb-4">Featured Events</h2>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2].map(i => <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />)}
              </div>
            ) : featuredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {featuredEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            ) : (
              <div className="text-center text-muted-foreground bg-accent/50 p-8 rounded-xl text-sm">
                No events yet. Check back soon.
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Featured NGOs</h2>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2].map(i => <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />)}
              </div>
            ) : featuredNgos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {featuredNgos.map(ngo => <NgoCard key={ngo.id} ngo={ngo} />)}
              </div>
            ) : (
              <div className="text-center text-muted-foreground bg-accent/50 p-8 rounded-xl text-sm">
                No NGOs yet. Check back soon.
              </div>
            )}
          </section>

        </div>

        {/* Upcoming Commitments */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">Upcoming Commitments</h2>
          <Card>
            <CardContent className="p-0">
              {upcomingCommitments.length > 0 ? (
                <ul className="divide-y">
                  {upcomingCommitments.map(event => (
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
        </div>
      </div>
    </div>
  );
}

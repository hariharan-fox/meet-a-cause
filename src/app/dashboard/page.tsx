'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CheckCircle, Clock, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { Event, NGO } from '@/lib/types';
import EventCard from '@/components/shared/event-card';
import NgoCard from '@/components/shared/ngo-card';

type Banner = {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const db = useFirestore();
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [banners, setBanners] = useState<Banner[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [featuredNgos, setFeaturedNgos] = useState<NGO[]>([]);
  const [upcomingCommitments, setUpcomingCommitments] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch banners from Firestore (max 4)
        const bannersSnap = await getDocs(collection(db, 'banners'));
        const allBanners = bannersSnap.docs
          .map(d => ({ id: d.id, ...d.data() } as Banner))
          .filter(b => b.imageUrl)
          .slice(0, 4);
        setBanners(allBanners);

        // Fetch events
        const eventsSnap = await getDocs(collection(db, 'events'));
        const events = eventsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Event[];
        setAllEvents(events);
        setFeaturedEvents(events.slice(0, 4));

        // Fetch NGOs
        const ngosSnap = await getDocs(collection(db, 'ngo_profiles'));
        const ngos = ngosSnap.docs.map(d => ({ id: d.id, ...d.data() })) as NGO[];
        setFeaturedNgos(ngos.slice(0, 4));

        // Upcoming commitments
        if (user?.registeredEventIds?.length) {
          const committed = events
            .filter(e => user.registeredEventIds.includes(e.id))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
    if (!user) return { hours: 0, completed: 0, causes: 0 };
    const completedEventCauses = new Set(
      allEvents
        .filter(e => user.completedEventIds?.includes(e.id))
        .map(e => e.cause)
    );
    return {
      hours: user.loggedHours || 0,
      completed: user.completedEventIds?.length || 0,
      causes: completedEventCauses.size,
    };
  }, [user, allEvents]);

  // Carousel shows banners if available, falls back to events
  const carouselItems = banners.length > 0 ? banners : featuredEvents.slice(0, 4).map(e => ({
    id: e.id,
    title: e.title,
    subtitle: e.description?.substring(0, 100),
    imageUrl: e.imageUrl || '',
    linkUrl: `/events/${e.id}`,
  }));

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

      {/* Banner / Event Carousel */}
      {isLoading ? (
        <div className="aspect-[16/7] w-full rounded-2xl bg-muted animate-pulse" />
      ) : carouselItems.length > 0 ? (
        <section className="animate-slide-in-from-bottom">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{ align: 'start', loop: carouselItems.length > 1 }}
          >
            <CarouselContent>
              {carouselItems.map((item) => (
                <CarouselItem key={item.id} className={carouselItems.length > 1 ? 'lg:basis-1/2' : ''}>
                  {item.linkUrl ? (
                    <Link href={item.linkUrl}>
                      <CarouselCard item={item} />
                    </Link>
                  ) : (
                    <CarouselCard item={item} />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {banners.length > 0 && (
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              {banners.length} banner{banners.length > 1 ? 's' : ''} — managed from admin panel
            </p>
          )}
        </section>
      ) : (
        <div className="aspect-[16/7] w-full rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground text-sm">
          No events yet. Check back soon.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in-from-bottom">
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

// Reusable carousel card component
function CarouselCard({ item }: { item: { title: string; subtitle?: string; imageUrl: string; linkUrl?: string } }) {
  return (
    <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden group bg-muted">
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 md:p-8 flex flex-col justify-end">
        <h2 className="text-base md:text-lg font-bold text-white">{item.title}</h2>
        {item.subtitle && (
          <p className="text-sm text-white/90 mt-2 max-w-lg hidden md:block">
            {item.subtitle}...
          </p>
        )}
        {item.linkUrl && (
          <Button variant="secondary" size="sm" className="mt-4 w-fit">
            {item.linkUrl.startsWith('/events') ? 'View Event' : 'Learn More'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

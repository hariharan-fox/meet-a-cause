'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { Event, NGO } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, MapPin, Target, Building, Heart, TrendingUp, ArrowLeft } from 'lucide-react';
import EventSignUpButton from '@/components/shared/event-signup-button';

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const db = useFirestore();

  const [event, setEvent] = useState<Event | null>(null);
  const [ngo, setNgo] = useState<NGO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch event by Firestore document ID
        const eventDoc = await getDoc(doc(db, 'events', id));
        if (!eventDoc.exists()) {
          setNotFoundError(true);
          return;
        }
        const eventData = { id: eventDoc.id, ...eventDoc.data() } as Event;
        setEvent(eventData);

        // Fetch the organizing NGO
        if (eventData.ngoId) {
          const ngoDoc = await getDoc(doc(db, 'ngo_profiles', eventData.ngoId));
          if (ngoDoc.exists()) {
            setNgo({ id: ngoDoc.id, ...ngoDoc.data() } as NGO);
          }
        }
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setNotFoundError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id, db]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="space-y-6 animate-pulse">
          <div className="h-6 w-32 bg-muted rounded" />
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="aspect-video bg-muted rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (notFoundError || !event) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <h1 className="text-xl font-bold">Event Not Found</h1>
        <p className="text-muted-foreground mt-2 text-sm">This event could not be found.</p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/events">Back to all events</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to all events
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-6">

          {/* Header */}
          <div>
            <Badge>{event.cause}</Badge>
            <h1 className="text-xl md:text-2xl font-bold mt-2">{event.title}</h1>
          </div>

          {/* Banner Image */}
          {event.imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-muted">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h2 className="text-base font-semibold mb-2">About this Event</h2>
            <p className="text-sm text-foreground/90">{event.description}</p>
          </div>

          {/* Why Important */}
          {event.why && (
            <div>
              <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" /> Why It's Important
              </h2>
              <p className="text-sm text-foreground/90">{event.why}</p>
            </div>
          )}

          {/* Impact */}
          {event.impact && (
            <div>
              <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" /> Your Impact
              </h2>
              <p className="text-sm text-foreground/90">{event.impact}</p>
            </div>
          )}

          {/* Skills */}
          {event.skills && event.skills.length > 0 && (
            <div>
              <h3 className="text-base font-semibold flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-primary" /> Skills Needed
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.skills.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6 space-y-4">
                <EventSignUpButton eventId={event.id} eventTitle={event.title} />
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{event.date}</p>
                      <p className="text-muted-foreground text-xs">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                    <p className="font-semibold">{event.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {ngo && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Organized by</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{ngo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link href={`/ngos/${ngo.id}`} className="font-bold hover:underline">
                      {ngo.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Building className="h-3 w-3" />
                      <span>NGO</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

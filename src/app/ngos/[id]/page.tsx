'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { NGO, Event } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Target, Users, Mail, Phone, Globe, ArrowLeft } from 'lucide-react';
import EventCard from '@/components/shared/event-card';

export default function NgoDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const db = useFirestore();

  const [ngo, setNgo] = useState<NGO | null>(null);
  const [ngoEvents, setNgoEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch NGO by Firestore document ID
        const ngoDoc = await getDoc(doc(db, 'ngo_profiles', id));
        if (!ngoDoc.exists()) {
          setNotFoundError(true);
          return;
        }
        const ngoData = { id: ngoDoc.id, ...ngoDoc.data() } as NGO;
        setNgo(ngoData);

        // Fetch events belonging to this NGO
        const eventsSnap = await getDocs(
          query(collection(db, 'events'), where('ngoId', '==', id))
        );
        const eventsData = eventsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Event[];
        setNgoEvents(eventsData);
      } catch (err) {
        console.error('Failed to fetch NGO:', err);
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
          <div className="flex gap-6">
            <div className="h-24 w-24 bg-muted rounded-lg" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-48 bg-muted rounded" />
              <div className="h-6 w-64 bg-muted rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="h-24 bg-muted rounded" />
            <div className="h-24 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (notFoundError || !ngo) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <h1 className="text-xl font-bold">NGO Not Found</h1>
        <p className="text-muted-foreground mt-2 text-sm">This organization could not be found.</p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/ngos">Back to all NGOs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <Link href="/ngos" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to all NGOs
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">

          {/* NGO Header */}
          <div className="flex items-start gap-6">
            {ngo.logoUrl && (
              <div className="relative h-24 w-24 rounded-lg border shadow-sm overflow-hidden bg-muted flex items-center justify-center">
                <Image
                  src={ngo.logoUrl}
                  alt={ngo.name}
                  fill
                  className="object-cover rounded-lg"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {ngo.cause?.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
              </div>
              <h1 className="text-xl font-bold mt-2">{ngo.name}</h1>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{ngo.location}</span>
              </div>
            </div>
          </div>

          {/* Mission & Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> Our Mission
              </h2>
              <p className="text-sm text-foreground/90">{ngo.mission}</p>
            </div>
            {ngo.impact && (
              <div>
                <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> Our Impact
                </h2>
                <p className="text-sm text-foreground/90">{ngo.impact}</p>
              </div>
            )}
          </div>

          {/* Events */}
          <div>
            <h2 className="text-lg font-bold mb-4">Upcoming Events</h2>
            {ngoEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ngoEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground bg-accent p-8 rounded-lg">
                <p className="text-sm">No upcoming events scheduled. Check back soon!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact & Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-3">
                  {ngo.email && (
                    <a href={`mailto:${ngo.email}`} className="flex items-center gap-3 group">
                      <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
                      <span className="text-muted-foreground group-hover:text-primary break-all">{ngo.email}</span>
                    </a>
                  )}
                  {ngo.phone && (
                    <a href={`tel:${ngo.phone}`} className="flex items-center gap-3 group">
                      <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
                      <span className="text-muted-foreground group-hover:text-primary">{ngo.phone}</span>
                    </a>
                  )}
                  {ngo.address && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                      <span className="text-muted-foreground">{ngo.address}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  {ngo.email && (
                    <Button asChild size="sm">
                      <a href={`mailto:${ngo.email}`}><Mail className="mr-2 h-4 w-4" />Email Us</a>
                    </Button>
                  )}
                  {ngo.phone && (
                    <Button asChild size="sm" variant="secondary">
                      <a href={`tel:${ngo.phone}`}><Phone className="mr-2 h-4 w-4" />Call Us</a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}

import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { allEvents, allNgos } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Target, Building, Heart, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventSignUpButton from "@/components/shared/event-signup-button";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const event = allEvents.find((e) => e.id === params.id);
  const eventImage = event ? PlaceHolderImages.find((p) => p.id === event.imageUrl) : undefined;

  if (!event) {
    return {
      title: "Event Not Found | Meet A Cause",
      description: "The event you are looking for could not be found.",
    };
  }

  return {
    title: `${event.title} | Meet A Cause`,
    description: event.description.substring(0, 160),
    openGraph: {
        title: `${event.title} | Meet A Cause`,
        description: event.description.substring(0, 160),
        images: eventImage ? [
            {
                url: eventImage.imageUrl,
                width: 1200,
                height: 630,
                alt: event.title,
            },
        ] : [],
    },
  };
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = allEvents.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const ngo = allNgos.find((n) => n.id === event.ngoId);
  const eventImage = PlaceHolderImages.find((p) => p.id === event.imageUrl);
  const ngoLogo = ngo ? PlaceHolderImages.find((p) => p.id === ngo.logoUrl) : undefined;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to all events
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Event Header */}
          <div>
            <Badge>{event.cause}</Badge>
            <h1 className="text-xl md:text-2xl font-bold mt-2">{event.title}</h1>
          </div>

          {/* Event Image */}
          {eventImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src={eventImage.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                data-ai-hint={eventImage.imageHint}
              />
            </div>
          )}

          {/* About Section */}
          <div className="prose max-w-none text-foreground/90">
            <h2 className="text-base font-semibold mb-2">About this Event</h2>
            <p className="text-sm">{event.description}</p>
          </div>

          {/* Why it's important */}
          {event.why && (
            <div className="prose max-w-none text-foreground/90">
              <h2 className="text-base font-semibold mb-2 flex items-center gap-2"><Heart className="h-4 w-4 text-primary" /> Why It&apos;s Important</h2>
              <p className="text-sm">{event.why}</p>
            </div>
          )}

          {/* Your Impact */}
          {event.impact && (
            <div className="prose max-w-none text-foreground/90">
              <h2 className="text-base font-semibold mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Your Impact</h2>
              <p className="text-sm">{event.impact}</p>
            </div>
          )}

          {/* Skills Section */}
          <div>
            <h3 className="text-base font-semibold flex items-center gap-2 mb-3"><Target className="h-4 w-4 text-primary" /> Skills Needed</h3>
            <div className="flex flex-wrap gap-2">
              {event.skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="sticky top-24 space-y-6">

            {/* Action Card */}
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
                    <div>
                      <p className="font-semibold">{event.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Card */}
            {ngo && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Organized by</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  {ngoLogo && (
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={ngoLogo.imageUrl} alt={ngo.name} data-ai-hint={ngoLogo.imageHint} />
                      <AvatarFallback>{ngo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1">
                    <Link href={`/ngos/${ngo.id}`} className="font-bold hover:underline">{ngo.name}</Link>
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

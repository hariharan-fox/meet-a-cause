import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { allNgos } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const eventImage = PlaceHolderImages.find((p) => p.id === event.imageUrl);
  const ngo = allNgos.find(n => n.id === event.ngoId);
  const ngoLogo = ngo ? PlaceHolderImages.find(p => p.id === ngo.logoUrl) : undefined;
  
  return (
    <Card className="flex flex-col h-full group">
      <CardHeader className="p-0 relative overflow-hidden rounded-t-2xl">
        <Link href={`/events/${event.id}`}>
          <div className="aspect-video w-full relative">
            {eventImage ? (
              <Image
                src={eventImage.imageUrl}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={eventImage.imageHint}
              />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <Badge variant="secondary" className="mb-2 text-xs">{event.cause}</Badge>
        <CardTitle className="text-sm mb-2">
          <Link href={`/events/${event.id}`} className="hover:text-primary transition-colors">
            {event.title}
          </Link>
        </CardTitle>
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
         {ngo && (
            <Link href={`/ngos/${ngo.id}`} className="flex items-center gap-2 group">
               {ngoLogo && (
                  <Avatar className="h-6 w-6">
                     <AvatarImage src={ngoLogo.imageUrl} alt={ngo.name} data-ai-hint={ngoLogo.imageHint} />
                     <AvatarFallback>{ngo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
               )}
               <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">{ngo.name}</span>
            </Link>
         )}
         <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary text-xs">
            <Link href={`/events/${event.id}`}>
                View <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

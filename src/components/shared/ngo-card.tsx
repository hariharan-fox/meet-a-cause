import Link from 'next/link';
import type { NGO } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';

type NgoCardProps = {
  ngo: NGO;
};

export default function NgoCard({ ngo }: NgoCardProps) {
  const ngoLogo = PlaceHolderImages.find((p) => p.id === ngo.logoUrl);

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <CardHeader className="flex-row items-center gap-4 p-4">
        {ngoLogo && (
          <Avatar className="h-12 w-12">
            <AvatarImage src={ngoLogo.imageUrl} alt={ngo.name} data-ai-hint={ngoLogo.imageHint}/>
            <AvatarFallback>{ngo.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex-1">
          <CardTitle className="text-sm">
            <Link href={`/ngos/${ngo.id}`} className="hover:text-primary transition-colors">
              {ngo.name}
            </Link>
          </CardTitle>
          <CardDescription className="text-xs">{ngo.location}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <p className="text-xs text-muted-foreground mb-4 line-clamp-3">{ngo.mission}</p>
        <div className="flex flex-wrap gap-2">
            {ngo.cause.map(c => <Badge key={c} variant="outline">{c}</Badge>)}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button asChild variant="ghost" size="sm" className="text-xs text-primary hover:text-primary">
            <Link href={`/ngos/${ngo.id}`}>
                Learn More <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

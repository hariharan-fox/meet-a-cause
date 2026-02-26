'use client';

import { useState } from 'react';
import { allCertificates } from '@/lib/placeholder-data';
import type { Certificate } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Share2, Linkedin, Twitter } from 'lucide-react';

const levelStyles: { [key: string]: { border: string; bg: string; icon: string } } = {
  Bronze: {
    border: 'border-amber-600/80',
    bg: 'bg-gradient-to-b from-amber-300 to-amber-500',
    icon: 'text-amber-900',
  },
  Silver: {
    border: 'border-slate-400/80',
    bg: 'bg-gradient-to-b from-slate-200 to-slate-400',
    icon: 'text-slate-900',
  },
  Gold: {
    border: 'border-yellow-500/80',
    bg: 'bg-gradient-to-b from-yellow-300 to-yellow-500',
    icon: 'text-yellow-900',
  },
  Platinum: {
    border: 'border-cyan-500/80',
    bg: 'bg-gradient-to-b from-cyan-300 to-teal-500',
    icon: 'text-cyan-900',
  },
};

export default function BadgesPage() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Certificate | null>(null);
  const { toast } = useToast();

  const earnedBadges = allCertificates.filter((c) => c.isEarned);
  const unearnedBadges = allCertificates.filter((c) => !c.isEarned);
  
  const handleBadgeClick = (badge: Certificate) => {
    if (badge.isEarned) {
      setSelectedBadge(badge);
      setShareDialogOpen(true);
    }
  };

  const copyToClipboard = () => {
    if (!selectedBadge) return;
    const shareText = `I just earned the "${selectedBadge.name} (${selectedBadge.level})" badge on Just Hands for my volunteer work! #JustHands #Volunteering #MakingADifference`;
    navigator.clipboard.writeText(shareText);
    toast({
      title: 'Link Copied!',
      description: 'You can now share your achievement.',
    });
    setShareDialogOpen(false);
  };

  const BadgeIcon = ({ badge }: { badge: Certificate }) => {
    const level = badge.level || 'Bronze';
    const styles = badge.isEarned ? levelStyles[level] : null;

    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger
            onClick={() => handleBadgeClick(badge)}
            className={cn(
              'transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full',
              badge.isEarned ? 'cursor-pointer' : 'cursor-default'
            )}
          >
            <div
              className={cn(
                'relative flex items-center justify-center h-24 w-24 rounded-full border-[6px] shadow-lg overflow-hidden',
                badge.isEarned && styles
                  ? [styles.border, styles.bg]
                  : 'border-muted bg-muted/40',
                !badge.isEarned && 'grayscale opacity-60'
              )}
            >
              {badge.isEarned && (
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute -top-4 -left-8 w-24 h-12 bg-white/20 rounded-full rotate-45 blur-md" />
                </div>
              )}
              <badge.icon
                className={cn(
                  'h-12 w-12 drop-shadow-lg',
                  badge.isEarned && styles
                    ? styles.icon
                    : 'text-muted-foreground'
                )}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-background border-border text-center">
            <p className="font-bold text-base">{badge.name} {badge.level && `(${badge.level})`}</p>
            <p className="text-sm text-muted-foreground max-w-xs">{badge.description}</p>
            {!badge.isEarned && <p className="text-xs text-primary mt-1 font-semibold">Keep going to unlock!</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-8 space-y-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">My Badges</h1>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-2">
            Recognizing your dedication and impact. Each badge represents a milestone in your volunteering journey. Keep up the great work!
          </p>
        </div>

        <section>
          <h2 className="text-lg font-bold mb-6 text-center sm:text-left">
            Earned Badges ({earnedBadges.length})
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-8 justify-center sm:justify-start">
            {earnedBadges.map((badge) => (
              <BadgeIcon key={badge.id} badge={badge} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-6 text-center sm:text-left">
            Badges to Unlock ({unearnedBadges.length})
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-8 justify-center sm:justify-start">
            {unearnedBadges.map((badge) => (
              <BadgeIcon key={badge.id} badge={badge} />
            ))}
          </div>
        </section>
      </div>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Achievement!</DialogTitle>
            <DialogDescription>
              You've earned the "{selectedBadge?.name}" badge. Share your success with your network.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-2">
            <Button variant="outline">
              <Twitter className="mr-2 h-4 w-4" />
              Share on X
            </Button>
            <Button variant="outline">
              <Linkedin className="mr-2 h-4 w-4" />
              Share on LinkedIn
            </Button>
            <Button onClick={copyToClipboard}>
              <Share2 className="mr-2 h-4 w-4" />
              Copy Share Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

'use client';

import { useState } from 'react';
import { allCertificates } from '@/lib/placeholder-data';
import type { Certificate } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Share2, Linkedin, Twitter, CheckCircle2 } from 'lucide-react';

const Badge = ({ badge, size = 'medium' }: { badge: Certificate; size?: 'medium' | 'large' }) => {
  const SHAPE_PATHS = {
    circle: "M 50, 50 m -48, 0 a 48,48 0 1,0 96,0 a 48,48 0 1,0 -96,0",
    pentagon: "M 50,2 L 98,35 L 80,98 L 20,98 L 2,35 Z",
    hexagon: "M 50,2 L 98,27 V 73 L 50,98 L 2,73 V 27 Z",
  };

  const LEVEL_COLORS = {
    Bronze: {
      bg: ["#fde68a", "#f59e0b"],
      border: ["#fffbeb", "#fef3c7"],
      text: "text-amber-900",
    },
    Silver: {
      bg: ["#e5e7eb", "#9ca3af"],
      border: ["#f9fafb", "#e5e7eb"],
      text: "text-gray-800",
    },
    Gold: {
      bg: ["#facc15", "#d97706"],
      border: ["#fefce8", "#fde047"],
      text: "text-yellow-950",
    },
    Platinum: {
      bg: ["#7dd3fc", "#0ea5e9"],
      border: ["#f0f9ff", "#bae6fd"],
      text: "text-sky-950",
    },
  };

  const UnearnedColor = {
    bg: ["#f3f4f6", "#e5e7eb"],
    border: ["#f9fafb", "#f3f4f6"],
    text: "text-gray-400",
  };

  const colors = badge.isEarned ? LEVEL_COLORS[badge.level || 'Bronze'] : UnearnedColor;
  const shape = badge.shape || 'circle';
  const isLarge = size === 'large';
  
  const bgGradientId = `bg-gradient-${badge.id.replace(/[^a-zA-Z0-9-]/g, '')}`;
  const borderGradientId = `border-gradient-${badge.id.replace(/[^a-zA-Z0-9-]/g, '')}`;

  return (
    <div className={cn("relative group", isLarge ? "w-40 h-40" : "w-24 h-24", badge.isEarned && 'cursor-pointer' )}>
        <svg viewBox="0 0 100 100" className={cn("absolute inset-0 w-full h-full drop-shadow-md", !badge.isEarned && "saturate-0 opacity-70")}>
            <defs>
                <linearGradient id={borderGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: colors.border[0] }} />
                    <stop offset="100%" style={{ stopColor: colors.border[1] }} />
                </linearGradient>
                 <linearGradient id={bgGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: colors.bg[0] }} />
                    <stop offset="100%" style={{ stopColor: colors.bg[1] }} />
                </linearGradient>
            </defs>
            
            <path d={SHAPE_PATHS[shape]} fill={`url(#${borderGradientId})`} />
            <path d={SHAPE_PATHS[shape]} fill={`url(#${bgGradientId})`} transform="translate(8, 8) scale(0.84)" />
        </svg>
        
        <div className={cn("relative z-10 flex flex-col items-center justify-center w-full h-full p-2", colors.text)}>
            <badge.icon className={cn(isLarge ? "w-16 h-16" : "w-9 h-9")} />
            <span className={cn("font-bold drop-shadow-sm", isLarge ? "text-3xl mt-2" : "text-lg mt-1")}>
              {badge.description.match(/\d+/)?.[0] || ''}
            </span>
        </div>
    </div>
  );
};


export default function BadgesPage() {
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Certificate | null>(null);
  const { toast } = useToast();

  const earnedBadges = allCertificates.filter((c) => c.isEarned);
  const unearnedBadges = allCertificates.filter((c) => !c.isEarned);
  
  const handleBadgeClick = (badge: Certificate) => {
    setSelectedBadge(badge);
    setDetailDialogOpen(true);
  };

  const copyToClipboard = () => {
    if (!selectedBadge) return;
    const shareText = `I just earned the "${selectedBadge.name} (${selectedBadge.level})" badge on Just Hands for my volunteer work! #JustHands #Volunteering #MakingADifference`;
    navigator.clipboard.writeText(shareText);
    toast({
      title: 'Link Copied!',
      description: 'You can now share your achievement.',
    });
    setDetailDialogOpen(false);
  };
  
  const LEVEL_BG_COLORS = {
    Bronze: "from-amber-100 to-amber-200",
    Silver: "from-slate-100 to-slate-200",
    Gold: "from-yellow-100 to-yellow-200",
    Platinum: "from-sky-100 to-sky-200",
  };
  const UnearnedBgColor = "from-gray-100 to-gray-200";
  const bgGradient = selectedBadge?.isEarned ? LEVEL_BG_COLORS[selectedBadge.level || 'Bronze'] : UnearnedBgColor;

  const BadgeDisplay = ({ badge }: { badge: Certificate }) => {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger
            onClick={() => handleBadgeClick(badge)}
            className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg transition-transform hover:scale-110"
          >
            <div className="flex flex-col items-center w-28 text-center">
              <Badge badge={badge} />
              <p className="text-xs font-semibold mt-2 h-8">{badge.name}</p>
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
          <h1 className="text-2xl font-bold flex items-center justify-center gap-3">
             My Badges 
             <span className="flex items-center justify-center text-lg bg-primary text-primary-foreground h-8 w-8 rounded-full">{earnedBadges.length}</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-2">
            Recognizing your dedication and impact. Each badge represents a milestone in your volunteering journey.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-bold mb-6 text-center sm:text-left">
            Earned Badges ({earnedBadges.length})
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-2 gap-y-8 justify-items-center">
            {earnedBadges.map((badge) => (
              <BadgeDisplay key={badge.id} badge={badge} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-6 text-center sm:text-left">
            Badges to Unlock ({unearnedBadges.length})
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-2 gap-y-8 justify-items-center">
            {unearnedBadges.map((badge) => (
              <BadgeDisplay key={badge.id} badge={badge} />
            ))}
          </div>
        </section>
      </div>

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-sm p-0 border-none bg-transparent shadow-none">
          {selectedBadge && (
            <div className="bg-card rounded-xl shadow-lg overflow-hidden">
              <div className={cn("relative p-8 pt-12 flex flex-col items-center bg-gradient-to-b", bgGradient)}>
                <Badge badge={selectedBadge} size="large" />
              </div>
              <div className="p-6 text-center space-y-3">
                <h2 className="text-xl font-bold">{selectedBadge.name} {selectedBadge.level && `(${selectedBadge.level})`}</h2>
                <p className="text-muted-foreground text-sm">{selectedBadge.description}</p>
                
                {selectedBadge.isEarned ? (
                  <div className="flex items-center justify-center gap-2 text-primary font-semibold text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Badge Unlocked</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground font-semibold text-sm">
                    <span>Badge Locked</span>
                  </div>
                )}

                {selectedBadge.isEarned && (
                  <div className="pt-4 flex flex-col space-y-2">
                     <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Share Your Achievement</p>
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
                )}
                 <div className="pt-4">
                  <p className="text-xs text-muted-foreground">Powered by Just Hands</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

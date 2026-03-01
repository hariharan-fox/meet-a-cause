'use client';

import React, { useState, useMemo } from 'react';
import { allCertificates } from '@/lib/placeholder-data';
import type { Certificate } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Share2, Linkedin, Twitter, CheckCircle2 } from 'lucide-react';
import { BadgeVisual } from '@/components/shared/badge-visual';

const BadgeDisplay = ({ badge, onClick }: { badge: Certificate; onClick: (badge: Certificate) => void; }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger
          onClick={() => onClick(badge)}
          className={cn("focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg transition-transform hover:scale-110", badge.isEarned ? "cursor-pointer" : "cursor-default")}
        >
          <div className="flex flex-col items-center w-full text-center">
            <BadgeVisual badge={badge} />
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


export default function BadgesPage() {
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Certificate | null>(null);
  const { toast } = useToast();

  const CATEGORY_ORDER = [
    'Getting Started',
    'Event Participation',
    'Hours Logged',
    'Cause Champion',
    'Skill & Dedication',
    'Community & Leadership',
    'Referral Achievements',
    'Grandmaster Badges'
  ];

  const badgeCategories = useMemo(() => {
    const categories: { [key: string]: Certificate[] } = {};
    CATEGORY_ORDER.forEach(cat => categories[cat] = []);
    allCertificates.forEach(badge => {
      if (categories[badge.category]) {
        categories[badge.category].push(badge);
      }
    });
    return categories;
  }, []);
  
  const totalEarned = allCertificates.filter(c => c.isEarned).length;

  const handleBadgeClick = (badge: Certificate) => {
    if (badge.isEarned) {
        setSelectedBadge(badge);
        setDetailDialogOpen(true);
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
    setDetailDialogOpen(false);
  };
  
  const LEVEL_BG_COLORS = {
    Bronze: "from-amber-600/20 via-amber-800/10 to-card",
    Silver: "from-slate-400/20 via-slate-500/10 to-card",
    Gold: "from-yellow-400/20 via-yellow-500/10 to-card",
    Platinum: "from-sky-400/20 via-sky-500/10 to-card",
  };
  const bgGradient = selectedBadge?.isEarned ? LEVEL_BG_COLORS[selectedBadge.level || 'Bronze'] : "from-gray-100 to-gray-200";

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-8 space-y-12 animate-slide-in-from-bottom">
        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-3">
             My Badge Roadmap
             <span className="flex items-center justify-center text-lg bg-primary text-primary-foreground h-8 w-8 rounded-full">{totalEarned}</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-2">
            Recognizing your dedication and impact. Each badge represents a milestone in your volunteering journey.
          </p>
        </div>

        {Object.entries(badgeCategories).map(([category, badges]) => {
          if (badges.length === 0) return null;
          const earned = badges.filter(b => b.isEarned).length;
          const total = badges.length;
          const progress = total > 0 ? (earned / total) * 100 : 0;
          
          return (
            <section key={category}>
              <h2 className="text-base font-bold mb-2">{category}</h2>
              <div className="flex items-center gap-4 mb-6">
                <Progress value={progress} className="w-full h-2" />
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{earned} / {total} Unlocked</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-2 gap-y-8 justify-items-center">
                {badges.map((badge) => (
                  <BadgeDisplay key={badge.id} badge={badge} onClick={handleBadgeClick} />
                ))}
              </div>
            </section>
          )
        })}

      </div>

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-sm p-0 border-none bg-transparent shadow-none">
          {selectedBadge && (
            <div className="bg-card rounded-xl shadow-lg overflow-hidden">
              <div className={cn("relative p-8 pt-12 flex flex-col items-center bg-gradient-to-b", bgGradient)}>
                <BadgeVisual badge={selectedBadge} size="large" />
              </div>
              <div className="p-6 text-center space-y-3">
                <DialogHeader className="p-0 space-y-2 text-center">
                    <DialogTitle className="text-xl font-bold">{selectedBadge.name} {selectedBadge.level && `(${selectedBadge.level})`}</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm">{selectedBadge.description}</DialogDescription>
                </DialogHeader>
                
                {selectedBadge.isEarned && (
                  <div className="flex items-center justify-center gap-2 text-primary font-semibold text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Badge Unlocked</span>
                  </div>
                )}

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

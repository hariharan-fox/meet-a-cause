'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { BadgeVisual } from '@/components/shared/badge-visual';
import type { Certificate } from '@/lib/types';
import { X, Share2, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function BadgeUnlockAnimation({ badge, onClose }: { badge: Certificate; onClose: () => void }) {
  const { toast } = useToast();

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const shareText = `I just earned the "${badge.name}" badge on Meet A Cause for my volunteer work! #MeetACause #Volunteering #Achievement`;
    const url = 'https://meet-a-cause.app';
    
    if (platform === 'copy') {
        navigator.clipboard.writeText(`${shareText} ${url}`);
        toast({
            title: 'Link Copied!',
            description: 'You can now share your achievement.',
        });
    } else {
        const intentUrl = platform === 'twitter'
            ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`
            : `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(`New Achievement on Meet A Cause!`)}&summary=${encodeURIComponent(shareText)}`;
        window.open(intentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const LEVEL_BG_COLORS = {
    Bronze: "from-amber-600/20 via-transparent to-transparent",
    Silver: "from-slate-400/20 via-transparent to-transparent",
    Gold: "from-yellow-400/20 via-transparent to-transparent",
    Platinum: "from-sky-400/20 via-transparent to-transparent",
  };
  const bgGradient = LEVEL_BG_COLORS[badge.level || 'Bronze'];

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-0">
      <div className="relative w-full max-w-sm m-4 bg-card rounded-2xl border shadow-2xl overflow-hidden text-center animate-in zoom-in-95">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-muted-foreground z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>

        <div className={cn("relative p-8 pt-12 flex flex-col items-center bg-gradient-to-b", bgGradient)}>
           <BadgeVisual badge={{ ...badge, isEarned: true }} size="large" />
        </div>

        <div className="p-6 pt-4 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">New Achievement Unlocked!</p>
          <h3 className="text-xl font-bold">{badge.name} {badge.level && `(${badge.level})`}</h3>
          <p className="text-muted-foreground text-sm">{badge.description}</p>
        </div>
        
        <div className="px-6 pb-6 space-y-4">
           <div className="border-t pt-4 flex flex-col space-y-2">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Share Your Achievement</p>
              <Button variant="outline" onClick={() => handleShare('twitter')}>
                  <Twitter className="mr-2 h-4 w-4" />
                  Share on X
              </Button>
              <Button variant="outline" onClick={() => handleShare('linkedin')}>
                  <Linkedin className="mr-2 h-4 w-4" />
                  Share on LinkedIn
              </Button>
              <Button onClick={() => handleShare('copy')}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Copy Share Link
              </Button>
            </div>
        </div>

        <div className="p-4 bg-secondary/30 border-t">
          <Button variant="ghost" onClick={onClose} className="w-full">
              Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

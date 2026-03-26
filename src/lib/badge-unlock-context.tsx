'use client';

import React, { createContext, useContext, useState } from 'react';
import type { Certificate } from '@/lib/types';
import BadgeUnlockAnimation from '@/components/shared/badge-unlock-animation';

interface BadgeUnlockContextType {
  unlockBadge: (badge: Certificate) => void;
}

const BadgeUnlockContext = createContext<BadgeUnlockContextType | undefined>(undefined);

export function BadgeUnlockProvider({ children }: { children: React.ReactNode }) {
  const [unlockedBadge, setUnlockedBadge] = useState<Certificate | null>(null);

  const unlockBadge = (badge: Certificate) => {
    setUnlockedBadge(badge);
  };

  const handleClose = () => {
    setUnlockedBadge(null);
  };

  return (
    <BadgeUnlockContext.Provider value={{ unlockBadge }}>
      {children}
      {unlockedBadge && <BadgeUnlockAnimation badge={unlockedBadge} onClose={handleClose} />}
    </BadgeUnlockContext.Provider>
  );
}

export function useBadgeUnlock() {
  const context = useContext(BadgeUnlockContext);
  if (context === undefined) {
    throw new Error('useBadgeUnlock must be used within a BadgeUnlockProvider');
  }
  return context;
}

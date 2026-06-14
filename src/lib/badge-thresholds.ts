// Badge unlock checker — reads thresholds from Firestore badge_config
// Drop this into auth-context.tsx replacing the checkAndUnlockBadges function

import { collection, getDocs } from 'firebase/firestore';

// Fetches badge config from Firestore and returns a threshold map
export async function fetchBadgeThresholds(firestore: any): Promise<Record<string, number>> {
  try {
    const snap = await getDocs(collection(firestore, 'badge_config'));
    const thresholds: Record<string, number> = {};
    snap.docs.forEach(d => {
      const data = d.data();
      thresholds[d.id] = data.threshold || 1;
    });
    return thresholds;
  } catch {
    // Fall back to hardcoded defaults if Firestore read fails
    return {};
  }
}

// Default thresholds used if badge_config not yet seeded
export const DEFAULT_THRESHOLDS: Record<string, number> = {
  'start-1': 1,
  'event-1': 1,
  'event-2': 5,
  'event-3': 15,
  'event-4': 30,
  'hours-1': 10,
  'hours-2': 25,
  'hours-3': 50,
  'hours-4': 100,
  'cause-env-1': 3,
  'cause-env-2': 7,
  'cause-env-3': 15,
  'cause-comm-1': 3,
  'cause-comm-2': 7,
  'cause-comm-3': 15,
  'cause-animal-1': 3,
  'cause-animal-2': 7,
  'cause-animal-3': 15,
  'cause-edu-1': 3,
  'cause-edu-2': 7,
  'cause-edu-3': 15,
  'diverse-1': 3,
  'diverse-2': 5,
  'diverse-3': 7,
  'special-3': 5,
};

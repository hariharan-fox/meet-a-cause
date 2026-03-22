'use client';

import { type ReactNode } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider, type FirebaseContextValue } from './provider';

let firebase: FirebaseContextValue;

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  if (!firebase) {
    firebase = initializeFirebase();
  }

  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}

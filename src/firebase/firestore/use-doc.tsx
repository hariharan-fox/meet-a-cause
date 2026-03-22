'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  onSnapshot,
  type DocumentData,
  type DocumentReference,
  type FirestoreError,
  type DocumentSnapshot,
} from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

const useMemoFirebase = <T>(factory: () => T, deps: React.DependencyList) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(factory, deps);
};

export const useDoc = <T extends DocumentData>(
  ref: DocumentReference<T> | null
) => {
  const [data, setData] = useState<T | null>(null);
  const [snapshot, setSnapshot] = useState<DocumentSnapshot<T> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const docRef = useMemoFirebase(() => ref, [ref]);

  useEffect(() => {
    if (!docRef) {
      setData(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setData({ id: docSnapshot.id, ...docSnapshot.data() } as T);
        } else {
          setData(null);
        }
        setSnapshot(docSnapshot);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
        errorEmitter.emit(
          'permission-error',
          new FirestorePermissionError({
            path: docRef.path,
            operation: 'get',
          })
        );
      }
    );

    return () => unsubscribe();
  }, [docRef]);

  return { data, snapshot, isLoading, error };
};

'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  onSnapshot,
  type DocumentData,
  type Query,
  type CollectionReference,
  type FirestoreError,
  type QuerySnapshot,
} from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

const useMemoFirebase = <T>(factory: () => T, deps: React.DependencyList) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
};

export const useCollection = <T extends DocumentData>(
  q: Query<T> | CollectionReference<T> | null,
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [snapshot, setSnapshot] = useState<QuerySnapshot<T> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const query = useMemoFirebase(() => q, [q]);

  useEffect(() => {
    if (!query) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsubscribe = onSnapshot(
      query,
      (querySnapshot) => {
        const data: T[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(data);
        setSnapshot(querySnapshot);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
        errorEmitter.emit(
          'permission-error',
          new FirestorePermissionError({
            path: (query as Query).path,
            operation: 'list',
          })
        );
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, snapshot, isLoading, error };
};

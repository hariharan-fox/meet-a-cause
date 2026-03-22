'use client';

import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
} from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export interface FirebaseContextValue {
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
    undefined
);

export interface FirebaseProviderProps {
    children: ReactNode;
    value: FirebaseContextValue;
}

export function FirebaseProvider({ children, value }: FirebaseProviderProps) {
    const memoizedValue = useMemo(() => value, [value]);
    return (
        <FirebaseContext.Provider value={memoizedValue}>
            {children}
            {process.env.NODE_ENV === 'development' && <FirebaseErrorListener />}
        </FirebaseContext.Provider>
    );
}

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};

export const useFirebaseApp = () => useFirebase().app;
export const useFirestore = () => useFirebase().firestore;
export const useAuth = () => useFirebase().auth;


'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { 
    type User as FirebaseAuthUser, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    deleteUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';

import { useUser as useFirebaseAuthState } from '@/firebase/auth/use-user';
import { useAuth as useFirebaseAuth, useFirestore } from '@/firebase/provider';
import type { Notification, Certificate } from './types';
import { useBadgeUnlock } from './badge-unlock-context';
import { allCertificates, allEvents } from './placeholder-data';

// This will be the shape of our user data in Firestore
type UserProfile = {
  id: string; // This will be the UID from Firebase Auth
  name: string;
  email: string;
  role: 'volunteer';
  avatarUrl?: string;
  phoneNumber?: string;
  skills?: string[];
  interests?: string[];
  completedEventIds: string[];
  registeredEventIds: string[];
  earnedBadgeIds: string[];
  loggedHours: number;
  notifications: Notification[];
};

// This is the combined user object we'll use throughout the app
export type AppUser = UserProfile & {
  auth: FirebaseAuthUser;
};

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (updatedData: Partial<UserProfile>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: (reason: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: firebaseUser, isLoading: isAuthLoading } = useFirebaseAuthState();
  const firebaseAuth = useFirebaseAuth();
  const firestore = useFirestore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const router = useRouter();
  const { unlockBadge } = useBadgeUnlock();

  // Listen to profile changes in Firestore
  useEffect(() => {
    if (!firebaseUser) {
      setProfile(null);
      setIsLoadingProfile(false);
      return;
    }

    setIsLoadingProfile(true);
    const profileRef = doc(firestore, 'users', firebaseUser.uid);

    const unsubscribe = onSnapshot(profileRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      } else {
        // If the user is authenticated but has no profile, it's an inconsistent state.
        // We log them out to force a clean login/signup attempt.
        setProfile(null);
        console.warn(`Profile for user ${firebaseUser.uid} not found. Forcing logout.`);
        signOut(firebaseAuth);
      }
      setIsLoadingProfile(false);
    }, (error) => {
      console.error("Firestore snapshot error:", error);
      setIsLoadingProfile(false);
    });

    return () => unsubscribe();
  }, [firebaseUser, firestore, firebaseAuth]);
  
  const checkAndUnlockBadges = useCallback(async (user: AppUser): Promise<{ earnedBadgeIds: string[], notifications: Notification[] } | null> => {
    const newlyEarnedBadges: Certificate[] = [];
    const unearnedBadges = allCertificates.filter(cert => !user.earnedBadgeIds.includes(cert.id));

    for (const badge of unearnedBadges) {
        let isUnlocked = false;
        const completedEvents = allEvents.filter(event => user.completedEventIds.includes(event.id));

        switch (badge.id) {
            case 'start-1': case 'event-1':
                if (user.completedEventIds.length >= 1) isUnlocked = true;
                break;
            case 'start-3':
                if ((user.skills?.length || 0) > 0 && (user.interests?.length || 0) > 0) isUnlocked = true;
                break;
            case 'start-4':
                if (user.phoneNumber) isUnlocked = true;
                break;
            case 'event-2': if (user.completedEventIds.length >= 5) isUnlocked = true; break;
            case 'event-3': if (user.completedEventIds.length >= 15) isUnlocked = true; break;
            case 'hours-1': if (user.loggedHours >= 10) isUnlocked = true; break;
            case 'hours-2': if (user.loggedHours >= 25) isUnlocked = true; break;
            case 'hours-3': if (user.loggedHours >= 50) isUnlocked = true; break;
            case 'cause-env-1': if (completedEvents.filter(e => e.cause === 'Environment').length >= 3) isUnlocked = true; break;
            case 'cause-comm-1': if (completedEvents.filter(e => e.cause === 'Community').length >= 3) isUnlocked = true; break;
            case 'cause-animal-1': if (completedEvents.filter(e => e.cause === 'Animals').length >= 3) isUnlocked = true; break;
            case 'cause-edu-1': if (completedEvents.filter(e => e.cause === 'Education').length >= 3) isUnlocked = true; break;
        }

        if (isUnlocked) {
            newlyEarnedBadges.push(badge);
        }
    }

    if (newlyEarnedBadges.length > 0) {
        unlockBadge(newlyEarnedBadges[0]);
        const newNotifications = newlyEarnedBadges.map(badge => ({
             id: `notif-badge-${badge.id}-${Date.now()}`,
             title: 'New Badge Unlocked!',
             description: `You've earned the "${badge.name}" badge. Congratulations!`,
             createdAt: 'Just now',
             isRead: false,
        }));
        
        return {
            earnedBadgeIds: [...user.earnedBadgeIds, ...newlyEarnedBadges.map(b => b.id)],
            notifications: [...newNotifications, ...user.notifications],
        };
    }
    return null;
  }, [unlockBadge]);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password).then(() => {});
  };

  const signup = async (name: string, email: string, password: string) => {
    // Step 1: Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const authUser = userCredential.user;

    // Step 2: Update the user's display name in their Auth profile
    await updateProfile(authUser, { displayName: name });

    // Step 3: Create the corresponding user profile document in Firestore
    const profileRef = doc(firestore, 'users', authUser.uid);
    const newProfile: UserProfile = {
      id: authUser.uid,
      name: name,
      email: email,
      role: 'volunteer',
      avatarUrl: '',
      skills: [],
      interests: [],
      completedEventIds: [],
      registeredEventIds: [],
      earnedBadgeIds: [],
      loggedHours: 0,
      notifications: [{
          id: `notif-welcome-${Date.now()}`,
          title: 'Welcome to Meet A Cause!',
          description: 'Thank you for joining our community. Explore events and start making an impact!',
          createdAt: 'Just now',
          isRead: false,
      }],
    };
    
    await setDoc(profileRef, newProfile);
  };

  const logout = () => {
    signOut(firebaseAuth);
    router.push('/');
  };

  const updateUser = async (updatedData: Partial<UserProfile>) => {
    if (!firebaseUser || !profile) return;
    
    const profileRef = doc(firestore, 'users', firebaseUser.uid);
    const newProfileState = { ...profile, ...updatedData };
    
    const badgeUpdates = await checkAndUnlockBadges({ ...newProfileState, auth: firebaseUser });

    const finalProfileData = badgeUpdates ? { ...updatedData, ...badgeUpdates } : updatedData;

    await updateDoc(profileRef, finalProfileData);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!firebaseUser || !firebaseUser.email) throw new Error("User not logged in");
    
    const credential = EmailAuthProvider.credential(firebaseUser.email, currentPassword);
    await reauthenticateWithCredential(firebaseUser, credential);
    await updatePassword(firebaseUser, newPassword);
  };

  const deleteAccount = async (reason: string) => {
    if (!firebaseUser) throw new Error("User not logged in");
    console.log(`Account deletion for ${firebaseUser.uid}, reason:`, reason);
    
    // In a real app, you might want to delete the user's Firestore document first.
    const profileRef = doc(firestore, 'users', firebaseUser.uid);
    // await deleteDoc(profileRef); // This would delete their data.
    
    await deleteUser(firebaseUser);
  };

  const user = firebaseUser && profile ? { ...profile, auth: firebaseUser } : null;
  const isLoading = isAuthLoading || isLoadingProfile;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, updateUser, changePassword, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

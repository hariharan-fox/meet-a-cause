'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Notification } from './types';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'volunteer';
  avatarUrl?: string;
  completedEventIds: string[];
  registeredEventIds: string[];
  earnedBadgeIds: string[];
  loggedHours: number;
  notifications: Notification[];
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (updatedData: Partial<Omit<User, 'password'>>) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: (reason: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Mock User Database ---
const getMockUsers = (): (User & { password: string })[] => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem('mockUsersDB');
  return users ? JSON.parse(users) : [];
};

const setMockUsers = (users: (User & { password: string })[]) => {
  localStorage.setItem('mockUsersDB', JSON.stringify(users));
};

const initializeMockDB = () => {
  const users = getMockUsers();
  const priyaExists = users.some(u => u.email === 'priya.sharma@example.com');
  if (!priyaExists) {
    users.push({
      id: '1',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      avatarUrl: 'avatar-priya-sharma',
      role: 'volunteer',
      password: 'password', // Store mock password
      completedEventIds: ['evt-1', 'evt-2', 'evt-4'],
      registeredEventIds: ['evt-5', 'evt-6'],
      earnedBadgeIds: ['start-1', 'start-2', 'start-3', 'event-1', 'hours-1'],
      loggedHours: 13,
      notifications: [
        {
          id: 'notif-1',
          title: 'New Badge Unlocked!',
          description: 'You earned the "Active Volunteer" badge. Keep up the great work!',
          createdAt: '2 hours ago',
          isRead: false,
        },
        {
          id: 'notif-2',
          title: 'Event Reminder',
          description: 'Your commitment for "Weekend Food Donation Sorting" is tomorrow.',
          createdAt: '1 day ago',
          isRead: false,
        },
        {
          id: 'notif-3',
          title: 'New Event Opportunity',
          description: 'Green Earth Foundation just posted a new event: "Urban Gardening Workshop".',
          createdAt: '3 days ago',
          isRead: true,
        },
          {
          id: 'notif-4',
          title: 'Welcome to Meet A Cause!',
          description: 'Thank you for joining our community of volunteers.',
          createdAt: '1 week ago',
          isRead: true,
        },
      ],
    });
    setMockUsers(users);
  }
};
// --------------------------


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initialize the mock DB with Priya if it's the first run
    initializeMockDB();
    
    // Check for a logged-in user session
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const mockUsers = getMockUsers();
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (foundUser && foundUser.password === password) {
          const { password: _, ...userToStore } = foundUser;
          setUser(userToStore);
          localStorage.setItem('mockUser', JSON.stringify(userToStore));
          router.push('/dashboard');
          resolve();
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 500);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    let mockUsers = getMockUsers();
    const userExists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (userExists) {
          reject(new Error('An account with this email already exists.'));
          return;
        }

        const newUser: User & { password: string } = {
          id: Date.now().toString(),
          name,
          email,
          role: 'volunteer',
          password,
          completedEventIds: [],
          registeredEventIds: [],
          earnedBadgeIds: [],
          loggedHours: 0,
          notifications: [
            {
              id: `notif-welcome-${Date.now()}`,
              title: 'Welcome to Meet A Cause!',
              description: 'Thank you for joining our community. Explore events and start making an impact!',
              createdAt: 'Just now',
              isRead: false,
            }
          ],
        };
        
        mockUsers.push(newUser);
        setMockUsers(mockUsers);

        // Automatically log the user in
        const { password: _, ...userToStore } = newUser;
        setUser(userToStore);
        localStorage.setItem('mockUser', JSON.stringify(userToStore));
        
        router.push('/dashboard');
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
    router.push('/login');
  };

  const updateUser = (updatedData: Partial<Omit<User, 'password'>>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('mockUser', JSON.stringify(updatedUser));

      // Also update the user in the mock DB so the data persists across logins
      const mockUsers = getMockUsers();
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        // We need to preserve the password
        const existingUser = mockUsers[userIndex];
        mockUsers[userIndex] = { ...existingUser, ...updatedUser };
        setMockUsers(mockUsers);
      }
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          return reject(new Error('You must be logged in.'));
        }

        const mockUsers = getMockUsers();
        const userIndex = mockUsers.findIndex(u => u.id === user.id);

        if (userIndex === -1) {
          return reject(new Error('Current user not found in database.'));
        }

        if (mockUsers[userIndex].password !== currentPassword) {
          return reject(new Error('The current password you entered is incorrect.'));
        }

        // Update password in our mock DB
        mockUsers[userIndex].password = newPassword;
        setMockUsers(mockUsers);

        resolve();
      }, 500);
    });
  };

  const deleteAccount = async (reason: string) => {
    // In a real app, you would send the reason to your backend.
    console.log('Account deletion reason:', reason);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          return reject(new Error('You must be logged in to delete your account.'));
        }

        let mockUsers = getMockUsers();
        mockUsers = mockUsers.filter(u => u.id !== user.id);
        setMockUsers(mockUsers);

        // Logout the user
        setUser(null);
        localStorage.removeItem('mockUser');
        router.push('/signup'); // Redirect to signup after deletion
        
        resolve();
      }, 500);
    });
  };


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

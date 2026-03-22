'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'volunteer' | 'ngo';
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
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
      role: 'volunteer',
      password: 'password', // Store mock password
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
          role: 'volunteer', // Role is always 'volunteer' now
          password,
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

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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

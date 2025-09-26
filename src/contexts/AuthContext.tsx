'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { createGoogleBusinessAPI } from '@/lib/google-api';

interface GoogleBusinessProfile {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  isConnected: boolean;
  lastSync?: Date;
  accountId: string;
  locationId: string;
}

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  businessProfiles: GoogleBusinessProfile[];
  refreshBusinessProfiles: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  createPost: (locationId: string, postData: any) => Promise<any>;
  getPosts: (locationId: string) => Promise<any[]>;
  getInsights: (locationId: string, startDate: string, endDate: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [businessProfiles, setBusinessProfiles] = useState<GoogleBusinessProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!session;
  const user = session?.user;

  const refreshBusinessProfiles = async () => {
    if (!session?.accessToken) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/business-profiles');
      const data = await response.json();
      
      if (response.ok) {
        setBusinessProfiles(data.profiles);
      } else {
        console.error('Error fetching business profiles:', data.error);
      }
    } catch (error) {
      console.error('Error fetching business profiles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  const createPost = async (locationId: string, postData: any) => {
    if (!session?.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId,
        postData
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create post');
    }
    
    return data.post;
  };

  const getPosts = async (locationId: string) => {
    if (!session?.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch(`/api/posts?locationId=${locationId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch posts');
    }
    
    return data.posts;
  };

  const getInsights = async (locationId: string, startDate: string, endDate: string) => {
    if (!session?.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch(`/api/insights?locationId=${locationId}&startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch insights');
    }
    
    return data.insights;
  };

  useEffect(() => {
    if (isAuthenticated && session?.accessToken) {
      refreshBusinessProfiles();
    }
  }, [isAuthenticated, session?.accessToken]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading: status === 'loading' || isLoading,
    businessProfiles,
    refreshBusinessProfiles,
    login,
    logout,
    createPost,
    getPosts,
    getInsights
  };

  return (
    <AuthContext.Provider value={value}>
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

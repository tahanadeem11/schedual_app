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
      // For static export, use mock data
      const mockProfiles = [
        {
          id: 'mock-1',
          name: 'Sample Business Profile',
          address: '123 Main St, City, State 12345',
          phone: '+1 (555) 123-4567',
          website: 'https://example.com',
          isConnected: false,
          lastSync: new Date(),
          accountId: 'mock-account-1',
          locationId: 'mock-location-1'
        }
      ];
      setBusinessProfiles(mockProfiles);
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
    
    // For static export, simulate post creation
    console.log('Creating post:', { locationId, postData });
    return { id: 'mock-post-' + Date.now(), ...postData };
  };

  const getPosts = async (locationId: string) => {
    if (!session?.accessToken) throw new Error('Not authenticated');
    
    // For static export, return mock posts
    return [];
  };

  const getInsights = async (locationId: string, startDate: string, endDate: string) => {
    if (!session?.accessToken) throw new Error('Not authenticated');
    
    // For static export, return mock insights
    return {
      impressions: 1250,
      clicks: 89,
      interactions: 156,
      views: 2100
    };
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

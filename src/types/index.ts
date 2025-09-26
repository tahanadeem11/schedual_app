export interface GoogleBusinessProfile {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  isConnected: boolean;
  lastSync?: Date;
}

export interface ScheduledPost {
  id: string;
  businessProfileId: string;
  title: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  ctaButton?: {
    type: 'Learn More' | 'Book Now' | 'Call' | 'Get Directions';
    url?: string;
  };
  scheduledDate: Date;
  status: 'scheduled' | 'published' | 'failed' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

export interface PostAnalytics {
  postId: string;
  impressions: number;
  clicks: number;
  interactions: number;
  views: number;
  lastUpdated: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  googleConnected: boolean;
  businessProfiles: GoogleBusinessProfile[];
}

export interface DashboardStats {
  totalPosts: number;
  scheduledPosts: number;
  publishedPosts: number;
  totalImpressions: number;
  totalClicks: number;
  totalInteractions: number;
}

export type NavigationItem = {
  name: string;
  href: string;
  icon: string;
  current?: boolean;
};

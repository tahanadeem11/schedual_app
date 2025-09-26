import { GoogleBusinessProfile, ScheduledPost, PostAnalytics, User, DashboardStats } from '@/types';

// Mock user data
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  googleConnected: true,
  businessProfiles: [
    {
      id: 'gbp-1',
      name: 'Downtown Coffee Shop',
      address: '123 Main St, Downtown, NY 10001',
      phone: '+1 (555) 123-4567',
      website: 'https://downtowncoffee.com',
      isConnected: true,
      lastSync: new Date('2024-01-15T10:30:00Z')
    },
    {
      id: 'gbp-2',
      name: 'Mountain View Restaurant',
      address: '456 Oak Ave, Mountain View, CA 94041',
      phone: '+1 (555) 987-6543',
      website: 'https://mountainviewrestaurant.com',
      isConnected: true,
      lastSync: new Date('2024-01-14T15:45:00Z')
    }
  ]
};

// Mock scheduled posts
export const mockScheduledPosts: ScheduledPost[] = [
  {
    id: 'post-1',
    businessProfileId: 'gbp-1',
    title: 'New Seasonal Menu',
    content: '🍂 Fall is here! Try our new pumpkin spice latte and apple cinnamon muffins. Available all month long!',
    mediaUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    mediaType: 'image',
    ctaButton: {
      type: 'Learn More',
      url: 'https://downtowncoffee.com/menu'
    },
    scheduledDate: new Date('2024-01-20T09:00:00Z'),
    status: 'scheduled',
    createdAt: new Date('2024-01-15T14:30:00Z'),
    updatedAt: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'post-2',
    businessProfileId: 'gbp-2',
    title: 'Weekend Special',
    content: '🍝 This weekend only: 20% off all pasta dishes! Book your table now and enjoy our chef\'s special creations.',
    mediaUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
    mediaType: 'image',
    ctaButton: {
      type: 'Book Now',
      url: 'https://mountainviewrestaurant.com/reservations'
    },
    scheduledDate: new Date('2024-01-18T18:00:00Z'),
    status: 'scheduled',
    createdAt: new Date('2024-01-15T16:20:00Z'),
    updatedAt: new Date('2024-01-15T16:20:00Z')
  },
  {
    id: 'post-3',
    businessProfileId: 'gbp-1',
    title: 'Happy Hour',
    content: '☕ Happy Hour is back! 2-4 PM daily. Get 50% off all drinks and pastries. See you soon!',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
    scheduledDate: new Date('2024-01-12T14:00:00Z'),
    status: 'published',
    createdAt: new Date('2024-01-10T11:15:00Z'),
    updatedAt: new Date('2024-01-12T14:00:00Z')
  }
];

// Mock analytics data
export const mockAnalytics: PostAnalytics[] = [
  {
    postId: 'post-3',
    impressions: 1250,
    clicks: 89,
    interactions: 156,
    views: 2100,
    lastUpdated: new Date('2024-01-15T12:00:00Z')
  }
];

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalPosts: 12,
  scheduledPosts: 2,
  publishedPosts: 10,
  totalImpressions: 15600,
  totalClicks: 890,
  totalInteractions: 1240
};

// Navigation items
export const navigationItems = [
  { name: 'Dashboard', href: '/', icon: 'HomeIcon' },
  { name: 'Create Post', href: '/create', icon: 'PlusIcon' },
  { name: 'Scheduler', href: '/scheduler', icon: 'CalendarIcon' },
  { name: 'History', href: '/history', icon: 'ChartBarIcon' },
  { name: 'Settings', href: '/settings', icon: 'CogIcon' }
];

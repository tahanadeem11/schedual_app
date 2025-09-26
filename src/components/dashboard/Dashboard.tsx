'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { mockScheduledPosts, mockDashboardStats } from '@/lib/data';
import { formatDate, formatNumber } from '@/lib/utils';
import { 
  PlusIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  EyeIcon,
  CursorArrowRaysIcon,
  HeartIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function Dashboard() {
  const { user, isAuthenticated, businessProfiles, isLoading, login } = useAuth();
  const [upcomingPosts, setUpcomingPosts] = useState(mockScheduledPosts.filter(post => post.status === 'scheduled'));
  const [recentPosts, setRecentPosts] = useState(mockScheduledPosts.filter(post => post.status === 'published').slice(0, 3));

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Welcome to ScheduleApp</CardTitle>
            <CardDescription>
              Connect your Google Business Profile to start scheduling posts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={login} className="w-full" size="lg">
              Sign in with Google
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                You'll be able to manage your Google Business Profile posts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your business profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
          <p className="text-gray-600">Here's what's happening with your Google Business Profiles.</p>
        </div>
        <Link href="/create">
          <Button className="flex items-center space-x-2">
            <PlusIcon className="h-4 w-4" />
            <span>Create Post</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <ChartBarIcon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardStats.totalPosts}</div>
            <p className="text-xs text-gray-600">
              {mockDashboardStats.scheduledPosts} scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <EyeIcon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(mockDashboardStats.totalImpressions)}</div>
            <p className="text-xs text-gray-600">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
            <CursorArrowRaysIcon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(mockDashboardStats.totalClicks)}</div>
            <p className="text-xs text-gray-600">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interactions</CardTitle>
            <HeartIcon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(mockDashboardStats.totalInteractions)}</div>
            <p className="text-xs text-gray-600">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connected Business Profiles */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Business Profiles</CardTitle>
            <CardDescription>
              Manage your Google Business Profile connections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {businessProfiles.length > 0 ? (
              businessProfiles.map((profile) => (
                <div key={profile.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{profile.name}</h3>
                      <p className="text-sm text-gray-600">{profile.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">Connected</div>
                    <div className="text-xs text-gray-500">
                      Last sync: {profile.lastSync ? formatDate(profile.lastSync) : 'Never'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No Google Business Profiles connected</p>
                <p className="text-sm text-gray-500 mt-1">
                  Connect your Google Business Profile to start scheduling posts
                </p>
              </div>
            )}
            <Button variant="outline" className="w-full">
              Connect New Business Profile
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Posts</CardTitle>
            <CardDescription>
              Your scheduled posts for the next few days
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingPosts.length > 0 ? (
              upcomingPosts.map((post) => (
                <div key={post.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{post.title}</h4>
                    <p className="text-xs text-gray-600">
                      {businessProfiles.find(p => p.id === post.businessProfileId)?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(post.scheduledDate)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No upcoming posts scheduled</p>
                <Link href="/create">
                  <Button variant="outline" size="sm" className="mt-2">
                    Schedule Your First Post
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>
            Your latest published posts and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  {post.mediaUrl && (
                    <img
                      src={post.mediaUrl}
                      alt={post.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{post.title}</h4>
                    <p className="text-sm text-gray-600 truncate">{post.content}</p>
                    <p className="text-xs text-gray-500">
                      {businessProfiles.find(p => p.id === post.businessProfileId)?.name} • 
                      Published {formatDate(post.updatedAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">1.2K views</div>
                    <div className="text-xs text-gray-500">89 clicks</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No posts published yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

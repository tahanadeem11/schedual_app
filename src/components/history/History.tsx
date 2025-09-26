'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/contexts/AuthContext';
import { mockScheduledPosts, mockAnalytics } from '@/lib/data';
import { formatDate, formatNumber } from '@/lib/utils';
import { 
  ChartBarIcon, 
  EyeIcon,
  CursorArrowRaysIcon,
  HeartIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

export function History() {
  const { businessProfiles } = useAuth();
  const [selectedBusiness, setSelectedBusiness] = useState('all');
  const [timeRange, setTimeRange] = useState('30');

  const businessProfileOptions = [
    { value: 'all', label: 'All Locations' },
    ...businessProfiles.map(profile => ({
      value: profile.locationId,
      label: profile.name
    }))
  ];

  const timeRangeOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: '365', label: 'Last year' }
  ];

  const publishedPosts = mockScheduledPosts.filter(post => post.status === 'published');
  const filteredPosts = selectedBusiness === 'all' 
    ? publishedPosts 
    : publishedPosts.filter(post => post.businessProfileId === selectedBusiness);

  const getBusinessName = (businessId: string) => {
    return businessProfiles.find(p => p.locationId === businessId)?.name || 'Unknown Business';
  };

  const getPostAnalytics = (postId: string) => {
    return mockAnalytics.find(analytics => analytics.postId === postId);
  };

  const totalStats = filteredPosts.reduce((acc, post) => {
    const analytics = getPostAnalytics(post.id);
    if (analytics) {
      acc.impressions += analytics.impressions;
      acc.clicks += analytics.clicks;
      acc.interactions += analytics.interactions;
      acc.views += analytics.views;
    }
    return acc;
  }, { impressions: 0, clicks: 0, interactions: 0, views: 0 });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Post History & Analytics</h1>
          <p className="text-gray-600">Track the performance of your published posts</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-40"
          />
          <Select
            options={businessProfileOptions}
            value={selectedBusiness}
            onChange={(e) => setSelectedBusiness(e.target.value)}
            className="w-48"
          />
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <EyeIcon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalStats.impressions)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
              +12% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <CursorArrowRaysIcon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalStats.clicks)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
              +8% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
            <HeartIcon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalStats.interactions)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
              +15% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <ChartBarIcon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStats.impressions > 0 ? ((totalStats.clicks / totalStats.impressions) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-red-600 flex items-center">
              <ArrowTrendingDownIcon className="h-3 w-3 mr-1" />
              -2% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Posts Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Post Performance</CardTitle>
          <CardDescription>
            Detailed analytics for each published post
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => {
                const analytics = getPostAnalytics(post.id);
                return (
                  <div
                    key={post.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {/* Post Media */}
                    <div className="flex-shrink-0">
                      {post.mediaUrl ? (
                        <img
                          src={post.mediaUrl}
                          alt={post.title}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center">
                          <CalendarIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Post Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{getBusinessName(post.businessProfileId)}</span>
                        <span>•</span>
                        <span>Published {formatDate(post.updatedAt)}</span>
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {analytics ? formatNumber(analytics.impressions) : '0'}
                        </div>
                        <div className="text-xs text-gray-500">Impressions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {analytics ? formatNumber(analytics.clicks) : '0'}
                        </div>
                        <div className="text-xs text-gray-500">Clicks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {analytics ? formatNumber(analytics.interactions) : '0'}
                        </div>
                        <div className="text-xs text-gray-500">Interactions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {analytics ? formatNumber(analytics.views) : '0'}
                        </div>
                        <div className="text-xs text-gray-500">Views</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ChartBarIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No published posts</h3>
              <p className="text-gray-600 mb-4">
                {selectedBusiness === 'all' 
                  ? 'You haven\'t published any posts yet.' 
                  : 'No published posts found for the selected business location.'}
              </p>
              <Button>Create Your First Post</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>
            Track your post performance over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Performance chart will be implemented in a future update</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

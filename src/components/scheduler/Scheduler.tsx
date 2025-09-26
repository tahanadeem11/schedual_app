'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/contexts/AuthContext';
import { mockScheduledPosts } from '@/lib/data';
import { formatDate, formatDateShort } from '@/lib/utils';
import { 
  CalendarIcon, 
  ClockIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';

export function Scheduler() {
  const { businessProfiles } = useAuth();
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [selectedBusiness, setSelectedBusiness] = useState('all');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const businessProfileOptions = [
    { value: 'all', label: 'All Locations' },
    ...businessProfiles.map(profile => ({
      value: profile.locationId,
      label: profile.name
    }))
  ];

  const filteredPosts = selectedBusiness === 'all' 
    ? mockScheduledPosts 
    : mockScheduledPosts.filter(post => post.businessProfileId === selectedBusiness);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBusinessName = (businessId: string) => {
    return businessProfiles.find(p => p.locationId === businessId)?.name || 'Unknown Business';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Post Scheduler</h1>
          <p className="text-gray-600">Manage your scheduled and published posts</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            options={businessProfileOptions}
            value={selectedBusiness}
            onChange={(e) => setSelectedBusiness(e.target.value)}
            className="w-48"
          />
          <div className="flex border border-gray-300 rounded-lg">
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-r-none"
            >
              <ListBulletIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className="rounded-l-none"
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{filteredPosts.length}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredPosts.filter(p => p.status === 'scheduled').length}
                </p>
              </div>
              <ClockIcon className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredPosts.filter(p => p.status === 'published').length}
                </p>
              </div>
              <EyeIcon className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredPosts.filter(p => p.status === 'failed').length}
                </p>
              </div>
              <TrashIcon className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>
            {viewMode === 'list' ? 'List view of all your posts' : 'Calendar view of scheduled posts'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
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
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {post.title}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{getBusinessName(post.businessProfileId)}</span>
                        <span>•</span>
                        <span>
                          {post.status === 'scheduled' ? 'Scheduled' : 'Published'} {formatDate(post.scheduledDate)}
                        </span>
                        {post.ctaButton?.type && (
                          <>
                            <span>•</span>
                            <span>CTA: {post.ctaButton.type}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedBusiness === 'all' 
                      ? 'You haven\'t created any posts yet.' 
                      : 'No posts found for the selected business location.'}
                  </p>
                  <Button>Create Your First Post</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
              <p className="text-gray-600">
                Calendar view will be implemented in a future update.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

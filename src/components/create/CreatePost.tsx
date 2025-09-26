'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/contexts/AuthContext';
import { 
  PhotoIcon, 
  VideoCameraIcon,
  LinkIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export function CreatePost() {
  const { user, isAuthenticated, businessProfiles, createPost, login } = useAuth();
  const [formData, setFormData] = useState({
    businessProfileId: '',
    title: '',
    content: '',
    mediaUrl: '',
    mediaType: 'image' as 'image' | 'video',
    ctaButton: {
      type: '' as 'Learn More' | 'Book Now' | 'Call' | 'Get Directions' | '',
      url: ''
    },
    scheduledDate: '',
    scheduledTime: ''
  });

  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const businessProfileOptions = businessProfiles.map(profile => ({
    value: profile.locationId,
    label: profile.name
  }));

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Sign in Required</CardTitle>
            <CardDescription>
              Please sign in with your Google account to create posts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={login} className="w-full" size="lg">
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const ctaOptions = [
    { value: '', label: 'No CTA Button' },
    { value: 'Learn More', label: 'Learn More' },
    { value: 'Book Now', label: 'Book Now' },
    { value: 'Call', label: 'Call' },
    { value: 'Get Directions', label: 'Get Directions' }
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const selectedProfile = businessProfiles.find(p => p.locationId === formData.businessProfileId);
      if (!selectedProfile) {
        throw new Error('Please select a business profile');
      }

      const postData = {
        summary: formData.content,
        callToAction: formData.ctaButton.type ? {
          actionType: formData.ctaButton.type.toUpperCase().replace(' ', '_') as any,
          url: formData.ctaButton.url
        } : undefined,
        media: formData.mediaUrl ? [{
          mediaFormat: formData.mediaType.toUpperCase() as 'PHOTO' | 'VIDEO',
          sourceUrl: formData.mediaUrl
        }] : undefined
      };

      await createPost(formData.businessProfileId, postData);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        businessProfileId: '',
        title: '',
        content: '',
        mediaUrl: '',
        mediaType: 'image',
        ctaButton: { type: '', url: '' },
        scheduledDate: '',
        scheduledTime: ''
      });
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedBusiness = businessProfiles.find(
    profile => profile.locationId === formData.businessProfileId
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600">Schedule a post for your Google Business Profile</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setPreviewMode('mobile')}>
            Mobile
          </Button>
          <Button variant="outline" onClick={() => setPreviewMode('desktop')}>
            Desktop
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>
              Fill in the details for your Google Business Profile post
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Location */}
              <Select
                label="Business Location"
                options={businessProfileOptions}
                value={formData.businessProfileId}
                onChange={(e) => handleInputChange('businessProfileId', e.target.value)}
                required
              />

              {/* Post Title */}
              <Input
                label="Post Title"
                placeholder="Enter a catchy title for your post"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />

              {/* Post Content */}
              <Textarea
                label="Post Content"
                placeholder="Write your post content here..."
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={4}
                required
              />

              {/* Media Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Media</label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter image or video URL"
                      value={formData.mediaUrl}
                      onChange={(e) => handleInputChange('mediaUrl', e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant={formData.mediaType === 'image' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleInputChange('mediaType', 'image')}
                    >
                      <PhotoIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant={formData.mediaType === 'video' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleInputChange('mediaType', 'video')}
                    >
                      <VideoCameraIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Select
                label="Call-to-Action Button"
                options={ctaOptions}
                value={formData.ctaButton.type}
                onChange={(e) => handleInputChange('ctaButton.type', e.target.value)}
              />

              {formData.ctaButton.type && (
                <Input
                  label="CTA Button URL"
                  placeholder="https://example.com"
                  value={formData.ctaButton.url}
                  onChange={(e) => handleInputChange('ctaButton.url', e.target.value)}
                  required={!!formData.ctaButton.type}
                />
              )}

              {/* Schedule Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Schedule Date"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                  required
                />
                <Input
                  label="Schedule Time"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                  required
                />
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-800">Post created successfully!</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                  <p className="text-sm text-red-800">{errorMessage}</p>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1" 
                  isLoading={isSubmitting}
                  disabled={!formData.businessProfileId || !formData.content}
                >
                  {isSubmitting ? 'Creating Post...' : 'Create Post'}
                </Button>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              How your post will appear on Google Business Profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`mx-auto bg-white border border-gray-200 rounded-lg shadow-sm ${
              previewMode === 'mobile' ? 'max-w-sm' : 'max-w-md'
            }`}>
              {/* Business Profile Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {selectedBusiness?.name.charAt(0) || 'B'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedBusiness?.name || 'Select a business'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness?.address || 'Business address'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4 space-y-4">
                {formData.title && (
                  <h2 className="font-semibold text-gray-900">{formData.title}</h2>
                )}
                
                {formData.content && (
                  <p className="text-gray-700 whitespace-pre-wrap">{formData.content}</p>
                )}

                {formData.mediaUrl && (
                  <div className="relative">
                    {formData.mediaType === 'image' ? (
                      <img
                        src={formData.mediaUrl}
                        alt="Post media"
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                        <VideoCameraIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                )}

                {formData.ctaButton.type && formData.ctaButton.url && (
                  <Button className="w-full" variant="outline">
                    {formData.ctaButton.type}
                  </Button>
                )}

                {/* Post Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                  <span>Just now</span>
                  <div className="flex items-center space-x-4">
                    <span>👍 0</span>
                    <span>💬 0</span>
                    <span>📤 0</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

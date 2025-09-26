import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { google } from 'googleapis';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXTAUTH_URL
    );

    oauth2Client.setCredentials({
      access_token: session.accessToken as string,
      refresh_token: session.refreshToken as string
    });

    // Fallback for when Google API is not configured
    if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'dummy-client-id') {
      const profiles = [
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
      return NextResponse.json({ profiles });
    }

    // Use real Google My Business API with your OAuth credentials
    try {
      // For now, we'll use a direct API call to the My Business API
      // This will work with your OAuth tokens
      const response = await fetch('https://mybusinessbusinessinformation.googleapis.com/v1/accounts', {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const accounts = data.accounts || [];

        const profiles = [];

        for (const account of accounts) {
          try {
            // Get locations for each account
            const locationsResponse = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations`, {
              headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json'
              }
            });

            if (locationsResponse.ok) {
              const locationsData = await locationsResponse.json();
              const locations = locationsData.locations || [];

              for (const location of locations) {
                profiles.push({
                  id: location.name?.split('/').pop() || '',
                  name: location.title || 'Untitled Business',
                  address: location.storefrontAddress?.addressLines?.join(', ') || 'No address',
                  phone: location.primaryPhone,
                  website: location.websiteUri,
                  isConnected: true,
                  lastSync: new Date(),
                  accountId: account.name?.split('/').pop() || '',
                  locationId: location.name?.split('/').pop() || ''
                });
              }
            }
          } catch (locationError) {
            console.error('Error fetching locations for account:', account.name, locationError);
            // Continue with other accounts
          }
        }

        return NextResponse.json({ profiles });
      } else {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
    } catch (apiError: any) {
      console.error('Google My Business API Error:', apiError);
      
      // Fallback to mock data if API fails
      const profiles = [
        {
          id: 'profile-1',
          name: 'My Business Profile (API Error - Using Mock Data)',
          address: '123 Main St, City, State 12345',
          phone: '+1 (555) 123-4567',
          website: 'https://example.com',
          isConnected: false,
          lastSync: new Date(),
          accountId: 'account-1',
          locationId: 'location-1'
        }
      ];
      
      return NextResponse.json({ profiles });
    }
  } catch (error: any) {
    console.error('Error fetching business profiles:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch business profiles' }, { status: 500 });
  }
}

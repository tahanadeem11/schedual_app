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

    // For now, return mock data with real authentication
    // This can be extended with actual Google Business Profile API calls
    // when the proper API endpoints are configured
    const profiles = [
      {
        id: 'profile-1',
        name: 'My Business Profile',
        address: '123 Main St, City, State 12345',
        phone: '+1 (555) 123-4567',
        website: 'https://example.com',
        isConnected: true,
        lastSync: new Date(),
        accountId: 'account-1',
        locationId: 'location-1'
      }
    ];
    
    return NextResponse.json({ profiles });
  } catch (error: any) {
    console.error('Error fetching business profiles:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch business profiles' }, { status: 500 });
  }
}

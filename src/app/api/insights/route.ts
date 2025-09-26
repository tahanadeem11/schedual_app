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

    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!locationId) {
      return NextResponse.json({ error: 'Location ID is required' }, { status: 400 });
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

    // For now, return mock data with real authentication
    // This can be extended with actual Google Business Profile API calls
    const mockInsights = {
      impressions: 1250,
      clicks: 89,
      interactions: 156,
      views: 2100,
      posts: [
        {
          id: 'post-1',
          title: 'Sample Post 1',
          impressions: 450,
          clicks: 32,
          interactions: 45
        },
        {
          id: 'post-2',
          title: 'Sample Post 2',
          impressions: 380,
          clicks: 28,
          interactions: 38
        }
      ]
    };
    
    return NextResponse.json({ insights: mockInsights });
  } catch (error: any) {
    console.error('Error fetching insights:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch insights' }, { status: 500 });
  }
}

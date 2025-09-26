import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json({
    message: 'Configuration Debug Info',
    config,
    status: 'ok'
  });
}

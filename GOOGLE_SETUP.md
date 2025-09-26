# Google Business Profile API Setup Guide

This guide will help you set up Google Business Profile API integration for ScheduleApp.

## Prerequisites

- Google Cloud Console account
- Google Business Profile account with verified business locations
- Node.js and npm installed

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "ScheduleApp" (or your preferred name)
4. Click "Create"

## Step 2: Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for and enable the following APIs:
   - **Google Business Profile API** (formerly My Business API)
   - **Google+ API** (for user profile information)

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External" user type
   - Fill in required fields:
     - App name: "ScheduleApp"
     - User support email: your email
     - Developer contact: your email
   - Add scopes:
     - `https://www.googleapis.com/auth/business.manage`
     - `https://www.googleapis.com/auth/userinfo.email`
     - `https://www.googleapis.com/auth/userinfo.profile`
4. Create OAuth client ID:
   - Application type: "Web application"
   - Name: "ScheduleApp Web Client"
   - Authorized redirect URIs:
     - `http://localhost:3001/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_oauth_client_id_here
GOOGLE_CLIENT_SECRET=your_oauth_client_secret_here
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_random_secret_string_here

# Google Business Profile API
GOOGLE_BUSINESS_PROFILE_API_KEY=your_api_key_here
```

### Getting the values:

- **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**: From the OAuth client you created in Step 3
- **NEXTAUTH_SECRET**: Generate a random string (you can use `openssl rand -base64 32`)
- **GOOGLE_BUSINESS_PROFILE_API_KEY**: Create an API key in Google Cloud Console → APIs & Services → Credentials → Create Credentials → API Key

## Step 5: Configure API Key Restrictions (Recommended)

1. In Google Cloud Console → APIs & Services → Credentials
2. Click on your API key
3. Under "Application restrictions", select "HTTP referrers"
4. Add your domain(s):
   - `http://localhost:3001/*` (for development)
   - `https://yourdomain.com/*` (for production)
5. Under "API restrictions", select "Restrict key"
6. Select "Google Business Profile API"

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3001`
3. Click "Sign in with Google"
4. Grant permissions to access your Google Business Profile
5. Verify that your business locations appear in the dashboard

## Troubleshooting

### Common Issues:

1. **"Access blocked" error**: Check OAuth consent screen configuration
2. **"Invalid client" error**: Verify CLIENT_ID and CLIENT_SECRET
3. **"API not enabled" error**: Ensure Google Business Profile API is enabled
4. **"Insufficient permissions" error**: Check that the user has verified business locations

### Required Permissions:

Your Google account must have:
- Verified Google Business Profile locations
- Owner or manager access to the business profiles
- The business profiles must be in "Published" status

## Production Deployment

For production deployment:

1. Update OAuth redirect URIs to include your production domain
2. Update NEXTAUTH_URL to your production URL
3. Configure API key restrictions for your production domain
4. Ensure your domain is verified in Google Search Console (recommended)

## API Limits and Quotas

Google Business Profile API has the following limits:
- 10,000 requests per day per project
- 100 requests per 100 seconds per user

Monitor your usage in Google Cloud Console → APIs & Services → Quotas.

## Security Best Practices

1. Never commit `.env.local` to version control
2. Use environment-specific API keys
3. Regularly rotate your API keys
4. Monitor API usage for unusual activity
5. Use HTTPS in production

## Support

If you encounter issues:
1. Check Google Cloud Console logs
2. Verify API quotas and limits
3. Ensure all required APIs are enabled
4. Check that your business profiles are verified and published

For Google Business Profile API documentation, visit:
https://developers.google.com/my-business/reference/businessinformation

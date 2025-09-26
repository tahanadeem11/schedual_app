# Environment Configuration for Real Google Business Profile Integration

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-change-this-in-production

# Application Configuration
NODE_ENV=development
```

## For Production Deployment

Update the environment variables for your production domain:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth.js Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret-key

# Application Configuration
NODE_ENV=production
```

## How to Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Google Business Profile API
   - Google OAuth 2.0 API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your environment variables

## NextAuth Secret

Generate a secure secret for NextAuth.js:

```bash
openssl rand -base64 32
```

Or use any secure random string generator.

## Important Notes

- Never commit `.env.local` to version control
- Use different credentials for development and production
- Ensure your domain is properly configured in Google Cloud Console
- The app will fall back to mock data if Google credentials are not configured

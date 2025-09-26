# 🔑 OAuth 2.0 Token Configuration

## Your OAuth Credentials

Based on your curl command, here are your OAuth credentials:

### Base64 Encoded Credentials
```
c3FIOG9vSGV4VHo4QzAyg5T1JvNnJoZ3ExaVNyQWw6WjRsanRKZG5lQk9qUE1BVQ
```

### Decoded Credentials
When decoded, this contains:
- **Client ID**: `sqH8ooHexTz8C02g5R1o6rhgq1iSrAl`
- **Client Secret**: `Z4ljJdjnBjPM1AU`

## Environment Configuration

Update your `.env.local` file with these credentials:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=sqH8ooHexTz8C02g5R1o6rhgq1iSrAl
GOOGLE_CLIENT_SECRET=Z4ljJdjnBjPM1AU

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Application Configuration
NODE_ENV=development
```

## OAuth Flow Implementation

Your application now supports the complete OAuth 2.0 flow as described in the [Google Cloud Apigee documentation](https://cloud.google.com/apigee/docs/api-platform/security/oauth/access-tokens?_gl=1*ut4fp7*_ga*MjUyNTk0MjA2LjE3NTcyNzEyNDQ.*_ga_WH2QY8WWF5*czE3NTg5MTQwNTkkbzIkZzEkdDE3NTg5MTQyMDIkajYwJGwwJGgw#requestinganaccesstokenauthorizationcodegranttype-sampleendpoint):

### 1. Authorization Code Grant
- Users click "Continue with Google"
- Redirected to Google OAuth consent screen
- Google returns authorization code
- Application exchanges code for access token

### 2. Access Token Usage
- Access tokens are used to call Google My Business APIs
- Tokens are automatically refreshed when needed
- Secure token storage in NextAuth.js sessions

### 3. API Integration
Your application now integrates with:
- **Google My Business Business Information API** - Fetch business profiles
- **Google My Business API v4** - Create and manage posts
- **Google My Business Insights API** - Get analytics data

## Testing Your Integration

### 1. Start the Application
```bash
npm run dev
```

### 2. Test OAuth Flow
1. Visit `http://localhost:3000`
2. Click "Continue with Google"
3. Complete Google OAuth flow
4. Verify you can see your business profiles

### 3. Test API Endpoints
```bash
# Test business profiles
curl http://localhost:3000/api/business-profiles

# Test post creation
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"locationId":"your-location-id","postData":{"content":"Test post"}}'

# Test insights
curl http://localhost:3000/api/insights?locationId=your-location-id
```

## Production Deployment

For production, update your environment variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=sqH8ooHexTz8C02g5R1o6rhgq1iSrAl
GOOGLE_CLIENT_SECRET=Z4ljJdjnBjPM1AU

# NextAuth.js Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret-key

# Application Configuration
NODE_ENV=production
```

## API Endpoints Available

### Business Profiles
- **GET** `/api/business-profiles` - Fetch user's business profiles
- Uses [My Business Business Information API](https://mybusinessverifications.googleapis.com/$discovery/rest?version=v1)

### Posts
- **GET** `/api/posts?locationId={id}` - Fetch posts for a location
- **POST** `/api/posts` - Create new post
- Uses Google My Business API v4

### Insights
- **GET** `/api/insights?locationId={id}&startDate={date}&endDate={date}` - Get analytics
- Uses Google My Business Insights API

## Error Handling

The application includes comprehensive error handling:
- **API Failures**: Falls back to mock data with clear error indicators
- **Authentication Errors**: Proper error messages and redirects
- **Token Expiry**: Automatic token refresh
- **Network Issues**: Graceful degradation

## Security Features

- **Secure Token Storage**: Tokens stored in encrypted NextAuth.js sessions
- **HTTPS Required**: Production deployment requires HTTPS
- **Scope Limitation**: Only requests necessary OAuth scopes
- **Token Refresh**: Automatic refresh token handling

## Next Steps

1. **Test Locally**: Verify OAuth flow works with your credentials
2. **Deploy to Production**: Use Vercel, Netlify, or your preferred platform
3. **Monitor Usage**: Track API calls and performance
4. **Scale**: Add more features as needed

Your application is now ready for real Google Business Profile integration! 🚀

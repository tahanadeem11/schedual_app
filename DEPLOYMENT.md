# cPanel Deployment Guide

This guide will help you deploy your Next.js social media scheduling app to cPanel hosting.

## Prerequisites

- cPanel hosting account with Node.js support
- Access to cPanel File Manager or FTP client
- Domain name configured in cPanel

## Build Information

✅ **Build Status**: Successfully completed
- **Build Type**: Static Export (compatible with cPanel)
- **Output Directory**: `out/`
- **Total Pages**: 7 pages generated
- **Build Size**: ~123 kB shared JS + individual page sizes

## Deployment Steps

### 1. Upload Files to cPanel

1. **Access cPanel File Manager**
   - Log into your cPanel account
   - Navigate to "File Manager"
   - Go to your domain's public_html directory

2. **Upload Build Files**
   - Upload the entire contents of the `out/` folder to your `public_html` directory
   - This includes:
     - `index.html` (main page)
     - `auth/signin/` (login page)
     - `create/` (post creation page)
     - `scheduler/` (scheduler page)
     - `history/` (analytics page)
     - `settings/` (settings page)
     - `_next/` (static assets)
     - All other static files

### 2. Configure Environment Variables (Optional)

Since this is a static build, most environment variables are not needed. However, if you plan to add server-side functionality later:

1. **Create .env file** in your cPanel root directory:
```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Set Up Domain Configuration

1. **Point Domain to public_html**
   - Ensure your domain is pointing to the `public_html` directory
   - This is usually done automatically in cPanel

2. **Configure SSL Certificate**
   - Enable SSL certificate in cPanel
   - This is important for Google OAuth to work properly

### 4. Test Deployment

1. **Visit your domain** to test the application
2. **Check all pages**:
   - `/` - Dashboard
   - `/auth/signin` - Login page
   - `/create` - Post creation
   - `/scheduler` - Scheduler
   - `/history` - Analytics
   - `/settings` - Settings

## Features Available in Static Build

✅ **Working Features**:
- Complete UI/UX with all pages
- Responsive design
- Mock data display
- Navigation between pages
- Form interactions
- **Mock Authentication System** (login/logout working)
- **Demo Mode** with sample user data
- **Business Profile Management** (mock data)

⚠️ **Limited Features** (due to static export):
- Real Google OAuth authentication (requires server-side)
- Real Google Business Profile API calls
- Actual post creation and scheduling
- Data persistence across sessions

## Upgrading to Full Functionality

To enable full Google Business Profile integration:

1. **Switch to Server-Side Rendering**
   - Remove `output: 'export'` from `next.config.ts`
   - Add API routes back
   - Deploy to a Node.js hosting service (Vercel, Netlify, etc.)

2. **Configure Google Cloud Console**
   - Follow the `GOOGLE_SETUP.md` guide
   - Set up OAuth credentials
   - Enable Business Profile API

3. **Update Environment Variables**
   - Add real Google API credentials
   - Configure NextAuth.js properly

## Troubleshooting

### Common Issues

1. **404 Errors on Page Refresh**
   - This is normal for static exports
   - Users should navigate using the app's navigation, not browser refresh

2. **Authentication Not Working**
   - Expected behavior in static build
   - Requires server-side implementation for full functionality

3. **Images Not Loading**
   - Check that all files in `_next/static/media/` are uploaded
   - Verify file permissions in cPanel

### File Permissions

Ensure these permissions in cPanel:
- Directories: 755
- HTML files: 644
- JavaScript/CSS files: 644

## Performance Optimization

The static build is already optimized with:
- Code splitting
- Minified JavaScript and CSS
- Optimized images
- Efficient bundle sizes

## Support

If you encounter issues:
1. Check cPanel error logs
2. Verify all files are uploaded correctly
3. Test with a simple HTML file first
4. Contact your hosting provider for Node.js support if needed

## Next Steps

1. **Deploy the static version** using this guide
2. **Test all pages** and functionality
3. **Plan for server-side upgrade** when ready for full Google integration
4. **Configure Google APIs** following the setup guide

---

**Build completed successfully!** 🎉
Your app is ready for cPanel deployment.

# 🔧 Fix Vercel Configuration Error

## ❌ **Error You're Seeing**
```
https://schedual-app.vercel.app/auth/error?error=Configuration
```

This error means NextAuth.js can't find the required environment variables on Vercel.

## ✅ **Step-by-Step Fix**

### **Step 1: Set Environment Variables in Vercel**

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `schedual-app`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```env
GOOGLE_CLIENT_ID=sqH8ooHexTz8C02g5R1o6rhgq1iSrAl
GOOGLE_CLIENT_SECRET=Z4ljJdjnBjPM1AU
NEXTAUTH_URL=https://schedual-app.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-here
```

**Important**: Make sure to set `NEXTAUTH_SECRET` to a secure random string!

### **Step 2: Generate a Secure NEXTAUTH_SECRET**

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

### **Step 3: Update Google Cloud Console**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add these **Authorized redirect URIs**:

```
https://schedual-app.vercel.app/api/auth/callback/google
```

### **Step 4: Redeploy Your Application**

After setting the environment variables:

1. Go to your Vercel dashboard
2. Click **Deployments**
3. Click **Redeploy** on your latest deployment
4. Or push a new commit to trigger a new deployment

## 🔍 **Verify Your Configuration**

### **Check Environment Variables**
In your Vercel dashboard, make sure you see:
- ✅ `GOOGLE_CLIENT_ID`
- ✅ `GOOGLE_CLIENT_SECRET` 
- ✅ `NEXTAUTH_URL`
- ✅ `NEXTAUTH_SECRET`

### **Check Google Cloud Console**
Make sure you have:
- ✅ OAuth consent screen configured
- ✅ Authorized redirect URI: `https://schedual-app.vercel.app/api/auth/callback/google`
- ✅ Business Profile API enabled

## 🧪 **Test the Fix**

1. Visit: `https://schedual-app.vercel.app`
2. Click "Continue with Google"
3. Complete the OAuth flow
4. You should be redirected to the dashboard

## 🚨 **Common Issues and Solutions**

### **Issue 1: "Configuration" Error**
**Solution**: Missing environment variables in Vercel
- Check all 4 environment variables are set
- Make sure `NEXTAUTH_SECRET` is not empty

### **Issue 2: "Access Denied" Error**
**Solution**: Wrong redirect URI in Google Cloud Console
- Add: `https://schedual-app.vercel.app/api/auth/callback/google`

### **Issue 3: "Invalid Client" Error**
**Solution**: Wrong OAuth credentials
- Double-check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### **Issue 4: "Scope" Error**
**Solution**: Missing Business Profile API access
- Enable Google Business Profile API in Google Cloud Console
- Add scope: `https://www.googleapis.com/auth/business.manage`

## 📋 **Complete Environment Variables Checklist**

```env
# Required for NextAuth.js
NEXTAUTH_URL=https://schedual-app.vercel.app
NEXTAUTH_SECRET=your-generated-secret-here

# Required for Google OAuth
GOOGLE_CLIENT_ID=sqH8ooHexTz8C02g5R1o6rhgq1iSrAl
GOOGLE_CLIENT_SECRET=Z4ljJdjnBjPM1AU

# Optional
NODE_ENV=production
```

## 🔧 **Debug Steps**

If you're still getting errors:

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Functions → View Function Logs
   - Look for error messages

2. **Test Environment Variables**:
   - Add a simple API route to check if variables are loaded
   - Visit: `https://schedual-app.vercel.app/api/debug`

3. **Check Google Cloud Console**:
   - Verify OAuth consent screen is configured
   - Check if Business Profile API is enabled

## 🎯 **Quick Fix Commands**

If you want to quickly test locally first:

```bash
# Create .env.local file
echo "GOOGLE_CLIENT_ID=sqH8ooHexTz8C02g5R1o6rhgq1iSrAl" > .env.local
echo "GOOGLE_CLIENT_SECRET=Z4ljJdjnBjPM1AU" >> .env.local
echo "NEXTAUTH_URL=http://localhost:3000" >> .env.local
echo "NEXTAUTH_SECRET=your-secret-here" >> .env.local

# Test locally
npm run dev
```

## ✅ **Success Indicators**

After fixing, you should see:
- ✅ No configuration errors
- ✅ Successful Google OAuth flow
- ✅ Redirect to dashboard after login
- ✅ Business profiles loading
- ✅ API calls working

---

**The most common cause is missing `NEXTAUTH_SECRET` in Vercel environment variables!** 🔑

Set all 4 environment variables in Vercel and redeploy - that should fix the configuration error.

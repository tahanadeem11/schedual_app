# 🚨 QUICK FIX for Vercel Configuration Error

## ❌ **The Problem**
Your Vercel deployment is missing environment variables, causing the configuration error.

## ✅ **IMMEDIATE FIX**

### **Step 1: Set Environment Variables in Vercel**

1. Go to: https://vercel.com/dashboard
2. Click on your project: `schedual-app`
3. Go to **Settings** → **Environment Variables**
4. Add these 4 variables:

```
GOOGLE_CLIENT_ID = sqH8ooHexTz8C02g5R1o6rhgq1iSrAl
GOOGLE_CLIENT_SECRET = Z4ljJdjnBjPM1AU
NEXTAUTH_URL = https://schedual-app.vercel.app
NEXTAUTH_SECRET = your-secret-key-here
```

### **Step 2: Generate NEXTAUTH_SECRET**

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

### **Step 3: Update Google Cloud Console**

1. Go to: https://console.cloud.google.com/
2. **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add redirect URI: `https://schedual-app.vercel.app/api/auth/callback/google`

### **Step 4: Redeploy**

1. Go to Vercel Dashboard → **Deployments**
2. Click **Redeploy** on latest deployment

## 🧪 **Test the Fix**

1. Visit: https://schedual-app.vercel.app
2. Click "Continue with Google"
3. Should work without configuration error

## 🔍 **Debug Your Configuration**

Visit: https://schedual-app.vercel.app/api/debug

This will show you which environment variables are missing.

---

**The error is because Vercel doesn't have your environment variables set!** 

Set all 4 variables in Vercel and redeploy - that's it! 🎯

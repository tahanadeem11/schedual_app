# PowerShell script to package the production deployment
# Run this script to create a production deployment package

Write-Host "Creating production deployment package..." -ForegroundColor Green

# Create production deployment directory
$productionDir = "production-deployment"
if (Test-Path $productionDir) {
    Remove-Item -Recurse -Force $productionDir
}
New-Item -ItemType Directory -Path $productionDir

# Copy source files (excluding build artifacts)
Write-Host "Copying source files..." -ForegroundColor Yellow
Copy-Item -Recurse -Path "src" -Destination $productionDir
Copy-Item -Path "package.json" -Destination $productionDir
Copy-Item -Path "package-lock.json" -Destination $productionDir
Copy-Item -Path "next.config.ts" -Destination $productionDir
Copy-Item -Path "tsconfig.json" -Destination $productionDir
Copy-Item -Path "postcss.config.mjs" -Destination $productionDir
Copy-Item -Path "eslint.config.mjs" -Destination $productionDir
Copy-Item -Path "tailwind.config.ts" -Destination $productionDir
Copy-Item -Recurse -Path "public" -Destination $productionDir

# Copy documentation
Write-Host "Copying documentation..." -ForegroundColor Yellow
Copy-Item -Path "README.md" -Destination $productionDir
Copy-Item -Path "REAL_GOOGLE_INTEGRATION.md" -Destination $productionDir
Copy-Item -Path "ENVIRONMENT_SETUP.md" -Destination $productionDir
Copy-Item -Path "GOOGLE_SETUP.md" -Destination $productionDir

# Create .gitignore
Write-Host "Creating .gitignore..." -ForegroundColor Yellow
$gitignoreContent = @"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
"@
Set-Content -Path "$productionDir\.gitignore" -Value $gitignoreContent

# Create deployment instructions
Write-Host "Creating deployment instructions..." -ForegroundColor Yellow
$deploymentInstructions = @"
# Production Deployment Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   Create a .env.local file with:
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=your-secret-key
   NODE_ENV=production
   ```

3. **Build and Start**
   ```bash
   npm run build
   npm start
   ```

## Deployment Platforms

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Set environment variables
4. Deploy

### Netlify
1. Connect repository
2. Set build command: npm run build
3. Set publish directory: .next
4. Add environment variables
5. Deploy

### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy

## Documentation
- REAL_GOOGLE_INTEGRATION.md - Complete integration guide
- ENVIRONMENT_SETUP.md - Environment configuration
- GOOGLE_SETUP.md - Google Cloud Console setup

## Support
Check the documentation files for detailed setup instructions.
"@
Set-Content -Path "$productionDir\DEPLOYMENT_INSTRUCTIONS.md" -Value $deploymentInstructions

# Create zip package
Write-Host "Creating zip package..." -ForegroundColor Yellow
$zipPath = "schedule-app-production-deployment.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath
}

# Create zip file
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($productionDir, $zipPath)

Write-Host "Production deployment package created: $zipPath" -ForegroundColor Green
Write-Host "Upload this to your hosting platform and follow DEPLOYMENT_INSTRUCTIONS.md" -ForegroundColor Cyan

# Clean up
Remove-Item -Recurse -Force $productionDir

Write-Host "Production deployment package ready!" -ForegroundColor Green

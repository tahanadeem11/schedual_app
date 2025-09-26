# PowerShell script to package the deployment for cPanel
# Run this script to create a deployment package

Write-Host "Creating cPanel deployment package..." -ForegroundColor Green

# Create deployment directory
$deploymentDir = "cpanel-deployment"
if (Test-Path $deploymentDir) {
    Remove-Item -Recurse -Force $deploymentDir
}
New-Item -ItemType Directory -Path $deploymentDir

# Copy build output
Write-Host "Copying build files..." -ForegroundColor Yellow
Copy-Item -Recurse -Path "out\*" -Destination $deploymentDir

# Copy deployment documentation
Write-Host "Copying documentation..." -ForegroundColor Yellow
Copy-Item -Path "DEPLOYMENT.md" -Destination $deploymentDir
Copy-Item -Path "production.env.example" -Destination $deploymentDir

# Create zip package
Write-Host "Creating zip package..." -ForegroundColor Yellow
$zipPath = "schedule-app-cpanel-deployment.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath
}

# Create zip file
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($deploymentDir, $zipPath)

Write-Host "Deployment package created: $zipPath" -ForegroundColor Green
Write-Host "Upload this file to your cPanel File Manager and extract in public_html" -ForegroundColor Cyan

# Clean up
Remove-Item -Recurse -Force $deploymentDir

Write-Host "Deployment package ready!" -ForegroundColor Green

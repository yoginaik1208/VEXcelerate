# VEXcelerate Ultimate Setup Script for Windows PowerShell
# This script does EVERYTHING automatically after you install Node.js and Android Studio

Write-Host "🚀 VEXcelerate Ultimate Setup - Doing Everything Automatically!" -ForegroundColor Cyan
Write-Host "==============================================================" -ForegroundColor Cyan

function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param($Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Error "Not in VEXcelerate directory. Let me clone it for you!"
    
    if (Get-Command git -ErrorAction SilentlyContinue) {
        Write-Info "Cloning VEXcelerate repository..."
        git clone https://github.com/yoginaik1208/VEXcelerate.git
        Set-Location VEXcelerate
        Write-Success "Repository cloned successfully"
    } else {
        Write-Error "Git not found. Please install Git first!"
        exit 1
    }
}

# Check prerequisites
Write-Info "Checking prerequisites..."

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js not found!"
    Write-Info "Please install Node.js from: https://nodejs.org/"
    exit 1
}

$nodeVersion = node --version
Write-Success "Node.js found: $nodeVersion"

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm not found!"
    exit 1
}

$npmVersion = npm --version
Write-Success "npm found: $npmVersion"

# Install dependencies
Write-Info "Installing all project dependencies..."
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Success "Dependencies installed"
} else {
    Write-Error "Failed to install dependencies"
    exit 1
}

# Install global Capacitor CLI if needed
Write-Info "Ensuring Capacitor CLI is available..."
npm install -g @capacitor/cli

# Build the web application
Write-Info "Building production web application..."
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Success "Web app built successfully"
} else {
    Write-Error "Failed to build web app"
    exit 1
}

# Add Android platform if not present
if (-not (Test-Path "android")) {
    Write-Info "Adding Android platform..."
    npx cap add android
    Write-Success "Android platform added"
}

# Sync with Capacitor
Write-Info "Syncing with Capacitor..."
npx cap sync android
Write-Success "Capacitor sync completed"

# Copy web assets
Write-Info "Copying web assets to Android project..."
npx cap copy android
Write-Success "Assets copied"

# Run Capacitor doctor
Write-Info "Running Capacitor doctor to check setup..."
npx cap doctor

# Check Android setup
if (Get-Command adb -ErrorAction SilentlyContinue) {
    Write-Success "Android SDK found"
} else {
    Write-Warning "Android SDK not found in PATH"
    Write-Info "Please ensure Android Studio is installed and configured"
}

# Final instructions
Write-Host ""
Write-Host "🎉 SETUP COMPLETE! Here's what happens next:" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
Write-Success "1. Your VEXcelerate project is fully configured"
Write-Success "2. Web app is built and ready"
Write-Success "3. Android project is synced and ready"
Write-Host ""
Write-Info "To open in Android Studio:"
Write-Host "  npx cap open android"
Write-Host ""
Write-Info "To test locally:"
Write-Host "  npm run dev"
Write-Host "  Open http://localhost:5173"
Write-Host ""
Write-Info "To build APK:"
Write-Host "  1. Run 'npx cap open android'"
Write-Host "  2. In Android Studio: Build → Generate Signed Bundle / APK"
Write-Host "  3. Choose APK and follow the signing process"
Write-Host ""
Write-Info "For Google Play Store submission:"
Write-Host "  Follow the ANDROID_PUBLISHING_PLAN.md guide"
Write-Host ""
Write-Success "Your VEXcelerate app is ready for the world! 🌟"

Read-Host "Press Enter to continue..."
#!/bin/bash

# VEXcelerate Ultimate Setup Script
# This script does EVERYTHING automatically after you install Node.js and Android Studio

set -e  # Exit on any error

echo "🚀 VEXcelerate Ultimate Setup - Doing Everything Automatically!"
echo "=============================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Not in VEXcelerate directory. Let me clone it for you!"
    
    if command -v git >/dev/null 2>&1; then
        print_info "Cloning VEXcelerate repository..."
        git clone https://github.com/yoginaik1208/VEXcelerate.git
        cd VEXcelerate
        print_status "Repository cloned successfully"
    else
        print_error "Git not found. Please install Git first!"
        exit 1
    fi
fi

# Check prerequisites
print_info "Checking prerequisites..."

if ! command -v node >/dev/null 2>&1; then
    print_error "Node.js not found!"
    print_info "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
print_status "Node.js found: $NODE_VERSION"

if ! command -v npm >/dev/null 2>&1; then
    print_error "npm not found!"
    exit 1
fi

NPM_VERSION=$(npm --version)
print_status "npm found: $NPM_VERSION"

# Install dependencies
print_info "Installing all project dependencies..."
npm install
print_status "Dependencies installed"

# Install global Capacitor CLI if needed
if ! npm list -g @capacitor/cli >/dev/null 2>&1; then
    print_info "Installing Capacitor CLI globally..."
    npm install -g @capacitor/cli
fi

# Build the web application
print_info "Building production web application..."
npm run build
print_status "Web app built successfully"

# Add Android platform if not present
if [ ! -d "android" ]; then
    print_info "Adding Android platform..."
    npx cap add android
    print_status "Android platform added"
fi

# Sync with Capacitor
print_info "Syncing with Capacitor..."
npx cap sync android
print_status "Capacitor sync completed"

# Copy web assets
print_info "Copying web assets to Android project..."
npx cap copy android
print_status "Assets copied"

# Run Capacitor doctor
print_info "Running Capacitor doctor to check setup..."
npx cap doctor

# Check Android setup
if command -v adb >/dev/null 2>&1; then
    print_status "Android SDK found"
else
    print_warning "Android SDK not found in PATH"
    print_info "Please ensure Android Studio is installed and configured"
fi

# Final instructions
echo ""
echo "🎉 SETUP COMPLETE! Here's what happens next:"
echo "==========================================="
echo ""
print_status "1. Your VEXcelerate project is fully configured"
print_status "2. Web app is built and ready"
print_status "3. Android project is synced and ready"
echo ""
print_info "To open in Android Studio:"
echo "  npx cap open android"
echo ""
print_info "To test locally:"
echo "  npm run dev"
echo "  Open http://localhost:5173"
echo ""
print_info "To build APK:"
echo "  1. Run 'npx cap open android'"
echo "  2. In Android Studio: Build → Generate Signed Bundle / APK"
echo "  3. Choose APK and follow the signing process"
echo ""
print_info "For Google Play Store submission:"
echo "  Follow the ANDROID_PUBLISHING_PLAN.md guide"
echo ""
print_status "Your VEXcelerate app is ready for the world! 🌟"
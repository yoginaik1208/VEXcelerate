#!/bin/bash

# VEXcelerate - iOS Build Script
# This script builds and prepares your iOS app for publishing
# NOTE: This must be run on a Mac with Xcode installed

set -e  # Exit on error

echo "🚀 VEXcelerate iOS Build Script"
echo "================================"
echo ""

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "⚠️  WARNING: iOS builds require a Mac with Xcode installed"
    echo "This script should be run on macOS, not $OSTYPE"
    echo ""
    echo "Options:"
    echo "1. Transfer this project to a Mac"
    echo "2. Use a cloud build service (Codemagic, EAS Build, etc.)"
    echo ""
    exit 1
fi

# Check if Xcode is installed
if ! command -v xcodebuild &> /dev/null; then
    echo "❌ Xcode is not installed"
    echo "Please install Xcode from the Mac App Store"
    exit 1
fi

# Check if CocoaPods is installed
if ! command -v pod &> /dev/null; then
    echo "⚠️  CocoaPods not found. Installing..."
    sudo gem install cocoapods
fi

# Step 1: Build web app
echo "📦 Step 1/4: Building web app..."
npm run build

# Step 2: Sync to iOS
echo "🔄 Step 2/4: Syncing to iOS platform..."
npx cap sync ios

# Step 3: Install CocoaPods dependencies
echo "📲 Step 3/4: Installing iOS dependencies..."
cd ios/App && pod install && cd ../..

# Step 4: Open Xcode
echo "🍎 Step 4/4: Opening Xcode..."
echo ""
echo "✅ Build complete!"
echo ""
echo "Next steps in Xcode:"
echo "1. Select 'App' target"
echo "2. Signing & Capabilities → Select your Team"
echo "3. Product → Archive"
echo "4. Distribute App → App Store Connect → Upload"
echo "5. Go to App Store Connect to create listing"
echo ""

npx cap open ios

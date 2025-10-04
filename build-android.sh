#!/bin/bash

# VEXcelerate - Android Build Script
# This script builds and prepares your Android app for publishing

set -e  # Exit on error

echo "🚀 VEXcelerate Android Build Script"
echo "===================================="
echo ""

# Step 1: Build web app
echo "📦 Step 1/3: Building web app..."
npm run build

# Step 2: Sync to Android
echo "🔄 Step 2/3: Syncing to Android platform..."
npx cap sync android

# Step 3: Open Android Studio
echo "📱 Step 3/3: Opening Android Studio..."
echo ""
echo "✅ Build complete!"
echo ""
echo "Next steps in Android Studio:"
echo "1. Wait for Gradle sync to complete"
echo "2. Build → Generate Signed Bundle / APK"
echo "3. Choose 'Android App Bundle'"
echo "4. Create/select keystore (SAVE IT!)"
echo "5. Build release → Upload to Google Play Console"
echo ""

npx cap open android

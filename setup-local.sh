#!/bin/bash

# VEXcelerate Local Machine Setup Script
# This script helps automate the setup process on your local machine

echo "🚀 VEXcelerate Local Machine Setup"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the VEXcelerate project directory"
    echo "   First run: git clone https://github.com/yoginaik1208/VEXcelerate.git"
    echo "   Then run: cd VEXcelerate"
    exit 1
fi

echo "✅ Found VEXcelerate project directory"

# Check Node.js
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js found: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install from: https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm >/dev/null 2>&1; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm found: $NPM_VERSION"
else
    echo "❌ npm not found. Please reinstall Node.js"
    exit 1
fi

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if Capacitor is available
if npx cap --version >/dev/null 2>&1; then
    CAP_VERSION=$(npx cap --version)
    echo "✅ Capacitor found: $CAP_VERSION"
else
    echo "❌ Capacitor not found. Installing..."
    npm install @capacitor/core @capacitor/cli
fi

# Build the web app
echo "🔨 Building web app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Web app built successfully"
else
    echo "❌ Failed to build web app"
    exit 1
fi

# Check Android setup
echo "🤖 Checking Android development setup..."
npx cap doctor

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Install Android Studio from: https://developer.android.com/studio"
echo "2. Open Android Studio and follow the setup wizard"
echo "3. Set up environment variables (see LOCAL_MACHINE_SETUP.md)"
echo "4. Run 'npx cap open android' to open your project in Android Studio"
echo "5. Follow ANDROID_PUBLISHING_PLAN.md for Google Play Store submission"
echo ""
echo "To test the web app locally:"
echo "  npm run dev"
echo "  Open http://localhost:5173 in your browser"
echo ""
echo "Need help? Check LOCAL_MACHINE_SETUP.md for detailed instructions!"
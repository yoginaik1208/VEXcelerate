@echo off
REM VEXcelerate Local Machine Setup Script for Windows
REM This script helps automate the setup process on your local Windows machine

echo 🚀 VEXcelerate Local Machine Setup
echo ==================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the VEXcelerate project directory
    echo    First run: git clone https://github.com/yoginaik1208/VEXcelerate.git
    echo    Then run: cd VEXcelerate
    pause
    exit /b 1
)

echo ✅ Found VEXcelerate project directory

REM Check Node.js
node --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js found: %NODE_VERSION%
) else (
    echo ❌ Node.js not found. Please install from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm found: %NPM_VERSION%
) else (
    echo ❌ npm not found. Please reinstall Node.js
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing project dependencies...
npm install

if %ERRORLEVEL% equ 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Check if Capacitor is available
npx cap --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    for /f "tokens=*" %%i in ('npx cap --version') do set CAP_VERSION=%%i
    echo ✅ Capacitor found: %CAP_VERSION%
) else (
    echo ❌ Capacitor not found. Installing...
    npm install @capacitor/core @capacitor/cli
)

REM Build the web app
echo 🔨 Building web app...
npm run build

if %ERRORLEVEL% equ 0 (
    echo ✅ Web app built successfully
) else (
    echo ❌ Failed to build web app
    pause
    exit /b 1
)

REM Check Android setup
echo 🤖 Checking Android development setup...
npx cap doctor

echo.
echo 🎉 Setup Complete!
echo ==================
echo.
echo Next steps:
echo 1. Install Android Studio from: https://developer.android.com/studio
echo 2. Open Android Studio and follow the setup wizard
echo 3. Set up environment variables (see LOCAL_MACHINE_SETUP.md)
echo 4. Run 'npx cap open android' to open your project in Android Studio
echo 5. Follow ANDROID_PUBLISHING_PLAN.md for Google Play Store submission
echo.
echo To test the web app locally:
echo   npm run dev
echo   Open http://localhost:5173 in your browser
echo.
echo Need help? Check LOCAL_MACHINE_SETUP.md for detailed instructions!
echo.
pause
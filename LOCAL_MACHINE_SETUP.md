# Local Machine Setup Guide for VEXcelerate

This guide will help you set up your local machine to continue developing and building the VEXcelerate Android app.

## What You Need to Install

1. **Git** (for cloning the repository)
2. **Node.js** (for running the web app and build tools)
3. **Android Studio** (for building Android APK)
4. **Java Development Kit (JDK)** (required by Android Studio)

## Step-by-Step Setup Instructions

### Step 1: Install Git (if not already installed)

#### Windows:
- Download from: https://git-scm.com/download/win
- Run the installer with default settings

#### macOS:
- Install via Homebrew: `brew install git`
- Or download from: https://git-scm.com/download/mac

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install git
```

### Step 2: Install Node.js

#### All Platforms:
1. Go to: https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer with default settings
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 3: Clone Your Repository

Open terminal/command prompt and run:
```bash
git clone https://github.com/yoginaik1208/VEXcelerate.git
cd VEXcelerate
```

### Step 4: Install Project Dependencies

In the VEXcelerate directory:
```bash
npm install
```

### Step 5: Install Android Studio

#### Windows:
1. Download from: https://developer.android.com/studio
2. Run the installer
3. Follow the setup wizard to install:
   - Android SDK
   - Android SDK Platform-Tools
   - Android Emulator (optional but recommended)

#### macOS:
1. Download from: https://developer.android.com/studio
2. Drag Android Studio to Applications folder
3. Launch and follow setup wizard

#### Linux:
1. Download from: https://developer.android.com/studio
2. Extract the zip file
3. Run `studio.sh` from the `bin/` directory
4. Follow setup wizard

### Step 6: Configure Android Studio

1. **Accept SDK Licenses:**
   ```bash
   # On Windows (in VEXcelerate directory)
   npx cap run android

   # On macOS/Linux
   npx cap run android
   ```

2. **Set Environment Variables (Important!):**

   #### Windows:
   Add to your system environment variables:
   - `ANDROID_HOME`: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
   - `JAVA_HOME`: `C:\Program Files\Android\Android Studio\jbr`

   #### macOS/Linux:
   Add to your `~/.bashrc` or `~/.zshrc`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
   # export ANDROID_HOME=$HOME/Android/Sdk        # Linux
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

### Step 7: Test Your Setup

1. **Test Node.js setup:**
   ```bash
   cd VEXcelerate
   npm run dev
   ```
   - Open http://localhost:5173 in browser
   - Should see your VEXcelerate app running

2. **Test Android setup:**
   ```bash
   npx cap doctor
   ```
   - This will check if everything is configured correctly

3. **Open Android Studio:**
   ```bash
   npx cap open android
   ```
   - Android Studio should open with your project

## Building Your Android APK

Once everything is set up:

1. **Build the web app:**
   ```bash
   npm run build
   ```

2. **Sync with Capacitor:**
   ```bash
   npx cap sync android
   ```

3. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

4. **In Android Studio:**
   - Click "Build" → "Generate Signed Bundle / APK"
   - Choose "APK" 
   - Follow the signing process (create keystore if needed)
   - Build APK for Google Play Store

## Troubleshooting Common Issues

### Node.js Issues:
- **Permission errors:** Try using `sudo` on macOS/Linux or run Command Prompt as Administrator on Windows
- **Version conflicts:** Use Node Version Manager (nvm) to manage Node.js versions

### Android Studio Issues:
- **SDK not found:** Make sure environment variables are set correctly
- **Gradle sync failed:** In Android Studio, go to File → Sync Project with Gradle Files
- **Emulator issues:** Make sure Intel HAXM or AMD Hypervisor is installed

### Capacitor Issues:
- **Cap doctor shows errors:** Follow the specific error messages and install missing components
- **Android platform not found:** Run `npx cap add android` if needed

## What's Different from Dev Container

- **Performance:** Much faster builds on your local machine
- **Android Studio:** Full GUI access for debugging and advanced features
- **Emulator:** Can run Android emulator for testing
- **Storage:** Unlimited storage for builds and dependencies

## Next Steps After Setup

1. Follow the **ANDROID_PUBLISHING_PLAN.md** for Google Play Store submission
2. Use **GOOGLE_PLAY_GUIDE.md** for store listing setup
3. Reference **APP_STORE_ASSETS.md** for creating required graphics

## Need Help?

If you encounter any issues:
1. Check the error messages carefully
2. Ensure all environment variables are set
3. Restart your terminal/command prompt after installing
4. Try running `npx cap doctor` to diagnose issues

Your VEXcelerate app is ready for local development and Android publishing! 🚀
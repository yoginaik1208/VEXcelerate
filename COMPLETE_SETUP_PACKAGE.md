# VEXcelerate Complete Setup Package

## Download Links (Copy these to your local machine)

### Required Software Downloads:
1. **Node.js LTS**: https://nodejs.org/en/download/
2. **Android Studio**: https://developer.android.com/studio
3. **Git for Windows**: https://git-scm.com/download/win (Windows only)

### Your Repository:
```bash
git clone https://github.com/yoginaik1208/VEXcelerate.git
```

## One-Click Setup Commands

Once you have Node.js installed, copy and paste these commands in order:

### Windows (Command Prompt):
```cmd
git clone https://github.com/yoginaik1208/VEXcelerate.git
cd VEXcelerate
npm install
npm run build
npx cap sync android
```

### Mac/Linux (Terminal):
```bash
git clone https://github.com/yoginaik1208/VEXcelerate.git
cd VEXcelerate
npm install
npm run build
npx cap sync android
```

## Android Studio Setup (After Installation):

1. Open Android Studio
2. Click "Open an existing Android Studio project"
3. Navigate to: `VEXcelerate/android`
4. Click "Open"
5. Let Android Studio sync the project
6. Go to Build → Generate Signed Bundle / APK
7. Choose APK → Create new keystore → Build

## Environment Variables (Important!)

### Windows:
- Press Win+R, type `sysdm.cpl`, press Enter
- Click "Environment Variables"
- Add these system variables:
  - `ANDROID_HOME`: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
  - `JAVA_HOME`: `C:\Program Files\Android\Android Studio\jbr`

### Mac:
Add to `~/.zshrc` or `~/.bash_profile`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Verification Commands:
```bash
node --version
npm --version
npx cap doctor
```

## That's It! 🎉
Your VEXcelerate app will be ready for Google Play Store submission!
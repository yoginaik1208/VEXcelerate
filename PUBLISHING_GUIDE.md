# 📱 VEXcelerate Mobile App Publishing Guide

## App Information
- **App Name**: VEXcelerate 🚀
- **Bundle ID (iOS)**: com.vexcelerate.app
- **Package Name (Android)**: com.vexcelerate.app
- **Description**: Accelerate your VEX IQ team's success with smart scoring tools and data-driven insights

## 🌟 Features
- 🧮 Mix & Match Calculator: Official 2025-26 VEX IQ scoring with real-time calculations
- 📊 Team Score Analyzer: Compare your team against up to 10 competitors
- ⏱️ Competition Timer: Match-accurate timing with audio alerts
- 📈 Performance Tracker: Multi-run practice tracking with automatic averaging
- 💾 Data Persistence: All your data saved locally across browser sessions

---

## 📋 Prerequisites

### For iOS Publishing:
1. **Mac computer** (required for Xcode)
2. **Apple Developer Account** ($99/year)
   - Sign up at: https://developer.apple.com
3. **Xcode** installed (free from Mac App Store)
4. **CocoaPods** installed: `sudo gem install cocoapods`

### For Android Publishing:
1. **Google Play Console Account** ($25 one-time fee)
   - Sign up at: https://play.google.com/console
2. **Android Studio** installed
   - Download: https://developer.android.com/studio
3. **Java Development Kit (JDK)** 17 or higher

---

## 🚀 Step-by-Step Publishing Process

### Phase 1: Prepare Your App

#### 1. Build the web app
```bash
npm run build
```

#### 2. Sync to native platforms
```bash
npx cap sync
```

---

### Phase 2: iOS Publishing (Requires Mac)

#### 1. Open iOS project in Xcode
```bash
npx cap open ios
```

#### 2. Configure App Icons & Splash Screen
- In Xcode, select `App` target
- Go to `App/App/Assets.xcassets/AppIcon.appiconset`
- Replace icon images with your app icon (use the provided vexcelerate-icon.png)
- For splash screen: `App/App/Assets.xcassets/Splash.imageset`

#### 3. Update App Info (Info.plist)
- Open `App/App/Info.plist`
- Update:
  - `CFBundleDisplayName` → "VEXcelerate"
  - `CFBundleShortVersionString` → "1.0.0"
  - `CFBundleVersion` → "1"

#### 4. Set Signing & Capabilities
- In Xcode, select `App` target → `Signing & Capabilities`
- Select your Team (Apple Developer Account)
- Xcode will auto-generate provisioning profile

#### 5. Build Archive
- In Xcode menu: `Product` → `Archive`
- Wait for build to complete (~5-10 minutes)
- Xcode Organizer will open

#### 6. Upload to App Store Connect
- In Organizer, click `Distribute App`
- Choose `App Store Connect` → `Upload`
- Follow prompts to upload

#### 7. Create App Store Listing
- Go to: https://appstoreconnect.apple.com
- Click `+ New App`
- Fill in:
  - **Name**: VEXcelerate
  - **Primary Language**: English
  - **Bundle ID**: com.vexcelerate.app
  - **SKU**: vexcelerate-001
- Add screenshots (iPhone and iPad)
- Add app description (use the one provided above)
- Select category: **Education** or **Productivity**
- Add keywords: vex, vex iq, robotics, scoring, timer, competition
- Set age rating (4+)
- Submit for review

**Timeline**: Apple review takes 1-3 days

---

### Phase 3: Android Publishing

#### 1. Open Android project
```bash
npx cap open android
```

#### 2. Update App Icons
- Android Studio will open
- Right-click `app/res` → `New` → `Image Asset`
- Select `Launcher Icons`
- Choose your icon image (vexcelerate-icon.png)
- Click `Next` → `Finish`

#### 3. Update Splash Screen
- Go to `app/res/drawable/splash.png`
- Replace with your splash logo image

#### 4. Update App Metadata
- Open `android/app/build.gradle`
- Update:
  - `versionCode` → 1
  - `versionName` → "1.0.0"
  - `applicationId` → "com.vexcelerate.app"

#### 5. Generate Signed APK/Bundle
- In Android Studio: `Build` → `Generate Signed Bundle / APK`
- Choose `Android App Bundle` (recommended for Play Store)
- Click `Create new...` to create keystore:
  - **Key store path**: Choose location (SAVE THIS - you'll need it for updates!)
  - **Password**: Create strong password (SAVE THIS!)
  - **Key alias**: vexcelerate-key
  - **Key password**: Same as keystore password
  - **Validity**: 25 years (default)
  - **Certificate info**: Fill in your details
- Click `Next` → Select `release` → `Finish`
- Build will generate `.aab` file in `android/app/release/`

**CRITICAL**: Save your keystore file and passwords! You'll need them for all future updates.

#### 6. Create Google Play Console Listing
- Go to: https://play.google.com/console
- Click `Create app`
- Fill in:
  - **App name**: VEXcelerate
  - **Default language**: English (US)
  - **App or game**: App
  - **Free or paid**: Free
- Complete all required sections:
  - **App content** (privacy policy, ads, target audience)
  - **Store listing**:
    - Short description (80 chars max)
    - Full description (use the one provided)
    - App icon (512x512 PNG)
    - Feature graphic (1024x500 PNG)
    - Screenshots (phone, tablet, etc.)
  - **Content rating** (complete questionnaire)
  - **Target audience & content**
  - **Data safety** (what data you collect)

#### 7. Upload App Bundle
- In Play Console, go to `Release` → `Production`
- Click `Create new release`
- Upload the `.aab` file from step 5
- Add release notes (e.g., "Initial release")
- Review and roll out

**Timeline**: Google review takes 1-7 days (usually 1-2 days)

---

## 🔧 Quick Commands Reference

```bash
# Build web app
npm run build

# Sync to native platforms
npx cap sync

# Open in Xcode (iOS)
npx cap open ios

# Open in Android Studio
npx cap open android

# Run on iOS device (requires Mac)
npm run cap:run:ios

# Run on Android device
npm run cap:run:android

# Update native platforms after code changes
npm run cap:sync
```

---

## 📸 Required Assets

### App Icon (iOS & Android)
- **File**: `resources/icon.png`
- **Size**: 1024x1024 px
- **Format**: PNG with transparency
- ✅ **Provided**: vexcelerate-icon.png

### Splash Screen
- **File**: `resources/splash.png`
- **Size**: 2732x2732 px (centered logo)
- **Format**: PNG
- ✅ **Provided**: vexcelerate-splash.png

### Screenshots (Needed for Store Listings)
You'll need to take screenshots on actual devices or simulators:

**iOS** (required sizes):
- iPhone 6.7" (1290x2796 px) - 3-10 screenshots
- iPhone 6.5" (1284x2778 px) - 3-10 screenshots
- iPad Pro 12.9" (2048x2732 px) - 3-10 screenshots

**Android** (required):
- Phone (min 320x320, max 3840x3840) - 2-8 screenshots
- 7" Tablet - 1-8 screenshots
- 10" Tablet - 1-8 screenshots

---

## 💰 Publishing Costs

| Platform | Cost | Type |
|----------|------|------|
| **Apple App Store** | $99/year | Annual subscription |
| **Google Play Store** | $25 | One-time registration fee |
| **Total First Year** | **$124** | - |
| **Subsequent Years** | **$99** | iOS renewal only |

---

## ⚠️ Important Notes

1. **Keystore Security (Android)**:
   - NEVER commit your keystore file to Git
   - Store it securely (password manager + backup)
   - Without it, you can't update your app!

2. **Bundle ID/Package Name**:
   - Cannot be changed after first publish
   - Must be unique across all apps
   - Current: `com.vexcelerate.app`

3. **Version Management**:
   - Increment version code/number for each update
   - Follow semantic versioning (1.0.0, 1.0.1, 1.1.0, etc.)

4. **Testing**:
   - Test on real devices before publishing
   - Use TestFlight (iOS) or Internal Testing (Android) for beta testing

5. **Privacy Policy**:
   - Both stores require a privacy policy URL
   - You can add one to your website: vexcelerate.app/privacy
   - Update PrivacyPolicy.jsx with actual privacy details

---

## 🎯 Next Steps

Since you're on a dev container (Ubuntu), you'll need:

### For iOS:
- Transfer project to a Mac
- OR use a CI/CD service like Codemagic or Bitrise (paid)
- OR use EAS Build (Expo Application Services) - works remotely

### For Android:
- Install Android Studio on any OS (Windows/Mac/Linux)
- Generate signed bundle following steps above
- Upload to Google Play Console

---

## 📞 Support

If you encounter issues:
- **Capacitor Docs**: https://capacitorjs.com/docs
- **iOS Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **Android Material Design**: https://m3.material.io/

---

## ✅ Checklist Before Publishing

- [ ] App builds without errors (`npm run build`)
- [ ] Capacitor sync successful (`npx cap sync`)
- [ ] App icons added (1024x1024 PNG)
- [ ] Splash screens added (2732x2732 PNG)
- [ ] App description finalized
- [ ] Screenshots prepared (3+ per platform)
- [ ] Privacy policy created and live
- [ ] Developer accounts created (Apple + Google)
- [ ] Payment methods added to developer accounts
- [ ] App tested on real devices
- [ ] Version numbers set (1.0.0)
- [ ] Bundle ID confirmed (com.vexcelerate.app)
- [ ] Keystore created and backed up (Android)
- [ ] Team signing configured (iOS)

---

**Good luck with your launch! 🚀**

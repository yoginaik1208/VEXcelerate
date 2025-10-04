# ✅ VEXcelerate Publishing Checklist

Use this checklist to track your progress toward launching on App Store and Google Play.

---

## 📱 Pre-Publishing Setup

### Developer Accounts
- [ ] Create Google Play Console account ($25 one-time)
  - URL: https://play.google.com/console
  - [ ] Payment completed
  - [ ] Account verified
  
- [ ] Create Apple Developer account ($99/year)
  - URL: https://developer.apple.com
  - [ ] Payment completed
  - [ ] Account approved (takes 1-2 days)

### Tools Installation
- [ ] Install Android Studio
  - URL: https://developer.android.com/studio
  - [ ] Gradle sync working
  - [ ] JDK configured
  
- [ ] Install Xcode (Mac only, or skip if using cloud build)
  - From Mac App Store
  - [ ] Command Line Tools installed
  - [ ] CocoaPods installed (`sudo gem install cocoapods`)

---

## 🎨 Assets Preparation

### App Icons & Graphics
- [x] App icon (1024x1024) - ✅ Already included
- [x] Splash screen (2732x2732) - ✅ Already included
- [ ] Take screenshots for stores:
  - [ ] iPhone screenshots (1290x2796 px) - minimum 3
  - [ ] iPad screenshots (2048x2732 px) - minimum 3
  - [ ] Android phone screenshots (1080x1920 px) - minimum 2
  - [ ] Android tablet screenshots (optional)
- [ ] Create feature graphic for Google Play (1024x500 px)

### Content
- [x] App description - ✅ In STORE_LISTING.md
- [x] App keywords - ✅ In STORE_LISTING.md
- [ ] Privacy policy live on website
  - Current URL: https://vexcelerate.app
  - [ ] Update PrivacyPolicy.jsx with actual details
- [ ] Support email active: yoginaik0212@gmail.com

---

## 🔧 Build & Test

### Android Build
- [ ] Run build script: `./build-android.sh`
- [ ] Android Studio opens successfully
- [ ] Gradle sync completes without errors
- [ ] Generate signed bundle (Build → Generate Signed Bundle)
  - [ ] Create keystore file
  - [ ] **CRITICAL: Save keystore file to secure location**
  - [ ] **CRITICAL: Save keystore password to password manager**
  - [ ] Build release bundle (.aab file created)
- [ ] Test on Android device/emulator
  - [ ] App launches correctly
  - [ ] All features work (Timer, Calculator, Analyzer, Tracker)
  - [ ] No crashes or errors

### iOS Build (Mac Required)
- [ ] Run build script: `./build-ios.sh`
- [ ] Xcode opens successfully
- [ ] Pod install completes
- [ ] Configure signing (Signing & Capabilities → Select Team)
- [ ] Archive app (Product → Archive)
- [ ] Test on iPhone/simulator
  - [ ] App launches correctly
  - [ ] All features work
  - [ ] No crashes or errors

---

## 📤 Google Play Publishing

### Play Console Setup
- [ ] Create new app in Play Console
  - App name: VEXcelerate
  - Default language: English (US)
  - App or game: App
  - Free or paid: Free

### App Content
- [ ] Privacy policy URL: https://vexcelerate.app
- [ ] Data safety questionnaire completed
- [ ] Target audience & content
  - Age: 13+ (STEM/Educational content)
- [ ] Content rating questionnaire
  - Complete and get rating (should be "Everyone")
- [ ] Ads declaration: No ads
- [ ] News app: No

### Store Listing
- [ ] App name: VEXcelerate
- [ ] Short description (from STORE_LISTING.md)
- [ ] Full description (from STORE_LISTING.md)
- [ ] App icon uploaded (512x512 PNG)
- [ ] Feature graphic uploaded (1024x500 PNG)
- [ ] Screenshots uploaded (2-8 phone screenshots)
- [ ] Category: Education or Productivity
- [ ] Contact email: yoginaik0212@gmail.com
- [ ] Website: https://vexcelerate.app

### Release
- [ ] Create production release
- [ ] Upload .aab file
- [ ] Release notes: "Initial release of VEXcelerate - VEX IQ team tools"
- [ ] Review and roll out
- [ ] Submit for review

---

## 🍎 App Store Publishing

### App Store Connect Setup
- [ ] Create new app
  - Name: VEXcelerate
  - Primary language: English
  - Bundle ID: com.vexcelerate.app
  - SKU: vexcelerate-001

### App Information
- [ ] Privacy policy URL: https://vexcelerate.app
- [ ] Category: Education or Productivity
- [ ] Age rating: 4+
- [ ] Subtitle: VEX IQ Team Tools & Analytics
- [ ] Keywords (from STORE_LISTING.md)

### Version Information
- [ ] Screenshots uploaded
  - [ ] iPhone 6.7" (3-10 screenshots)
  - [ ] iPhone 6.5" (3-10 screenshots)
  - [ ] iPad Pro 12.9" (3-10 screenshots)
- [ ] Description (from STORE_LISTING.md)
- [ ] What's New: "Initial release"
- [ ] Support URL: https://vexcelerate.app/#support
- [ ] Marketing URL: https://vexcelerate.app

### Build
- [ ] Upload build from Xcode Organizer
- [ ] Select build for this version
- [ ] Export compliance: No encryption

### Submission
- [ ] Review submission checklist
- [ ] Submit for review

---

## 🎯 Post-Submission

### While Waiting for Approval
- [ ] Prepare social media announcements
- [ ] Create launch graphics/videos
- [ ] Notify VEX IQ community groups
- [ ] Prepare press release (optional)

### After Approval
- [ ] Download app from store to verify
- [ ] Test downloaded version
- [ ] Announce launch on social media
- [ ] Monitor reviews
- [ ] Respond to user feedback
- [ ] Plan first update

---

## ⚠️ CRITICAL - DON'T FORGET!

### Android
- [ ] ⚠️ Keystore file backed up in 3 locations
- [ ] ⚠️ Keystore password saved in password manager
- [ ] ⚠️ Key alias name documented

### iOS  
- [ ] ⚠️ Apple Developer account renewal date noted
- [ ] ⚠️ App Store Connect credentials saved
- [ ] ⚠️ Signing certificates backed up

### Both
- [ ] ⚠️ Version numbers documented (start: 1.0.0)
- [ ] ⚠️ Bundle ID confirmed: com.vexcelerate.app
- [ ] ⚠️ Support email monitored: yoginaik0212@gmail.com

---

## 📊 Launch Metrics to Track

After launch, monitor:
- [ ] Download count (daily/weekly)
- [ ] User ratings (aim for 4.5+)
- [ ] User reviews (respond within 24 hours)
- [ ] Crash reports (fix ASAP)
- [ ] Contact form submissions
- [ ] Feature requests

---

## 🚀 You've Got This!

**Current Status:** ⬜ Not Started | 🔄 In Progress | ✅ Complete

**Estimated Time:**
- Android: 2-3 hours + 1-2 days review
- iOS: 3-4 hours + 1-3 days review

**Total Cost:**
- Android: $25 (one-time)
- iOS: $99 (annual)
- **Total: $124 first year**

---

**Good luck with your launch! 🎉 The world is waiting for VEXcelerate! ⚡**

# 📱 Google Play Store Publishing Guide for VEXcelerate

## Prerequisites Checklist

### Required Software (Install on your local machine)
- [ ] **Android Studio** (latest version)
- [ ] **Java JDK 11+** 
- [ ] **Node.js 18+**
- [ ] **Git**

### Required Accounts
- [ ] **Google Play Console Developer Account** ($25 one-time fee)
- [ ] **Gmail account** for Google Play Console

---

## Step 1: Local Machine Setup

### 1.1 Clone Repository to Local Machine
```bash
git clone https://github.com/yoginaik1208/VEXcelerate.git
cd VEXcelerate
npm install
```

### 1.2 Build Production Version
```bash
# Build the web app
npm run build

# Sync with Capacitor
npm run cap:sync
```

### 1.3 Open in Android Studio
```bash
# This will open Android Studio with your project
npx cap open android
```

---

## Step 2: Android Studio Configuration

### 2.1 Wait for Gradle Sync
- **First time takes 5-10 minutes**
- Wait for "Gradle sync finished" message
- Resolve any dependency issues if prompted

### 2.2 Configure App Information
1. Open `android/app/build.gradle`
2. Verify these settings:
```gradle
android {
    namespace "com.vexcelerate.app"
    compileSdk 34
    defaultConfig {
        applicationId "com.vexcelerate.app"
        minSdkVersion 24
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
}
```

### 2.3 Update App Details
1. Open `android/app/src/main/res/values/strings.xml`
2. Ensure app name is correct:
```xml
<string name="app_name">VEXcelerate</string>
<string name="title_activity_main">VEXcelerate</string>
<string name="package_name">com.vexcelerate.app</string>
<string name="custom_url_scheme">com.vexcelerate.app</string>
```

---

## Step 3: Generate Signed Release Bundle

### 3.1 Create Keystore (CRITICAL - Save This!)
1. In Android Studio: **Build → Generate Signed Bundle / APK**
2. Select **Android App Bundle** (recommended for Google Play)
3. Click **Create new...**
4. Fill out keystore information:
   ```
   Key store path: [Choose secure location]/vexcelerate-keystore.jks
   Password: [Create strong password - SAVE THIS!]
   Key alias: vexcelerate-release-key
   Key password: [Create strong password - SAVE THIS!]
   Validity (years): 25
   First and Last Name: [Your name]
   Organizational Unit: VEXcelerate
   Organization: VEXcelerate
   City or Locality: [Your city]
   State or Province: [Your state]
   Country Code: [Your country code]
   ```

### 3.2 Build Release Bundle
1. Select **release** build variant
2. Check both signature versions (V1 and V2)
3. Click **Finish**
4. Wait for build to complete
5. **SAVE YOUR KEYSTORE FILE SAFELY!** You'll need it for all future updates

---

## Step 4: Google Play Console Setup

### 4.1 Create Developer Account
1. Go to [Google Play Console](https://play.google.com/console)
2. Sign in with your Google account
3. Pay the **$25 one-time developer fee**
4. Complete the developer profile

### 4.2 Create New App
1. Click **Create app**
2. Fill out app details:
   ```
   App name: VEXcelerate
   Default language: English (US)
   App or game: App
   Free or paid: Free
   ```
3. Accept Play Console Developer Program Policies
4. Click **Create app**

---

## Step 5: Upload App Bundle

### 5.1 Upload AAB File
1. Go to **Release → Production**
2. Click **Create new release**
3. Upload your `.aab` file (generated in Step 3)
4. Add release notes:
   ```
   VEXcelerate v1.0.0
   
   🏆 The ultimate VEX IQ companion app
   
   Features:
   • Score Analyzer with real 2025-26 season data
   • Mix & Match Calculator with official scoring
   • Data Tracker with charts and CSV export
   • Professional competition timer
   • User account system
   
   Perfect for VEX IQ teams, coaches, and parents!
   ```

---

## Step 6: Complete Store Listing

### 6.1 App Details
1. Go to **Store presence → Main store listing**
2. Fill out all required fields:

**App name:** VEXcelerate

**Short description:**
```
VEX IQ robotics scoring and analysis app for teams, coaches, and parents
```

**Full description:**
```
🏆 VEXcelerate - The Ultimate VEX IQ Companion App

Perfect for VEX IQ teams, coaches, and parents! VEXcelerate provides comprehensive tools for robotics competition success.

🎯 CORE FEATURES:
• Score Analyzer - Real-time team performance analysis with 2025-26 season data
• Mix & Match Calculator - Official VEX IQ scoring with instant calculations  
• Data Tracker - Monthly score tracking with charts and CSV export
• Competition Timer - Precision timing for practice sessions

📊 ANALYSIS TOOLS:
• Live team rankings and statistics
• Performance trends and progress tracking
• Export data for coaches and mentors
• Professional charts and visualizations

👥 USER-FRIENDLY DESIGN:
• Kid-friendly interface designed for young competitors
• Intuitive navigation for parents and coaches
• Professional tools for serious teams
• Works offline - no internet required for calculations

🔧 BUILT FOR COMPETITION:
• Official 2025-2026 season scoring rules
• Real VEX tournament data integration
• Accurate point calculations
• Performance consistency tracking

Whether you're a first-year team or championship contenders, VEXcelerate gives you the competitive edge with professional analysis tools in a user-friendly package.

Download now and accelerate your VEX IQ success! 🚀
```

### 6.2 Graphics and Images
**You'll need to create/provide:**
- [ ] **App icon:** 512 x 512 pixels (PNG)
- [ ] **Feature graphic:** 1024 x 500 pixels
- [ ] **Screenshots:** At least 2, up to 8 (phone screenshots)
- [ ] **Tablet screenshots:** At least 1 (if supporting tablets)

### 6.3 Categorization
- **App category:** Education
- **Content rating:** Everyone
- **Tags:** Add relevant tags like "education", "robotics", "VEX", "competition"

---

## Step 7: App Content and Policies

### 7.1 Content Rating
1. Go to **Policy → App content**
2. Complete content rating questionnaire
3. Select appropriate ratings (should be "Everyone" for VEXcelerate)

### 7.2 Target Audience
1. Set target age group: **8-17 years** (VEX IQ participants)
2. Appeal to children: **Yes, my app appeals to children**

### 7.3 Privacy Policy (if needed)
If your app collects any user data, you'll need a privacy policy.
For VEXcelerate (using only local storage), this may not be required.

---

## Step 8: Release Management

### 8.1 Internal Testing (Optional but Recommended)
1. Create internal testing track
2. Add test users (your email)
3. Test the app thoroughly
4. Fix any issues and upload new version if needed

### 8.2 Production Release
1. Go to **Release → Production**
2. Review all sections (green checkmarks)
3. Click **Start rollout to production**
4. Confirm release

---

## Step 9: Post-Submission

### 9.1 Review Process
- **Review time:** Typically 1-3 days for new apps
- **Status:** Monitor in Play Console
- **Communication:** Google will email about approval/rejection

### 9.2 After Approval
- [ ] App goes live on Google Play Store
- [ ] Monitor downloads and reviews
- [ ] Respond to user feedback
- [ ] Plan future updates

---

## Common Issues and Solutions

### Build Issues
- **Gradle sync failed:** Update Android Studio and Gradle
- **Missing dependencies:** Run `npx cap sync` again
- **Build errors:** Check Android SDK versions

### Upload Issues
- **Bundle format error:** Ensure you built AAB (not APK)
- **Signature issues:** Verify keystore configuration
- **Version conflicts:** Increase versionCode in build.gradle

### Review Rejection
- **Policy violations:** Review Google Play policies
- **Missing information:** Complete all required store listing sections
- **Technical issues:** Test app thoroughly before submission

---

## Important Notes

### 🔐 Security
- **NEVER lose your keystore file!** Store it securely
- **Backup keystore passwords** in a secure location
- **All future updates must use the same keystore**

### 📱 Versioning
- **versionCode:** Integer that must increase with each update
- **versionName:** User-visible version (1.0.0, 1.1.0, etc.)

### 💰 Costs
- **Developer account:** $25 one-time fee
- **Publishing:** Free for free apps
- **Maintenance:** Regular updates recommended

---

## Timeline Estimate

- **Setup and build:** 2-3 hours (first time)
- **Store listing completion:** 1-2 hours  
- **Google review:** 1-3 days
- **Total time to live:** 3-5 days

---

## Next Steps After Publishing

1. **Monitor performance** in Play Console
2. **Respond to user reviews**
3. **Plan feature updates** for VEX season changes
4. **Marketing and promotion** to VEX community
5. **Analytics tracking** for user engagement

---

## Support Resources

- **Google Play Console Help:** https://support.google.com/googleplay/android-developer
- **Android Developer Docs:** https://developer.android.com/guide
- **Capacitor Docs:** https://capacitorjs.com/docs/android

---

*Good luck with your Google Play Store launch! VEXcelerate is going to be amazing for the VEX IQ community!* 🚀
# iOS Deployment Guide for ScissHER

## Prerequisites
1. **macOS** - Required for iOS development
2. **Xcode** (latest version from Mac App Store)
3. **CocoaPods** - Install with: `sudo gem install cocoapods`
4. **Apple Developer Account** - $99/year

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Web App
```bash
npm run build
```

### 3. Initialize iOS Platform
```bash
npx cap add ios
```

### 4. Sync Changes to iOS
```bash
npx cap sync ios
```

### 5. Open in Xcode
```bash
npx cap open ios
```

## Xcode Configuration

### Required Changes in Xcode:
1. **Bundle Identifier**: Change from `com.scissher.app` to your unique identifier
   - Format: `com.yourcompany.scissher`
   
2. **Team**: Select your Apple Developer team
   - Xcode > Signing & Capabilities > Team

3. **App Icons**: Add icon set
   - Navigate to: `ios/App/App/Assets.xcassets/AppIcon.appiconset`
   - You'll need icons in sizes: 1024x1024, 180x180, 120x120, 87x87, 80x80, 60x60, 58x58, 40x40, 29x29, 20x20

4. **Launch Screen**: Customize splash screen
   - Edit: `ios/App/App/Base.lproj/LaunchScreen.storyboard`

5. **Privacy Permissions**: Add to Info.plist if needed
   - Camera: `NSCameraUsageDescription`
   - Photo Library: `NSPhotoLibraryUsageDescription`
   - Location: `NSLocationWhenInUseUsageDescription`

## Important Security Notes

⚠️ **GEMINI_API_KEY Security Issue**:
Your app currently exposes the Gemini API key in the client code. For production:

1. **Create a backend API** to handle Gemini requests
2. **Use environment-specific keys** 
3. **Implement API key restrictions** in Google Cloud Console
4. **Add rate limiting** to prevent abuse

### Recommended Architecture:
```
iOS App → Your Backend API → Gemini API
```

## Build for Testing

### TestFlight (Internal Testing):
1. Archive the app in Xcode
2. Upload to App Store Connect
3. Add internal testers
4. Testers install via TestFlight app

### TestFlight (External Testing):
- Requires Apple review
- Can add up to 10,000 external testers

## App Store Submission Checklist

### Required Assets:
- [ ] App icon (1024x1024 PNG)
- [ ] Screenshots for all device sizes
- [ ] App preview video (optional but recommended)

### Required Information:
- [ ] App name and subtitle
- [ ] Description (4000 char max)
- [ ] Keywords
- [ ] Support URL
- [ ] Marketing URL (optional)
- [ ] Privacy policy URL (REQUIRED)
- [ ] Category selection
- [ ] Age rating

### App Store Review Requirements:
- [ ] Demo account credentials (if app requires login)
- [ ] Review notes explaining features
- [ ] All features must be functional
- [ ] No placeholder content
- [ ] Compliant with App Store Guidelines

### Privacy & Legal:
- [ ] Privacy policy published online
- [ ] Terms of service (if applicable)
- [ ] Data collection disclosure
- [ ] Age-appropriate content rating

## Common Issues & Solutions

### Build Fails:
- Run `pod install` in `ios/App` directory
- Clean build folder: Xcode > Product > Clean Build Folder
- Update CocoaPods: `pod repo update`

### App Crashes on Launch:
- Check console logs in Xcode
- Verify all CDN resources load correctly
- Test on different iOS versions

### Capacitor Issues:
- Sync changes: `npm run sync`
- Rebuild: `npm run build && npx cap sync`

## Useful Commands

```bash
# Build and sync
npm run ios

# Just sync without building
npm run sync

# Update Capacitor
npm install @capacitor/core@latest @capacitor/ios@latest @capacitor/cli@latest

# Clean iOS build
cd ios/App && pod deintegrate && pod install
```

## Next Steps

1. **Create Backend API** for secure Gemini key handling
2. **Design App Icons** (hire designer or use tools like Canva)
3. **Write Privacy Policy** (use templates or legal service)
4. **Set up App Store Connect** account
5. **Prepare Marketing Materials** (screenshots, description, video)
6. **Beta Test** with TestFlight
7. **Submit for Review**

## Resources

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)

## Timeline Estimate

- Setup & Configuration: 1-2 days
- Icon & Asset Creation: 2-3 days
- Backend API Development: 1-2 weeks
- Testing: 1 week
- App Store Materials: 2-3 days
- Review Process: 1-7 days (after submission)

**Total: 3-4 weeks minimum**

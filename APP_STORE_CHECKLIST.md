# App Store Launch Checklist

Complete checklist for launching ScissHER on the Apple App Store.

## Phase 1: Backend Setup ⚙️

- [ ] Install backend dependencies (`cd server && npm install`)
- [ ] Create `server/.env` file with Gemini API key
- [ ] Test backend locally (`npm run dev`)
- [ ] Deploy backend to production (Railway/Heroku/DigitalOcean)
- [ ] Get production backend URL (e.g., `https://api.scissher.app`)
- [ ] Test production backend health endpoint
- [ ] Configure rate limiting and CORS for production

**Estimated Time**: 2-3 hours

## Phase 2: Frontend Configuration 🎨

- [ ] Create `.env.local` with development API URL
- [ ] Create `.env.production` with production API URL
- [ ] Update `apiService` to use backend instead of direct Gemini calls
- [ ] Test frontend with backend locally
- [ ] Verify all features work with backend API
- [ ] Build production frontend (`npm run build`)

**Estimated Time**: 2-4 hours

## Phase 3: iOS Setup 📱

### Initial Setup
- [ ] Ensure you have macOS with Xcode installed
- [ ] Install CocoaPods (`sudo gem install cocoapods`)
- [ ] Install all frontend dependencies (`npm install`)
- [ ] Build web app (`npm run build`)
- [ ] Add iOS platform (`npx cap add ios`)
- [ ] Open in Xcode (`npx cap open ios`)

### Xcode Configuration
- [ ] Select your development team in Signing & Capabilities
- [ ] Change Bundle Identifier from `com.scissher.app` to your unique ID
- [ ] Update app display name if needed
- [ ] Configure build settings

**Estimated Time**: 2-3 hours

## Phase 4: App Icons & Assets 🎨

- [ ] Design 1024x1024 master icon (hire designer or DIY)
- [ ] Generate all required icon sizes (use appicon.co)
- [ ] Add icons to Xcode project (`ios/App/App/Assets.xcassets/AppIcon.appiconset`)
- [ ] Design launch screen (splash screen)
- [ ] Add launch screen to Xcode
- [ ] Test icons on actual device (not just simulator)

**Resources**:
- Fiverr: $25-$200 for professional icon
- Canva: Free DIY option
- appicon.co: Free icon size generator

**Estimated Time**: 2-3 days (including designer turnaround)

## Phase 5: Legal & Privacy 📄

- [ ] Customize [PRIVACY_POLICY.md](PRIVACY_POLICY.md) with your information
- [ ] Add support email to privacy policy
- [ ] Add business address to privacy policy
- [ ] Host privacy policy online (required by Apple)
- [ ] Create Terms of Service (optional but recommended)
- [ ] Review for legal compliance (consult lawyer if possible)
- [ ] Add privacy policy link to app settings

**Estimated Time**: 1-2 days

## Phase 6: Apple Developer Setup 🍎

- [ ] Create Apple Developer account ($99/year)
- [ ] Verify account and complete registration
- [ ] Accept developer agreements
- [ ] Set up App Store Connect access
- [ ] Create App ID in Apple Developer portal
- [ ] Create App Store listing in App Store Connect

**Estimated Time**: 1-2 hours (plus account approval time)

## Phase 7: App Store Connect 🏪

### App Information
- [ ] App name: "ScissHER"
- [ ] Subtitle (30 chars): e.g., "Connect with Queer Women"
- [ ] Privacy policy URL
- [ ] Category: Social Networking
- [ ] Secondary category: Lifestyle
- [ ] Content rights declaration

### App Description
- [ ] Write compelling description (4000 char max)
- [ ] Highlight key features
- [ ] Include screenshots in description text
- [ ] Keywords for App Store search (100 chars)

### Screenshots
Required for each device size:
- [ ] iPhone 6.7" (Pro Max) - 3-10 screenshots
- [ ] iPhone 6.5" (Plus) - 3-10 screenshots
- [ ] iPhone 5.5" - 3-10 screenshots
- [ ] iPad Pro (12.9") - 3-10 screenshots (if supporting iPad)
- [ ] iPad Pro (12.9") 2nd gen - 3-10 screenshots

**Tools**: Use Xcode simulator or actual devices to capture screenshots

### App Preview Video (Optional)
- [ ] Create 15-30 second app preview video
- [ ] Must show actual app functionality
- [ ] Same sizes as screenshots required

**Estimated Time**: 2-3 days

## Phase 8: Build & Submit 🚀

### Create Archive
- [ ] Update version number in Xcode
- [ ] Select "Any iOS Device" as build target
- [ ] Product → Archive in Xcode
- [ ] Wait for archive to complete
- [ ] Validate archive (checks for errors)

### Upload to App Store Connect
- [ ] Distribute App → App Store Connect
- [ ] Select app and distribution options
- [ ] Upload archive
- [ ] Wait for processing (can take 10-30 minutes)

### Submit for Review
- [ ] Select uploaded build in App Store Connect
- [ ] Fill out "What's New in This Version"
- [ ] Add demo account (if app requires login)
- [ ] Add review notes explaining features
- [ ] Answer export compliance questions
- [ ] Answer advertising ID questions
- [ ] Submit for review

**Estimated Time**: 2-4 hours

## Phase 9: Testing 🧪

### Pre-Submission Testing
- [ ] Test on iPhone (not just simulator)
- [ ] Test on iPad (if supporting)
- [ ] Test all user flows (signup, login, matching, etc.)
- [ ] Test with poor network conditions
- [ ] Test offline behavior
- [ ] Test push notifications (if implemented)
- [ ] Test in-app purchases (if implemented)
- [ ] Test on different iOS versions (14+)

### TestFlight Beta Testing (Recommended)
- [ ] Upload build to TestFlight
- [ ] Add internal testers (your team)
- [ ] Gather feedback
- [ ] Fix critical bugs
- [ ] Add external testers (optional)
- [ ] Iterate based on feedback

**Estimated Time**: 1 week

## Phase 10: App Review 📋

### Timeline
- **Submission**: 30 minutes
- **Waiting for Review**: 24-48 hours typically
- **In Review**: 1-3 days
- **Total**: 2-7 days on average

### Common Rejection Reasons
- Missing privacy policy
- Broken features or crashes
- Placeholder content
- Login required without demo account
- Misleading screenshots
- Incomplete metadata

### If Rejected
- [ ] Read rejection reason carefully
- [ ] Fix the issue
- [ ] Respond to App Review team (if needed)
- [ ] Resubmit with explanation

**Estimated Time**: 2-7 days

## Phase 11: Launch Day 🎉

- [ ] Monitor crash reports in Xcode Organizer
- [ ] Monitor reviews in App Store Connect
- [ ] Respond to user reviews
- [ ] Track downloads and analytics
- [ ] Monitor backend server performance
- [ ] Watch for unexpected API costs

### Post-Launch
- [ ] Plan first update (fix bugs, add features)
- [ ] Gather user feedback
- [ ] Monitor App Store reviews
- [ ] Update marketing materials

## Critical Security Checklist 🔒

- [ ] Gemini API key is ONLY in backend, never in frontend
- [ ] Backend deployed with HTTPS
- [ ] Environment variables properly configured
- [ ] Rate limiting enabled on backend
- [ ] CORS configured with specific origins (not *)
- [ ] No sensitive data in Git repository
- [ ] `.env` files in `.gitignore`
- [ ] Google Cloud API restrictions configured

## Cost Breakdown 💰

### One-Time Costs
- Apple Developer Account: $99/year
- App Icon Design: $25-$200 (or free with Canva)
- Legal Review (optional): $500-$2000

### Monthly Costs
- Backend Hosting: $5-$20/month
- Gemini API: Pay per use (starts free)
- Domain Name (optional): $12/year

### Total First Year
**Minimum**: ~$200  
**Recommended**: $500-$1000 (with professional assets)

## Timeline Summary ⏱️

| Phase | Time |
|-------|------|
| Backend Setup | 2-3 hours |
| Frontend Config | 2-4 hours |
| iOS Setup | 2-3 hours |
| App Icons | 2-3 days |
| Legal/Privacy | 1-2 days |
| Apple Developer | 1-2 hours |
| App Store Connect | 2-3 days |
| Build & Submit | 2-4 hours |
| Testing | 1 week |
| App Review | 2-7 days |
| **TOTAL** | **3-4 weeks** |

## Resources & Documentation 📚

Internal Docs:
- [README.md](README.md) - Main project documentation
- [IOS_DEPLOYMENT.md](IOS_DEPLOYMENT.md) - Detailed iOS guide
- [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) - Environment configuration
- [APP_ICON_GUIDE.md](APP_ICON_GUIDE.md) - Icon design guide
- [PRIVACY_POLICY.md](PRIVACY_POLICY.md) - Privacy policy template
- [server/README.md](server/README.md) - Backend API docs

External Resources:
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Capacitor iOS Docs](https://capacitorjs.com/docs/ios)

## Need Help? 🆘

Common issues and solutions:
1. **Build fails**: Clean build folder in Xcode
2. **Pod install fails**: Run `pod repo update`
3. **CORS errors**: Check ALLOWED_ORIGINS in backend
4. **API not working**: Verify backend is running
5. **Icons not showing**: Check all sizes are provided

## Current Status

Track your progress:
- [ ] Phase 1: Backend Setup
- [ ] Phase 2: Frontend Configuration
- [ ] Phase 3: iOS Setup
- [ ] Phase 4: App Icons & Assets
- [ ] Phase 5: Legal & Privacy
- [ ] Phase 6: Apple Developer Setup
- [ ] Phase 7: App Store Connect
- [ ] Phase 8: Build & Submit
- [ ] Phase 9: Testing
- [ ] Phase 10: App Review
- [ ] Phase 11: Launch!

---

**You've got this! 🚀** Follow this checklist step by step, and you'll have ScissHER live on the App Store in 3-4 weeks.

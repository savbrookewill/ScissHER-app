<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ScissHER - Intentional Connections for Queer Women

A modern dating and social app designed specifically for queer women, featuring AI-powered matching, events, and community features.

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- (For iOS) macOS with Xcode
- Google Gemini API key

### Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy example file
   cp .env.example .env.local
   
   # Edit .env.local and add:
   VITE_API_URL=http://localhost:3001
   ```

3. **Set up backend server:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit server/.env and add your GEMINI_API_KEY
   ```

4. **Run the application:**
   
   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to http://localhost:3000

## 📱 iOS Development

To run on iOS:

```bash
# Build the web app
npm run build

# Add iOS platform (first time only)
npx cap add ios

# Open in Xcode
npm run ios
```

For detailed iOS setup, see [IOS_DEPLOYMENT.md](IOS_DEPLOYMENT.md)

## 📚 Documentation

- **[iOS Deployment Guide](IOS_DEPLOYMENT.md)** - Complete guide for App Store submission
- **[Environment Setup](ENVIRONMENT_SETUP.md)** - Environment variables and configuration
- **[App Icon Guide](APP_ICON_GUIDE.md)** - Design and implement app icons
- **[Privacy Policy](PRIVACY_POLICY.md)** - Privacy policy template (customize before use)
- **[Server README](server/README.md)** - Backend API documentation

## 🏗️ Project Structure

```
ScissHER-app/
├── components/          # React components
│   ├── AuthView.tsx
│   ├── ProfileView.tsx
│   ├── CalendarView.tsx
│   └── ...
├── services/           # API services
│   └── api.ts         # Backend API client
├── server/            # Backend API
│   ├── src/
│   │   ├── server.ts
│   │   └── routes/
│   └── package.json
├── App.tsx            # Main app component
├── constants.tsx      # App constants
├── types.ts          # TypeScript types
└── index.html        # Entry HTML

```

## 🔑 Key Features

- **Authentication** - Secure login and signup
- **Profile Management** - Customizable user profiles
- **AI-Powered Matching** - Intelligent compatibility matching
- **Events Calendar** - Community events and meetups
- **Live Video** - Speed dating and video features
- **Messaging** - Secure in-app messaging
- **Discovery Feed** - Swipe-based user discovery
- **Premium Features** - Subscription-based enhancements

## 🔒 Security

- **API Keys**: Stored securely in backend, never exposed to client
- **HTTPS**: All production traffic encrypted
- **Rate Limiting**: Protection against API abuse
- **CORS**: Strict origin policies
- **Helmet**: Security headers on all responses

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Capacitor (for iOS/Android)

### Backend
- Node.js
- Express
- TypeScript
- Google Gemini AI

## 📦 Available Scripts

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run ios       # Build and open in Xcode
npm run sync      # Sync Capacitor platforms
```

### Backend
```bash
cd server
npm run dev       # Start development server
npm run build     # Build TypeScript
npm start         # Run production build
```

## 🚀 Deployment

### Backend Deployment
Deploy to Railway, Heroku, or DigitalOcean. See [server/README.md](server/README.md) for details.

### iOS Deployment
See [IOS_DEPLOYMENT.md](IOS_DEPLOYMENT.md) for complete App Store submission guide.

## ⚠️ Before Production Launch

- [ ] Deploy backend API to secure server
- [ ] Update `VITE_API_URL` with production backend URL
- [ ] Create and upload app icons (see [APP_ICON_GUIDE.md](APP_ICON_GUIDE.md))
- [ ] Customize and publish privacy policy
- [ ] Set up Apple Developer account ($99/year)
- [ ] Configure code signing in Xcode
- [ ] Test on physical iOS devices
- [ ] Submit for App Store review

## 🤝 Contributing

This is a private project. For issues or suggestions, contact the development team.

## 📄 License

Proprietary - All rights reserved

## 🔗 Links

- AI Studio: https://ai.studio/apps/drive/1z9Nt1A1p3dw_yuiE2wnYbOUbxb8vJO87
- Repository: https://github.com/savbrookewill/ScissHER-app

## 📞 Support

For technical support or questions:
- Review documentation in this repository
- Check [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) for configuration issues
- See [IOS_DEPLOYMENT.md](IOS_DEPLOYMENT.md) for iOS-specific problems

---

Built with ❤️ for the queer women community

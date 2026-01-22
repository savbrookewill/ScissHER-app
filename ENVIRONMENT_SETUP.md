# Environment Configuration Guide

## Overview
ScissHER uses environment variables to manage different configurations for development, staging, and production environments.

## Frontend Environment Variables

### Location: `.env.local` (create this file)

```bash
# Backend API URL
VITE_API_URL=http://localhost:3001

# For iOS simulator (use your machine's IP)
# VITE_API_URL=http://192.168.1.XXX:3001

# For production
# VITE_API_URL=https://api.scissher.app
```

### How to Create:
```bash
# In the root directory
cp .env.example .env.local
# Then edit .env.local with your values
```

## Backend Environment Variables

### Location: `server/.env` (create this file)

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Gemini API Key (REQUIRED)
GEMINI_API_KEY=your_actual_api_key_here

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,capacitor://localhost,ionic://localhost

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### How to Create:
```bash
cd server
cp .env.example .env
# Then edit .env with your actual API key
```

## Getting Your Gemini API Key

1. Go to https://aistudio.google.com/
2. Sign in with Google account
3. Click "Get API Key"
4. Copy the key
5. Paste into `server/.env`:
   ```
   GEMINI_API_KEY=AIzaSy...
   ```

## Environment-Specific Configurations

### Development (Local)
```bash
# Frontend .env.local
VITE_API_URL=http://localhost:3001

# Backend server/.env
NODE_ENV=development
PORT=3001
```

### iOS Simulator
```bash
# Frontend .env.local
# Replace XXX.XXX.X.XXX with your computer's local IP
VITE_API_URL=http://192.168.1.100:3001
```

**To find your IP:**
- Mac: System Settings → Network → Wi-Fi → Details
- Or run: `ifconfig | grep "inet " | grep -v 127.0.0.1`

### Production
```bash
# Frontend .env.production
VITE_API_URL=https://api.scissher.app

# Backend server/.env
NODE_ENV=production
PORT=80
ALLOWED_ORIGINS=https://scissher.app,capacitor://localhost
```

## Running the Application

### Development Mode (Two terminals)

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
```

### iOS Development

**Terminal 1 - Backend (use your IP):**
```bash
cd server
npm run dev
# Server runs on http://192.168.1.100:3001
```

**Terminal 2 - Build & Run iOS:**
```bash
# Update .env.local with: VITE_API_URL=http://192.168.1.100:3001
npm run build
npx cap sync ios
npx cap open ios
# Then run in Xcode
```

## Security Notes

### ⚠️ NEVER COMMIT THESE FILES:
- `.env`
- `.env.local`
- `.env.production`
- `server/.env`

### ✅ Always Included in `.gitignore`:
```
.env
.env.local
.env.production
server/.env
```

### 🔐 Production Security Checklist:
- [ ] API keys are in environment variables (not code)
- [ ] Backend is deployed on secure server (HTTPS)
- [ ] CORS is configured with specific origins (not *)
- [ ] Rate limiting is enabled
- [ ] API keys have usage restrictions in Google Cloud Console

## Deployment Platforms

### Backend Options:
1. **Railway** - https://railway.app (easiest, $5/month)
2. **Heroku** - https://heroku.com
3. **DigitalOcean App Platform** - https://digitalocean.com
4. **AWS Elastic Beanstalk**
5. **Google Cloud Run**

### Setting Environment Variables on Railway:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Set environment variables
railway variables set GEMINI_API_KEY=your_key_here
railway variables set NODE_ENV=production
railway variables set ALLOWED_ORIGINS=capacitor://localhost
```

### After Deployment:
1. Get your backend URL (e.g., `https://your-app.railway.app`)
2. Update frontend `.env.production`:
   ```
   VITE_API_URL=https://your-app.railway.app
   ```
3. Rebuild iOS app with production config

## Testing Configuration

### Verify Backend Connection:
```bash
# Test health endpoint
curl http://localhost:3001/health

# Should return:
# {"status":"ok","timestamp":"..."}
```

### Verify Frontend Can Reach Backend:
```javascript
// In browser console
fetch('http://localhost:3001/health')
  .then(r => r.json())
  .then(console.log)
```

## Common Issues

### "CORS Error"
**Problem**: Frontend can't reach backend  
**Solution**: 
1. Check `ALLOWED_ORIGINS` includes your frontend URL
2. For iOS: add `capacitor://localhost` and `ionic://localhost`

### "API key not configured"
**Problem**: Backend can't access Gemini  
**Solution**: 
1. Check `server/.env` has `GEMINI_API_KEY=...`
2. Restart backend server after adding key

### "Connection refused" on iOS
**Problem**: iOS simulator can't reach localhost  
**Solution**: 
1. Use your computer's IP instead: `http://192.168.1.100:3001`
2. Update `.env.local` with IP address
3. Rebuild: `npm run build && npx cap sync ios`

### "Network request failed"
**Problem**: Backend not running  
**Solution**: Make sure backend server is running in separate terminal

## Quick Reference

```bash
# Start development
cd server && npm run dev &  # Backend in background
npm run dev                 # Frontend

# Build for production
npm run build

# iOS development
npm run ios

# Check configuration
cat .env.local              # Frontend config
cat server/.env             # Backend config
```

## Next Steps

1. ✅ Create `.env.local` in root directory
2. ✅ Create `server/.env` with your Gemini API key
3. ✅ Start backend server
4. ✅ Start frontend
5. ✅ Test in browser
6. ✅ Test on iOS simulator
7. ✅ Deploy backend to production
8. ✅ Update frontend with production API URL
9. ✅ Submit to App Store

---

**Need help?** Refer to:
- [IOS_DEPLOYMENT.md](IOS_DEPLOYMENT.md) - iOS setup guide
- [server/README.md](server/README.md) - Backend documentation

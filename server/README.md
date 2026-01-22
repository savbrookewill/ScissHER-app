# ScissHER Backend API

Secure backend API server for the ScissHER mobile application. Handles Gemini AI requests to keep API keys secure.

## Features

- 🔒 Secure API key management
- 🚀 Express.js server with TypeScript
- 🛡️ Security headers with Helmet
- 🔄 CORS configuration for mobile apps
- ⏱️ Rate limiting to prevent abuse
- 🤖 Google Gemini AI integration

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Google Gemini API key

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env and add your Gemini API key
nano .env
```

Required variables in `.env`:
```bash
PORT=3001
NODE_ENV=development
GEMINI_API_KEY=your_actual_gemini_api_key_here
ALLOWED_ORIGINS=http://localhost:3000,capacitor://localhost,ionic://localhost
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Run Development Server
```bash
npm run dev
```

Server will start on http://localhost:3001

### 4. Test the API
```bash
# Health check
curl http://localhost:3001/health

# Generate content (requires POST with JSON body)
curl -X POST http://localhost:3001/api/gemini/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Say hello!"}'
```

## API Endpoints

### Health Check
```
GET /health
```
Returns server status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-22T..."
}
```

### Generate Content
```
POST /api/gemini/generate
```
Generate content using Gemini AI.

**Request Body:**
```json
{
  "prompt": "Your prompt here",
  "model": "gemini-2.0-flash-exp"  // optional
}
```

**Response:**
```json
{
  "text": "Generated response..."
}
```

### Chat
```
POST /api/gemini/chat
```
Multi-turn conversation with Gemini AI.

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "parts": "Hello" },
    { "role": "model", "parts": "Hi there!" },
    { "role": "user", "parts": "How are you?" }
  ],
  "model": "gemini-2.0-flash-exp"  // optional
}
```

**Response:**
```json
{
  "text": "I'm doing well, thank you!"
}
```

## Project Structure

```
server/
├── src/
│   ├── server.ts           # Main server file
│   └── routes/
│       └── gemini.ts       # Gemini API routes
├── .env.example            # Example environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Scripts

```bash
# Development with auto-reload
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Security Features

### Helmet
Adds security headers to all responses:
- XSS protection
- Content Security Policy
- HSTS
- And more...

### CORS
Configured to only allow requests from:
- Your frontend (localhost:3000 in dev)
- Capacitor apps (capacitor://localhost)
- Ionic apps (ionic://localhost)

### Rate Limiting
Default limits:
- 100 requests per 15 minutes per IP
- Configurable via environment variables

### API Key Protection
- Gemini API key stored in environment variable
- Never exposed to client
- All AI requests proxied through backend

## Deployment

### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and initialize
railway login
railway init

# Set environment variables
railway variables set GEMINI_API_KEY=your_key
railway variables set NODE_ENV=production
railway variables set ALLOWED_ORIGINS=capacitor://localhost

# Deploy
railway up
```

### Option 2: Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create scissher-api

# Set environment variables
heroku config:set GEMINI_API_KEY=your_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Option 3: DigitalOcean App Platform
1. Connect your GitHub repository
2. Select the `server` folder as root
3. Set environment variables in dashboard
4. Deploy

### Environment Variables for Production
```bash
NODE_ENV=production
PORT=80  # or whatever your host provides
GEMINI_API_KEY=your_key_here
ALLOWED_ORIGINS=capacitor://localhost,ionic://localhost,https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Monitoring

### Logs
In development, logs appear in console.

In production, configure log aggregation:
- Railway: Built-in logging
- Heroku: `heroku logs --tail`
- DigitalOcean: View in dashboard

### Health Checks
Most platforms support health checks at `/health` endpoint.

## Troubleshooting

### "API key not configured"
**Problem**: GEMINI_API_KEY not set  
**Solution**: Check your `.env` file or environment variables

### "Not allowed by CORS"
**Problem**: Frontend origin not in ALLOWED_ORIGINS  
**Solution**: Add your frontend URL to ALLOWED_ORIGINS

### "Too many requests"
**Problem**: Rate limit exceeded  
**Solution**: Increase limits in environment variables or wait

### Port already in use
**Problem**: Port 3001 is occupied  
**Solution**: Change PORT in `.env` or kill the process:
```bash
lsof -ti:3001 | xargs kill -9
```

## Development Tips

### Auto-reload on changes
Uses `tsx watch` for instant reload during development.

### Type checking
TypeScript provides type safety. Check types with:
```bash
npx tsc --noEmit
```

### Testing API with curl
```bash
# Generate content
curl -X POST http://localhost:3001/api/gemini/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Tell me a joke"}'

# Chat
curl -X POST http://localhost:3001/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "parts": "Hello"}
    ]
  }'
```

## License

Same as main project.

## Support

For issues or questions, refer to:
- [Main README](../README.md)
- [Environment Setup Guide](../ENVIRONMENT_SETUP.md)
- [iOS Deployment Guide](../IOS_DEPLOYMENT.md)

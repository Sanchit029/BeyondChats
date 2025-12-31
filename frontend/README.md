# BeyondChat Frontend

## Deployment Instructions for Vercel

### 1. Environment Variables
Set in Vercel dashboard:
```
VITE_API_URL=https://beyondchat-sr2q.onrender.com/api
```

### 2. Build Settings
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. Configuration
- **Root Directory:** frontend
- **Node Version:** 18.x

### Local Development
```bash
npm install
npm run dev
```

The app will run on http://localhost:5173

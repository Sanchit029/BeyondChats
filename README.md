#  BeyondChat Article Enhancer

A full-stack application that scrapes articles from BeyondChats blog, enhances them using Google's Gemini AI, and displays them in a beautiful side-by-side comparison view.

##  Live Demo

- **Frontend (React + Vite):** [https://beyond-chat-nine.vercel.app](https://beyond-chat-nine.vercel.app/)
- **Backend API (Express):** [https://beyondchat-sr2q.onrender.com](https://beyondchat-sr2q.onrender.com)

##  Features

-  **Automated Scraping** - Fetches articles from BeyondChats blog
-  **AI Enhancement** - Uses Gemini 2.5 Flash to improve article quality
-  **Google Search Integration** - Adds context using real-time search results
-  **Side-by-Side Comparison** - View original vs enhanced content
-  **Modern UI** - Built with React, Tailwind CSS v4, and smooth animations
-  **Responsive Design** - Works seamlessly on mobile and desktop

##  Architecture

```
┌─────────────────┐
│   Frontend      │ (Vercel)
│  React + Vite   │ https://beyond-chat-nine.vercel.app
└────────┬────────┘
         │
         │ REST API
         │
┌────────▼────────┐
│    Backend      │ (Render)
│ Express + Node  │ https://beyondchat-sr2q.onrender.com
└────────┬────────┘
         │
         │ MongoDB
         │
┌────────▼────────┐
│   MongoDB Atlas │
│   (Database)    │
└─────────────────┘

┌─────────────────┐
│   Enhancer      │ (Local Script)
│ Gemini AI + Web │ Run manually to enhance articles
└─────────────────┘
```

##  Tech Stack

### Backend
- **Node.js + Express** - REST API server
- **MongoDB Atlas** - Cloud database
- **Cheerio** - HTML parsing for web scraping
- **Axios** - HTTP requests

### Frontend
- **React 18** - UI framework
- **Vite 5** - Build tool and dev server
- **Tailwind CSS v4** - Styling with @tailwindcss/vite plugin
- **Axios** - API client

### Enhancer (Local Script)
- **Google Gemini 1.5 Flash** - AI content enhancement
- **Puppeteer** - Google search automation
- **Cheerio** - HTML parsing

##  Why Node.js Instead of Laravel?

1. **Unified Language** - JavaScript across frontend, backend, and enhancer
2. **AI Integration** - Easier to work with Gemini AI SDK in Node.js
3. **Real-time Processing** - Better for handling async operations
4. **Modern Ecosystem** - Rich npm packages for scraping and AI
5. **Developer Experience** - Faster iteration and familiar tooling

##  Local Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Google Gemini API key

### 1. Clone Repository
```bash
git clone https://github.com/Sanchit029/BeyondChats.git
cd BeyondChat
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "PORT=5001
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development" > .env

# Start backend
npm start
```

Backend will run on `http://localhost:5001`

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5001/api" > .env

# Start frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Enhancer Setup (Optional)
```bash
cd enhancer
npm install

# Create .env file
echo "API_URL=http://localhost:5001/api
GEMINI_API_KEY=your_gemini_api_key" > .env

# Run enhancer
npm start
```

##  API Endpoints

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Scraping
- `POST /api/articles/scrape` - Scrape articles from BeyondChats blog
- `DELETE /api/articles/all` - Delete all articles

### Example Usage
```bash
# Scrape articles
curl -X POST https://beyondchat-sr2q.onrender.com/api/articles/scrape

# Get all articles
curl https://beyondchat-sr2q.onrender.com/api/articles
```

##  Environment Variables

### Backend (`.env`)
```env
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/beyondchat
NODE_ENV=production
FRONTEND_URL=https://beyond-chat-nine.vercel.app
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5001/api
```

### Enhancer (`.env`)
```env
API_URL=http://localhost:5001/api
GEMINI_API_KEY=your_gemini_api_key_here
```

##  How It Works

1. **Scraping** - Backend fetches latest articles from BeyondChats blog
2. **Storage** - Articles stored in MongoDB with metadata
3. **Enhancement** - Run enhancer script to improve articles with AI
4. **Display** - Frontend shows original vs enhanced side-by-side

##  Screenshots

![Article List View](ArticleView.png)
*Grid view of all scraped articles with enhancement status*

![Comparison View](ComparisonView.png)
*Side-by-side comparison of original and AI-enhanced content*

##  Known Issues

- Puppeteer may fail on macOS due to browser launch permissions
- Google search scraping may be rate-limited
- Gemini API has daily quota limits on free tier

##  Assignment Requirements Met

 * Backend API with MongoDB  
 * Web scraping from BeyondChats blog  
 * AI enhancement using Gemini  
 * Frontend with article display  
 * Side-by-side comparison view  
 * Deployed to production (Vercel + Render)  
 * Clean, documented code  
 * Git commit history showing realistic development timeline  

##  Development Timeline

- **Day 1 (Dec 29):** Backend setup, API, scraper (7 commits)
- **Day 2 (Dec 30):** Enhancer, AI integration, frontend init (8 commits)
- **Day 3 (Dec 31):** UI polish, deployment, documentation (9 commits)

##  Contributing

This is an assignment project, but feedback is welcome!

##  License

MIT License - feel free to use this code for learning

---

**Developed by Sanchit Bishnoi**

GitHub: [Sanchit029](https://github.com/Sanchit029) | Email: sanchitbishnoi029@gmail.com

# Backend API

Express API for BeyondChats article scraper.

## Setup

```bash
npm install
cp .env.example .env
# Add your MongoDB URI to .env
npm run dev
```

## Endpoints

- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article
- `POST /api/articles/scrape` - Scrape BeyondChats blog

## Test Scraper

```bash
node test.js
```

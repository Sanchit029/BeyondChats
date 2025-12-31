/**
 * Article Routes
 * Handles CRUD operations and scraping functionality
 */

const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { scrapeAllArticles } = require('../services/scraper');

// POST /scrape - Scrape articles from BeyondChats blog
router.post('/scrape', async (req, res) => {
  try {
    console.log('Initiating article scraping process...');
    const articles = await scrapeAllArticles();
    
    const saved = [];
    
    // Save only new articles to avoid duplicates
    for (const articleData of articles) {
      const existing = await Article.findOne({ sourceUrl: articleData.sourceUrl });
      if (!existing) {
        const article = new Article(articleData);
        await article.save();
        saved.push(article);
      }
    }
    
    res.json({ 
      message: `Scraped ${articles.length} articles, saved ${saved.length} new`,
      articles: saved 
    });
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET / - Retrieve all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /:id - Retrieve single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST / - Create new article
router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    sourceUrl: req.body.sourceUrl,
    publishedDate: req.body.publishedDate
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE all articles and re-scrape
router.delete('/all', async (req, res) => {
  try {
    await Article.deleteMany({});
    res.json({ message: 'All articles deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update article
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (req.body.title) article.title = req.body.title;
    if (req.body.content) article.content = req.body.content;
    if (req.body.enhancedContent) article.enhancedContent = req.body.enhancedContent;
    if (req.body.isEnhanced !== undefined) article.isEnhanced = req.body.isEnhanced;
    if (req.body.references) article.references = req.body.references;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE article
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.deleteOne();
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

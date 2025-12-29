const axios = require('axios');
const cheerio = require('cheerio');

const BEYONDCHATS_BLOG_URL = 'https://beyondchats.com/blogs/';

async function scrapeBlogList() {
  try {
    const response = await axios.get(BEYONDCHATS_BLOG_URL);
    const $ = cheerio.load(response.data);
    
    const articles = [];
    
    // Get article links from blog page
    $('.blog-post').each((index, element) => {
      if (index >= 5) return false; // Only get 5 articles
      
      const title = $(element).find('.post-title').text().trim();
      const link = $(element).find('a').attr('href');
      
      if (title && link) {
        articles.push({
          title,
          url: link.startsWith('http') ? link : `https://beyondchats.com${link}`
        });
      }
    });
    
    return articles;
  } catch (error) {
    console.error('Error scraping blog list:', error.message);
    throw error;
  }
}

async function scrapeArticleContent(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const title = $('.article-title').text().trim();
    const content = $('.article-content').html();
    const author = $('.author-name').text().trim() || 'BeyondChats';
    const date = $('.publish-date').text().trim();
    
    return {
      title,
      content,
      author,
      sourceUrl: url,
      publishedDate: date ? new Date(date) : new Date()
    };
  } catch (error) {
    console.error('Error scraping article:', error.message);
    throw error;
  }
}

async function scrapeAllArticles() {
  const articleList = await scrapeBlogList();
  const articles = [];
  
  for (const item of articleList) {
    const article = await scrapeArticleContent(item.url);
    articles.push(article);
  }
  
  return articles;
}

module.exports = {
  scrapeBlogList,
  scrapeArticleContent,
  scrapeAllArticles
};

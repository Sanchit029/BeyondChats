/**
 * Web Scraper Service
 * Scrapes articles from BeyondChats blog
 */

const axios = require('axios');
const cheerio = require('cheerio');

const BEYONDCHATS_BLOG_URL = 'https://beyondchats.com/blogs/';

async function scrapeBlogList() {
  try {
    const response = await axios.get(BEYONDCHATS_BLOG_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    
    const articles = [];
    
    // Try multiple selectors to find articles
    const selectors = [
      'article',
      '.post',
      '.blog-item',
      '.entry',
      '[class*="blog"]',
      '[class*="post"]'
    ];
    
    let found = false;
    
    for (const selector of selectors) {
      $(selector).each((index, element) => {
        if (index >= 5) return false;
        
        // Try different title selectors
        let title = $(element).find('h2').first().text().trim() ||
                    $(element).find('h3').first().text().trim() ||
                    $(element).find('.title').text().trim() ||
                    $(element).find('[class*="title"]').text().trim();
        
        // Try different link selectors
        let link = $(element).find('a').first().attr('href');
        
        if (title && link) {
          found = true;
          const fullUrl = link.startsWith('http') ? link : `https://beyondchats.com${link}`;
          
          // Avoid duplicates
          if (!articles.find(a => a.url === fullUrl)) {
            articles.push({ title, url: fullUrl });
          }
        }
      });
      
      if (found && articles.length >= 5) break;
    }
    
    console.log(`Found ${articles.length} articles`);
    return articles.slice(0, 5);
  } catch (error) {
    console.error('Error scraping blog list:', error.message);
    throw error;
  }
}

async function scrapeArticleContent(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    
    // Try multiple selectors for title
    const title = $('h1').first().text().trim() ||
                  $('.entry-title').text().trim() ||
                  $('[class*="title"]').first().text().trim() ||
                  $('title').text().trim();
    
    // Remove unwanted elements before extracting content
    $('script, style, nav, header, footer, aside, .comments, .comment, [class*="comment"], .sidebar, .navigation, .social-share, .related-posts, .author-bio, form, iframe, noscript').remove();
    
    // Try multiple selectors for main content area
    let contentEl = $('.entry-content').first();
    if (!contentEl.length) contentEl = $('article .content').first();
    if (!contentEl.length) contentEl = $('.post-content').first();
    if (!contentEl.length) contentEl = $('article').first();
    if (!contentEl.length) contentEl = $('[class*="blog-content"]').first();
    if (!contentEl.length) contentEl = $('.content').first();
    if (!contentEl.length) contentEl = $('main').first();
    
    // Extract clean text content with paragraph structure
    let content = '';
    if (contentEl.length) {
      // Get paragraphs and headings for structured content
      contentEl.find('p, h2, h3, h4, li').each((i, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 20) { // Skip very short fragments
          content += text + '\n\n';
        }
      });
    }
    
    // Fallback: get all text if structured extraction failed
    if (!content || content.length < 200) {
      content = contentEl.text().trim() || $('body').text().trim();
      // Clean up whitespace
      content = content.replace(/\s+/g, ' ').trim();
    }
    
    // Limit content length (avoid huge pages)
    if (content.length > 10000) {
      content = content.substring(0, 10000) + '...';
    }
    
    // Try to get author
    const author = $('.author-name').text().trim() ||
                   $('.author').text().trim() ||
                   $('[class*="author"]').first().text().trim() ||
                   'BeyondChats';
    
    // Try to get date
    const dateText = $('time').attr('datetime') ||
                     $('.date').text().trim() ||
                     $('[class*="date"]').text().trim();
    
    // Parse date safely
    let publishedDate = new Date();
    if (dateText) {
      const parsed = new Date(dateText);
      if (!isNaN(parsed.getTime())) {
        publishedDate = parsed;
      }
    }
    
    return {
      title: title || 'Untitled',
      content: content || 'Content could not be extracted.',
      author: author.substring(0, 100), // Limit author length
      sourceUrl: url,
      publishedDate
    };
  } catch (error) {
    console.error('Error scraping article:', error.message);
    throw error;
  }
}

async function scrapeAllArticles() {
  console.log('Starting to scrape BeyondChats blog...');
  const articleList = await scrapeBlogList();
  const articles = [];
  
  for (const item of articleList) {
    console.log(`Scraping: ${item.title}`);
    try {
      const article = await scrapeArticleContent(item.url);
      articles.push(article);
      // Small delay to be nice to the server
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.error(`Failed to scrape ${item.url}:`, err.message);
    }
  }
  
  console.log(`Successfully scraped ${articles.length} articles`);
  return articles;
}

module.exports = {
  scrapeBlogList,
  scrapeArticleContent,
  scrapeAllArticles
};

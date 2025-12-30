const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeContent(url) {
  console.log(`Scraping content from: ${url}`);
  
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    // Remove unwanted elements
    $('script, style, nav, footer, header, aside, .sidebar, .comments, .advertisement').remove();
    
    // Try to get the title
    const title = $('h1').first().text().trim() ||
                  $('title').text().trim() ||
                  '';
    
    // Try multiple content selectors
    let content = '';
    const contentSelectors = [
      'article',
      '.post-content',
      '.entry-content',
      '.article-content',
      '.content',
      'main',
      '.blog-post',
      '[class*="content"]'
    ];
    
    for (const selector of contentSelectors) {
      const element = $(selector).first();
      if (element.length && element.text().trim().length > 200) {
        content = element.text().trim();
        break;
      }
    }
    
    // Fallback: get body text
    if (!content) {
      content = $('body').text().trim();
    }
    
    // Clean up the content
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim()
      .slice(0, 5000); // Limit content length
    
    return {
      url,
      title,
      content
    };
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return {
      url,
      title: '',
      content: ''
    };
  }
}

async function scrapeMultipleUrls(urls) {
  const results = [];
  
  for (const url of urls) {
    const content = await scrapeContent(url);
    if (content.content) {
      results.push(content);
    }
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

module.exports = { scrapeContent, scrapeMultipleUrls };

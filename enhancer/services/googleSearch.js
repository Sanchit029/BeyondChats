const puppeteer = require('puppeteer');

// Random delay to avoid detection
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomDelay(min = 1000, max = 3000) {
  return delay(Math.floor(Math.random() * (max - min + 1) + min));
}

async function searchGoogle(query) {
  console.log(`Searching Google for: ${query}`);
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
  });
  
  const page = await browser.newPage();
  
  // Better stealth settings
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1366, height: 768 });
  
  // Set extra headers to look more human
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
  });
  
  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query + ' blog article')}`;
    
    // Add delay before search
    await randomDelay(500, 1500);
    
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait a bit for page to fully load
    await randomDelay(1000, 2000);
    
    // Extract search result links
    const links = await page.evaluate(() => {
      const results = [];
      // Target actual search result links
      const searchResults = document.querySelectorAll('div.g a, div[data-hveid] a');
      
      for (const anchor of searchResults) {
        const href = anchor.href;
        if (href && 
            href.startsWith('http') && 
            !href.includes('google.com') &&
            !href.includes('youtube.com') &&
            !href.includes('facebook.com') &&
            !href.includes('twitter.com') &&
            !href.includes('linkedin.com')) {
          results.push(href);
        }
      }
      
      return results;
    });
    
    // Get top 2 unique blog/article links
    const uniqueLinks = [...new Set(links)].slice(0, 2);
    console.log(`Found ${uniqueLinks.length} links`);
    
    // Delay before closing
    await randomDelay(500, 1000);
    
    await browser.close();
    return uniqueLinks;
    
  } catch (error) {
    console.error('Google search error:', error.message);
    await browser.close();
    return []; // Return empty instead of throwing
  }
}

module.exports = { searchGoogle };

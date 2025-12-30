const puppeteer = require('puppeteer');

async function searchGoogle(query) {
  console.log(`Searching Google for: ${query}`);
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });
    
    // Extract search result links
    const links = await page.evaluate(() => {
      const results = [];
      const anchors = document.querySelectorAll('a');
      
      for (const anchor of anchors) {
        const href = anchor.href;
        // Filter out google links and get actual results
        if (href && 
            href.startsWith('http') && 
            !href.includes('google.com') &&
            !href.includes('youtube.com') &&
            !href.includes('facebook.com')) {
          results.push(href);
        }
      }
      
      return results;
    });
    
    // Get top 2 unique blog/article links
    const uniqueLinks = [...new Set(links)].slice(0, 2);
    console.log(`Found ${uniqueLinks.length} links`);
    
    await browser.close();
    return uniqueLinks;
    
  } catch (error) {
    await browser.close();
    throw error;
  }
}

module.exports = { searchGoogle };

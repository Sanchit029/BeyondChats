// Test script to verify scraper works
const { scrapeAllArticles, scrapeBlogList } = require('./services/scraper');

async function test() {
  console.log('Testing BeyondChats scraper...\n');
  
  try {
    // Test getting blog list
    console.log('1. Testing blog list scraper...');
    const list = await scrapeBlogList();
    console.log(`   Found ${list.length} articles:`);
    list.forEach((item, i) => {
      console.log(`   ${i + 1}. ${item.title}`);
    });
    
    console.log('\n2. Testing full article scraper...');
    const articles = await scrapeAllArticles();
    
    console.log('\n--- Results ---');
    articles.forEach((article, i) => {
      console.log(`\nArticle ${i + 1}:`);
      console.log(`  Title: ${article.title}`);
      console.log(`  Author: ${article.author}`);
      console.log(`  URL: ${article.sourceUrl}`);
      console.log(`  Content length: ${article.content ? article.content.length : 0} chars`);
    });
    
    console.log('\n✅ Scraper test passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

test();

// Article Enhancement Script
// Enhances articles using AI based on top-ranking content

require('dotenv').config();
const apiClient = require('./utils/apiClient');
const { searchGoogle } = require('./services/googleSearch');
const { scrapeMultipleUrls } = require('./services/contentScraper');
const { enhanceArticle } = require('./services/llmService');

// Generate citations HTML
function generateCitations(references) {
  if (!references || references.length === 0) return '';
  
  let html = '\n\n<hr>\n<div class="citations">\n';
  html += '<h3>References & Sources</h3>\n<ul>\n';
  
  references.forEach((ref, i) => {
    html += `  <li><a href="${ref.url}" target="_blank" rel="noopener">${ref.title || ref.url}</a></li>\n`;
  });
  
  html += '</ul>\n</div>';
  return html;
}

async function enhanceAndPublish(article) {
  console.log(`\n📝 Processing: ${article.title}`);
  
  try {
    // Step 1: Search Google for similar content
    console.log('  🔍 Searching Google...');
    const searchResults = await searchGoogle(article.title);
    
    if (searchResults.length === 0) {
      console.log('  ⚠️ No search results found, skipping');
      return null;
    }
    
    // Step 2: Scrape content from top results
    console.log(`  📄 Scraping ${searchResults.length} reference articles...`);
    const referenceArticles = await scrapeMultipleUrls(searchResults);
    
    if (referenceArticles.length === 0) {
      console.log('  ⚠️ Could not scrape reference content, skipping');
      return null;
    }
    
    // Step 3: Enhance with Gemini AI
    console.log('  🤖 Enhancing with AI...');
    let enhancedContent = await enhanceArticle(
      { title: article.title, content: article.content },
      referenceArticles
    );
    
    // Step 4: Add citations
    const references = referenceArticles.map(ref => ({
      title: ref.title,
      url: ref.url
    }));
    enhancedContent += generateCitations(references);
    
    // Step 5: Update article via API
    console.log('  💾 Saving enhanced article...');
    const updated = await apiClient.updateArticle(article._id, {
      enhancedContent,
      isEnhanced: true,
      references
    });
    
    console.log('  ✅ Article enhanced successfully!');
    return updated;
    
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('========================================');
  console.log('   BeyondChat Article Enhancer');
  console.log('========================================\n');
  
  try {
    // Get articles from API
    console.log('Fetching articles from API...');
    const articles = await apiClient.getArticles();
    
    // Filter to only non-enhanced articles
    const toEnhance = articles.filter(a => !a.isEnhanced);
    console.log(`Found ${articles.length} articles, ${toEnhance.length} need enhancement\n`);
    
    if (toEnhance.length === 0) {
      console.log('All articles already enhanced!');
      return;
    }
    
    // Process each article
    let enhanced = 0;
    for (const article of toEnhance) {
      const result = await enhanceAndPublish(article);
      if (result) enhanced++;
      
      // Delay between articles to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('\n========================================');
    console.log(`   Done! Enhanced ${enhanced}/${toEnhance.length} articles`);
    console.log('========================================');
    
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

main();

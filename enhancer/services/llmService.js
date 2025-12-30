const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function enhanceArticle(originalArticle, referenceArticles) {
  console.log('Enhancing article with Gemini AI...');
  
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  // Improved prompt with better structure and examples
  const prompt = `You are an expert content writer, SEO specialist, and blog editor.

=== ORIGINAL ARTICLE ===
Title: ${originalArticle.title}
Content: ${originalArticle.content}

=== TOP-RANKING REFERENCE ARTICLES FOR INSPIRATION ===
${referenceArticles.map((ref, i) => `
--- Reference Article ${i + 1} ---
Title: ${ref.title}
Source URL: ${ref.url}
Content Preview: ${ref.content.slice(0, 2000)}
`).join('\n')}

=== YOUR TASK ===
Rewrite and significantly enhance the original article. Study the reference articles to understand what makes them rank well.

REQUIREMENTS:
1. **Keep Core Message**: Preserve the original topic and key points
2. **Better Structure**: Use clear H2 and H3 headings to organize content
3. **Engaging Introduction**: Start with a hook that grabs attention
4. **Bullet Points & Lists**: Break down complex information into digestible lists
5. **SEO Optimization**: Include relevant keywords naturally throughout
6. **Actionable Content**: Add practical tips, examples, or steps where relevant
7. **Strong Conclusion**: End with a summary or call-to-action
8. **Length**: Aim for 800-1200 words (similar to top-ranking articles)

FORMAT:
- Return ONLY the enhanced HTML content
- Use semantic HTML tags (h2, h3, p, ul, li, strong, em)
- Do NOT include <html>, <head>, or <body> tags
- Start directly with the content

IMPORTANT: Make the article genuinely better and more valuable to readers, not just longer.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up response - remove markdown code blocks if present
    text = text.replace(/```html\n?/g, '').replace(/```\n?/g, '');
    
    console.log('Article enhanced successfully');
    return text;
    
  } catch (error) {
    console.error('Gemini API error:', error.message);
    throw error;
  }
}

module.exports = { enhanceArticle };

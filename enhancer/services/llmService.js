const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function enhanceArticle(originalArticle, referenceArticles) {
  console.log('Enhancing article with Gemini AI...');
  
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  const prompt = `You are an expert content writer and SEO specialist.

ORIGINAL ARTICLE:
Title: ${originalArticle.title}
Content: ${originalArticle.content}

TOP-RANKING REFERENCE ARTICLES:
${referenceArticles.map((ref, i) => `
Reference ${i + 1}:
Title: ${ref.title}
URL: ${ref.url}
Content: ${ref.content}
`).join('\n')}

TASK:
Rewrite and enhance the original article to match the quality, style, and SEO optimization of the top-ranking articles. 

Requirements:
1. Keep the same topic and main points
2. Improve formatting with proper headings (H2, H3)
3. Add bullet points where appropriate
4. Make it more engaging and readable
5. Optimize for SEO
6. Keep a similar length to the reference articles

Return ONLY the enhanced article content in HTML format.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Article enhanced successfully');
    return text;
    
  } catch (error) {
    console.error('Gemini API error:', error.message);
    throw error;
  }
}

module.exports = { enhanceArticle };

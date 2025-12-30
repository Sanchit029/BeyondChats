import ArticleCard from './ArticleCard';

function ArticleList({ articles, onSelectArticle }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-gray-600 text-lg font-medium">No articles found</p>
          <p className="text-gray-400 text-sm mt-2">
            Run the scraper to fetch articles from BeyondChats blog
          </p>
          <code className="block mt-4 bg-gray-100 text-gray-600 text-xs p-3 rounded-lg">
            curl http://localhost:5001/api/articles/scrape
          </code>
        </div>
      </div>
    );
  }

  const enhancedCount = articles.filter(a => a.isEnhanced).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          All Articles
        </h2>
        <span className="text-sm text-gray-500">
          {enhancedCount} of {articles.length} enhanced
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard 
            key={article._id} 
            article={article} 
            onClick={onSelectArticle}
          />
        ))}
      </div>
    </div>
  );
}

export default ArticleList;

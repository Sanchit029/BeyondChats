function ArticleComparison({ article, onBack }) {
  if (!article) return null;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Articles
      </button>

      {/* Article Title */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">{article.title}</h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          {article.author && <span>By {article.author}</span>}
          {article.publishedDate && (
            <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
          )}
          <a 
            href={article.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Original
          </a>
        </div>
      </div>

      {/* Comparison View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-100 px-6 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-700">Original Content</h2>
          </div>
          <div className="p-6">
            <div 
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: article.content || '<p>No content available</p>' }}
            />
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-green-100 px-6 py-3 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-green-700">Enhanced Content</h2>
              {article.isEnhanced && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  AI Enhanced
                </span>
              )}
            </div>
          </div>
          <div className="p-6">
            {article.isEnhanced && article.enhancedContent ? (
              <div 
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: article.enhancedContent }}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Not enhanced yet</p>
                <p className="text-gray-400 text-sm mt-2">
                  Run the enhancer script to generate AI-enhanced content
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* References Section */}
      {article.isEnhanced && article.references && article.references.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">References</h3>
          <ul className="space-y-2">
            {article.references.map((ref, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-400 mr-2">[{index + 1}]</span>
                <a 
                  href={ref.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {ref.title || ref.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ArticleComparison;

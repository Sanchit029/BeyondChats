function ArticleCard({ article, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(article)}
    >
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {article.title}
        </h2>
        {article.isEnhanced && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Enhanced
          </span>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mb-4">
        By {article.author} • {new Date(article.createdAt).toLocaleDateString()}
      </p>
      
      <p className="text-gray-700 line-clamp-3">
        {article.content?.replace(/<[^>]*>/g, '').slice(0, 200)}...
      </p>
      
      <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
        View Article →
      </div>
    </div>
  );
}

export default ArticleCard;

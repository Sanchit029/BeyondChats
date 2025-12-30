function ArticleCard({ article, onClick }) {
  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-gray-100"
      onClick={() => onClick(article)}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 leading-tight">
          {article.title}
        </h2>
        {article.isEnhanced && (
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
            ✨ Enhanced
          </span>
        )}
      </div>
      
      <p className="text-gray-500 text-sm mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {article.author || 'Unknown Author'} 
        <span className="text-gray-300">•</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      
      <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
        {article.content?.replace(/<[^>]*>/g, '').slice(0, 180)}...
      </p>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          View Article 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
        {article.sourceUrl && (
          <span className="text-xs text-gray-400">From BeyondChats</span>
        )}
      </div>
    </div>
  );
}

export default ArticleCard;

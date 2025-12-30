import ArticleCard from './ArticleCard';

function ArticleList({ articles, onSelectArticle }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No articles found</p>
        <p className="text-gray-400 text-sm mt-2">
          Run the scraper to fetch articles from BeyondChats blog
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard 
          key={article._id} 
          article={article} 
          onClick={onSelectArticle}
        />
      ))}
    </div>
  );
}

export default ArticleList;

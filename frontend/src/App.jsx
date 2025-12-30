import { useState, useEffect } from 'react'
import { getArticles } from './services/api'
import ArticleList from './components/ArticleList'
import ArticleComparison from './components/ArticleComparison'

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const data = await getArticles()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setSelectedArticle(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            BeyondChat Article Enhancer
          </h1>
          <p className="text-gray-600 mt-1">
            View original and AI-enhanced articles
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading articles...</p>
          </div>
        ) : selectedArticle ? (
          <ArticleComparison 
            article={selectedArticle} 
            onBack={handleBack}
          />
        ) : (
          <ArticleList 
            articles={articles} 
            onSelectArticle={setSelectedArticle}
          />
        )}
      </main>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import { getArticles } from './services/api'
import ArticleList from './components/ArticleList'
import ArticleComparison from './components/ArticleComparison'

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getArticles()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching articles:', error)
      setError('Failed to load articles. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setSelectedArticle(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                BeyondChat Article Enhancer
              </h1>
              <p className="text-gray-500 mt-1">
                View original and AI-enhanced articles side by side
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {articles.filter(a => a.isEnhanced).length} Enhanced
              </span>
              <span className="text-gray-300">|</span>
              <span>{articles.length} Total</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-red-600 font-medium">{error}</p>
              <button 
                onClick={fetchArticles}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : selectedArticle ? (
          <div className="animate-fadeIn">
            <ArticleComparison 
              article={selectedArticle} 
              onBack={handleBack}
            />
          </div>
        ) : (
          <div className="animate-fadeIn">
            <ArticleList 
              articles={articles} 
              onSelectArticle={setSelectedArticle}
            />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            BeyondChat Assignment © 2025 | Built with React + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}


export default App

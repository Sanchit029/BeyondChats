import { useState, useEffect } from 'react'

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch articles from API
    setLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            BeyondChat Article Enhancer
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {loading ? (
          <p>Loading articles...</p>
        ) : (
          <p>Articles will be displayed here</p>
        )}
      </main>
    </div>
  )
}

export default App

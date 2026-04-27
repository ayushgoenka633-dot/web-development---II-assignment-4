import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import BookCard from './BookCard.jsx'

const API_URL = 'https://openlibrary.org/search.json'

export default function HomePage() {
  const [query, setQuery] = useState('javascript')
  const [sortBy, setSortBy] = useState('relevance')
  const [page, setPage] = useState(1)
  const [books, setBooks] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      if (!query.trim()) return
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_URL}?q=${encodeURIComponent(query)}&page=${page}&limit=12`, { signal: controller.signal })
        if (!res.ok) throw new Error('API request failed')
        const data = await res.json()
        setBooks(data.docs || [])
        setTotal(data.numFound || 0)
      } catch (err) {
        if (err.name !== 'AbortError') setError('Could not load books. Please try again.')
      } finally {
        setLoading(false)
      }
    }, 450)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, page])

  const sortedBooks = useMemo(() => {
    const copy = [...books]
    if (sortBy === 'year') copy.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0))
    if (sortBy === 'title') copy.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    return copy
  }, [books, sortBy])

  return (
    <section className="page">
      <div className="hero">
        <p className="tag">Education Domain Project</p>
        <h1>BookNest: Smart Book Finder</h1>
        <p>Search books using Open Library API, save favourites, explore dashboard insights, and manage your reading list.</p>
      </div>

      <div className="toolbar">
        <div className="search-box"><Search size={18} /><input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} placeholder="Search books..." /></div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="relevance">Sort: Relevance</option>
          <option value="year">Sort: Newest</option>
          <option value="title">Sort: Title</option>
        </select>
      </div>

      <p className="result-text">Results found: {total.toLocaleString()}</p>
      {loading && <p className="status">Loading books...</p>}
      {error && <p className="error">{error}</p>}
      <div className="grid">{sortedBooks.map((book) => <BookCard key={book.key} book={book} />)}</div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </section>
  )
}

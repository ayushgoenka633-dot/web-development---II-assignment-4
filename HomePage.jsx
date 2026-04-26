import { useEffect, useMemo, useState } from 'react'
import BookCard from '../components/BookCard.jsx'
import { searchBooks } from '../utils/api.js'

export default function HomePage() {
  const [query, setQuery] = useState('javascript')
  const [debouncedQuery, setDebouncedQuery] = useState('javascript')
  const [books, setBooks] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('relevance')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
      setPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true)
        setError('')
        const data = await searchBooks(debouncedQuery, page)
        setBooks(data.books)
        setTotal(data.total)
      } catch (err) {
        setError('Unable to load books. Please check internet connection and try again.')
      } finally {
        setLoading(false)
      }
    }
    loadBooks()
  }, [debouncedQuery, page])

  const sortedBooks = useMemo(() => {
    const list = [...books]
    if (sortBy === 'year') {
      list.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0))
    }
    if (sortBy === 'editions') {
      list.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0))
    }
    return list
  }, [books, sortBy])

  return (
    <section>
      <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-extrabold">Smart Book Finder</h1>
        <p className="mt-3 max-w-2xl text-blue-100">
          Search books using Open Library API, save favorite books, and analyze your reading list.
        </p>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search books by title, subject, or author"
          className="rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-950 md:col-span-2"
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="relevance">Sort by Relevance</option>
          <option value="year">Newest First</option>
          <option value="editions">Most Editions</option>
        </select>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
        <span>Total results: {total.toLocaleString()}</span>
        <span>Page: {page}</span>
      </div>

      {loading && <p className="mt-8 text-center text-lg">Loading books...</p>}
      {error && <p className="mt-8 rounded-xl bg-red-100 p-4 text-red-700">{error}</p>}

      {!loading && !error && (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {sortedBooks.map((book) => <BookCard key={book.key} book={book} />)}
        </div>
      )}

      <div className="mt-8 flex justify-center gap-3">
        <button
          onClick={() => setPage((current) => Math.max(current - 1, 1))}
          disabled={page === 1 || loading}
          className="rounded-xl border px-5 py-2 font-semibold disabled:opacity-50 dark:border-slate-700"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((current) => current + 1)}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white"
        >
          Next
        </button>
      </div>
    </section>
  )
}

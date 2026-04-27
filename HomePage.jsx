import { useEffect, useMemo, useState } from 'react'
import BookCard from '../components/BookCard.jsx'
import { searchBooks } from '../utils/api.js'

function HomePage() {
  const [query, setQuery] = useState('web development')
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
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
    let active = true
    setLoading(true)
    setError('')

    searchBooks(debouncedQuery, page)
      .then((result) => {
        if (!active) return
        setBooks(result.books)
        setTotal(result.total)
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Something went wrong.')
        setBooks([])
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [debouncedQuery, page])

  const sortedBooks = useMemo(() => {
    const copy = [...books]
    if (sortBy === 'title') copy.sort((a, b) => a.title.localeCompare(b.title))
    if (sortBy === 'year') copy.sort((a, b) => Number(b.year || 0) - Number(a.year || 0))
    if (sortBy === 'editions') copy.sort((a, b) => b.editionCount - a.editionCount)
    return copy
  }, [books, sortBy])

  return (
    <section>
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-widest">React Capstone Project</p>
        <h1 className="mt-2 text-4xl font-extrabold">Smart Book Finder</h1>
        <p className="mt-3 max-w-2xl text-blue-50">
          Search books with Open Library API, save favorites, track reading status, and analyze your personal library.
        </p>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[1fr_180px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search books, authors, or topics..."
          className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950"
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="title">Sort: Title</option>
          <option value="year">Sort: Newest</option>
          <option value="editions">Sort: Editions</option>
        </select>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
        <span>{loading ? 'Loading books...' : `${total.toLocaleString()} results found`}</span>
        <span>Page {page}</span>
      </div>

      {error && <p className="mt-6 rounded-xl bg-red-100 p-4 text-red-700">{error}</p>}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedBooks.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="rounded-xl border px-5 py-2 font-semibold disabled:opacity-40 dark:border-slate-700"
        >
          Previous
        </button>
        <button
          disabled={loading}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default HomePage

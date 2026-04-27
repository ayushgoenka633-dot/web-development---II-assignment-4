import { useMemo, useState } from 'react'
import { useBooks } from '../context/BookContext.jsx'
import { getCoverUrl } from '../utils/api.js'

function LibraryPage() {
  const { savedBooks, removeBook, updateBook } = useBooks()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filteredBooks = useMemo(() => {
    return savedBooks.filter((book) => {
      const matchesStatus = filter === 'All' || book.status === filter
      const matchesSearch = `${book.title} ${book.author}`.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [savedBooks, filter, search])

  return (
    <section>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Library</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300">Update status, rating, and notes for saved books.</p>
        </div>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search saved books"
            className="rounded-xl border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
          />
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-xl border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
          >
            <option>All</option>
            <option>Want to Read</option>
            <option>Reading</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="mt-8 rounded-2xl border bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-lg font-semibold">No books found.</p>
          <p className="text-slate-500 dark:text-slate-400">Save books from the Home page to build your library.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5">
          {filteredBooks.map((book) => (
            <article key={book.key} className="grid gap-4 rounded-2xl border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[100px_1fr]">
              {getCoverUrl(book.coverId) ? (
                <img className="h-36 w-24 rounded-xl object-cover" src={getCoverUrl(book.coverId)} alt={book.title} />
              ) : (
                <div className="flex h-36 w-24 items-center justify-center rounded-xl bg-slate-200 text-xs dark:bg-slate-800">No Cover</div>
              )}
              <div>
                <div className="flex flex-col justify-between gap-3 md:flex-row">
                  <div>
                    <h2 className="text-xl font-bold">{book.title}</h2>
                    <p className="text-slate-600 dark:text-slate-300">{book.author} - {book.year}</p>
                  </div>
                  <button onClick={() => removeBook(book.key)} className="rounded-xl bg-red-100 px-4 py-2 font-semibold text-red-700">
                    Delete
                  </button>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <select
                    value={book.status}
                    onChange={(event) => updateBook(book.key, { status: event.target.value })}
                    className="rounded-xl border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option>Want to Read</option>
                    <option>Reading</option>
                    <option>Completed</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={book.rating}
                    onChange={(event) => updateBook(book.key, { rating: Number(event.target.value) })}
                    className="rounded-xl border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
                    placeholder="Rating out of 5"
                  />
                </div>
                <textarea
                  value={book.note}
                  onChange={(event) => updateBook(book.key, { note: event.target.value })}
                  className="mt-3 w-full rounded-xl border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
                  placeholder="Add personal note..."
                  rows="2"
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default LibraryPage

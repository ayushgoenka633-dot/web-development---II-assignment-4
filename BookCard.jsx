import { getCoverUrl } from '../utils/api.js'
import { useBooks } from '../context/BookContext.jsx'

function BookCard({ book }) {
  const { savedBooks, saveBook, removeBook } = useBooks()
  const saved = savedBooks.some((item) => item.key === book.key)
  const coverUrl = getCoverUrl(book.coverId)

  return (
    <article className="flex h-full flex-col rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex justify-center">
        {coverUrl ? (
          <img className="h-48 w-32 rounded-xl object-cover shadow" src={coverUrl} alt={book.title} />
        ) : (
          <div className="flex h-48 w-32 items-center justify-center rounded-xl bg-slate-200 text-center text-sm dark:bg-slate-800">
            No Cover
          </div>
        )}
      </div>
      <h3 className="line-clamp-2 text-lg font-bold">{book.title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">By {book.author}</p>
      <p className="mt-2 text-sm">First published: {book.year}</p>
      <p className="mt-1 text-sm">Category: {book.subject}</p>
      <button
        onClick={() => (saved ? removeBook(book.key) : saveBook(book))}
        className={`mt-auto rounded-xl px-4 py-2 font-semibold ${
          saved ? 'bg-red-100 text-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {saved ? 'Remove' : 'Save Book'}
      </button>
    </article>
  )
}

export default BookCard

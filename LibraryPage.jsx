import BookCard from '../components/BookCard.jsx'
import { useBooks } from '../context/BookContext.jsx'

export default function LibraryPage() {
  const { savedBooks, clearBooks } = useBooks()

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Saved Library</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">CRUD feature: users can save, view, and remove books.</p>
        </div>
        {savedBooks.length > 0 && (
          <button onClick={clearBooks} className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white">
            Clear All
          </button>
        )}
      </div>

      {savedBooks.length === 0 ? (
        <div className="mt-8 rounded-2xl border bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold">No saved books yet.</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Search books from the home page and save your favorites.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {savedBooks.map((book) => <BookCard key={book.key} book={book} savedView />)}
        </div>
      )}
    </section>
  )
}

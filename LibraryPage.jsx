import BookCard from './BookCard.jsx'
import { useBooks } from './BookContext.jsx'

export default function LibraryPage() {
  const { savedBooks } = useBooks()
  return (
    <section className="page">
      <h1>Saved Library</h1>
      <p className="muted">CRUD feature: users can add and remove saved books using localStorage.</p>
      {savedBooks.length === 0 ? <p className="status">No saved books yet. Save books from Home page.</p> : <div className="grid">{savedBooks.map((book) => <BookCard key={book.key} book={book} />)}</div>}
    </section>
  )
}

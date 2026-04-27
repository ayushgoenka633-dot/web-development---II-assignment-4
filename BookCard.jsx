import { Bookmark, BookmarkCheck, Calendar, User } from 'lucide-react'
import { useBooks } from './BookContext.jsx'

export default function BookCard({ book }) {
  const { savedBooks, saveBook, removeBook } = useBooks()
  const isSaved = savedBooks.some((item) => item.key === book.key)
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://placehold.co/220x320?text=No+Cover'

  return (
    <article className="book-card">
      <img src={cover} alt={book.title} loading="lazy" />
      <div className="book-content">
        <h3>{book.title}</h3>
        <p><User size={14} /> {book.author_name?.slice(0, 2).join(', ') || 'Unknown author'}</p>
        <p><Calendar size={14} /> First published: {book.first_publish_year || 'N/A'}</p>
        <button onClick={() => isSaved ? removeBook(book.key) : saveBook(book)}>
          {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          {isSaved ? 'Saved' : 'Save book'}
        </button>
      </div>
    </article>
  )
}

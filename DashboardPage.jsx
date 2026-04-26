import StatsCard from '../components/StatsCard.jsx'
import { useBooks } from '../context/BookContext.jsx'

export default function DashboardPage() {
  const { savedBooks } = useBooks()
  const publishedYears = savedBooks.map((book) => book.first_publish_year).filter(Boolean)
  const avgYear = publishedYears.length
    ? Math.round(publishedYears.reduce((sum, year) => sum + year, 0) / publishedYears.length)
    : 0
  const totalEditions = savedBooks.reduce((sum, book) => sum + (book.edition_count || 0), 0)
  const newestBook = [...savedBooks].sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0))[0]

  return (
    <section>
      <h1 className="text-3xl font-bold">Reading Dashboard</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Simple analytics based on saved books.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <StatsCard title="Saved Books" value={savedBooks.length} note="Total books in local library" />
        <StatsCard title="Total Editions" value={totalEditions} note="Combined edition count" />
        <StatsCard title="Average Year" value={avgYear || 'N/A'} note="Average first publish year" />
      </div>

      <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-bold">Newest Saved Book</h2>
        {newestBook ? (
          <p className="mt-3 text-slate-700 dark:text-slate-200">
            {newestBook.title} ({newestBook.first_publish_year || 'N/A'})
          </p>
        ) : (
          <p className="mt-3 text-slate-600 dark:text-slate-300">Save books to generate dashboard insights.</p>
        )}
      </div>
    </section>
  )
}

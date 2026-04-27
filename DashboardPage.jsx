import { useMemo } from 'react'
import { useBooks } from '../context/BookContext.jsx'
import StatsCard from '../components/StatsCard.jsx'

function DashboardPage() {
  const { savedBooks } = useBooks()

  const stats = useMemo(() => {
    const completed = savedBooks.filter((book) => book.status === 'Completed').length
    const reading = savedBooks.filter((book) => book.status === 'Reading').length
    const want = savedBooks.filter((book) => book.status === 'Want to Read').length
    const avgRating = savedBooks.length
      ? (savedBooks.reduce((sum, book) => sum + Number(book.rating || 0), 0) / savedBooks.length).toFixed(1)
      : '0.0'
    return { completed, reading, want, avgRating }
  }, [savedBooks])

  const bars = [
    { label: 'Want to Read', value: stats.want },
    { label: 'Reading', value: stats.reading },
    { label: 'Completed', value: stats.completed }
  ]
  const max = Math.max(...bars.map((item) => item.value), 1)

  return (
    <section>
      <h1 className="text-3xl font-bold">Reading Dashboard</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">Personal analytics based on saved books.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <StatsCard title="Saved Books" value={savedBooks.length} label="Total books in library" />
        <StatsCard title="Reading" value={stats.reading} label="Currently active" />
        <StatsCard title="Completed" value={stats.completed} label="Finished books" />
        <StatsCard title="Average Rating" value={stats.avgRating} label="Out of 5" />
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-bold">Status Chart</h2>
        <div className="mt-5 space-y-4">
          {bars.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full rounded-full bg-blue-600" style={{ width: `${(item.value / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DashboardPage

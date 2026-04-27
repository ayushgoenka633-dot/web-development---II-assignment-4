import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import StatsCard from './StatsCard.jsx'
import { useBooks } from './BookContext.jsx'

export default function DashboardPage() {
  const { savedBooks } = useBooks()
  const knownYears = savedBooks.filter((book) => book.first_publish_year)
  const avgYear = knownYears.length ? Math.round(knownYears.reduce((sum, book) => sum + book.first_publish_year, 0) / knownYears.length) : 'N/A'
  const chartData = savedBooks.slice(0, 8).map((book) => ({ name: (book.title || 'Book').slice(0, 10), year: book.first_publish_year || 0 }))

  return (
    <section className="page">
      <h1>Reading Dashboard</h1>
      <div className="stats-grid">
        <StatsCard title="Saved Books" value={savedBooks.length} note="Stored locally" />
        <StatsCard title="Average Year" value={avgYear} note="Based on known data" />
        <StatsCard title="API Used" value="Open Library" note="Public dataset" />
      </div>
      <div className="chart-card">
        <h2>Saved Books Publication Years</h2>
        {chartData.length === 0 ? <p className="status">Save books to see chart data.</p> : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="year" fill="currentColor" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}

import { NavLink, Route, Routes } from 'react-router-dom'
import { useBooks } from './context/BookContext.jsx'
import HomePage from './pages/HomePage.jsx'
import LibraryPage from './pages/LibraryPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  const { darkMode, setDarkMode, savedBooks } = useBooks()

  const linkClass = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
    }`

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition dark:bg-slate-950 dark:text-white">
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <NavLink to="/" className="text-xl font-bold text-blue-600 dark:text-blue-300">
            BookNest
          </NavLink>

          <div className="flex items-center gap-2">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/library" className={linkClass}>Library ({savedBooks.length})</NavLink>
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-xl border px-3 py-2 text-sm font-semibold dark:border-slate-700"
            >
              {darkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

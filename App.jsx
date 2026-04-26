import { NavLink, Route, Routes } from 'react-router-dom'
import { BookOpen, Home, LayoutDashboard, Moon, Sun } from 'lucide-react'
import HomePage from './pages/HomePage.jsx'
import LibraryPage from './pages/LibraryPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { useBooks } from './context/BookContext.jsx'

function Navbar() {
  const { darkMode, setDarkMode, savedBooks } = useBooks()
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
    }`

  return (
    <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-blue-700 dark:text-blue-300">
          <BookOpen /> BookNest
        </NavLink>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}><Home size={16} /> Home</NavLink>
          <NavLink to="/library" className={linkClass}>Library ({savedBooks.length})</NavLink>
          <NavLink to="/dashboard" className={linkClass}><LayoutDashboard size={16} /> Dashboard</NavLink>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-xl border px-3 py-2 dark:border-slate-700 dark:text-white"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <Navbar />
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

import { NavLink, Route, Routes } from 'react-router-dom'
import { BookOpen, Home, LayoutDashboard, Moon, Sun } from 'lucide-react'
import HomePage from './HomePage.jsx'
import LibraryPage from './LibraryPage.jsx'
import DashboardPage from './DashboardPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import { useBooks } from './BookContext.jsx'

function Navbar() {
  const { darkMode, setDarkMode, savedBooks } = useBooks()
  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active' : ''}`

  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand"><BookOpen size={24} /> BookNest</NavLink>
        <nav className="links">
          <NavLink to="/" className={linkClass}><Home size={16} /> Home</NavLink>
          <NavLink to="/library" className={linkClass}>Library ({savedBooks.length})</NavLink>
          <NavLink to="/dashboard" className={linkClass}><LayoutDashboard size={16} /> Dashboard</NavLink>
          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  const { darkMode } = useBooks()

  return (
    <main className={darkMode ? 'app dark' : 'app'}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  )
}

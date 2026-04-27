import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const BookContext = createContext(null)
const STORAGE_KEY = 'booknest_saved_books'

export function BookProvider({ children }) {
  const [savedBooks, setSavedBooks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('booknest_theme') === 'dark')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBooks))
  }, [savedBooks])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('booknest_theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  function saveBook(book) {
    setSavedBooks((prev) => {
      const exists = prev.some((item) => item.key === book.key)
      if (exists) return prev
      return [{ ...book, status: 'Want to Read', note: '', rating: 0, savedAt: new Date().toISOString() }, ...prev]
    })
  }

  function removeBook(key) {
    setSavedBooks((prev) => prev.filter((book) => book.key !== key))
  }

  function updateBook(key, updates) {
    setSavedBooks((prev) => prev.map((book) => (book.key === key ? { ...book, ...updates } : book)))
  }

  const value = useMemo(
    () => ({ savedBooks, saveBook, removeBook, updateBook, darkMode, setDarkMode }),
    [savedBooks, darkMode]
  )

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

export function useBooks() {
  const context = useContext(BookContext)
  if (!context) throw new Error('useBooks must be used inside BookProvider')
  return context
}

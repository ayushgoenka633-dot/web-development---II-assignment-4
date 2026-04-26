import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const BookContext = createContext(null)

export function BookProvider({ children }) {
  const [savedBooks, setSavedBooks] = useState(() => {
    const stored = localStorage.getItem('booknest_saved_books')
    return stored ? JSON.parse(stored) : []
  })
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('booknest_theme') === 'dark')

  useEffect(() => {
    localStorage.setItem('booknest_saved_books', JSON.stringify(savedBooks))
  }, [savedBooks])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('booknest_theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  function addBook(book) {
    setSavedBooks((current) => {
      const exists = current.some((item) => item.key === book.key)
      return exists ? current : [...current, book]
    })
  }

  function removeBook(bookKey) {
    setSavedBooks((current) => current.filter((book) => book.key !== bookKey))
  }

  function clearBooks() {
    setSavedBooks([])
  }

  const value = useMemo(
    () => ({ savedBooks, addBook, removeBook, clearBooks, darkMode, setDarkMode }),
    [savedBooks, darkMode],
  )

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

export function useBooks() {
  const context = useContext(BookContext)
  if (!context) throw new Error('useBooks must be used inside BookProvider')
  return context
}

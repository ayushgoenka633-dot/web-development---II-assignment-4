import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const BookContext = createContext(null)

export function BookProvider({ children }) {
  const [savedBooks, setSavedBooks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('booknest_saved_books')) || []
    } catch {
      return []
    }
  })
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    localStorage.setItem('booknest_saved_books', JSON.stringify(savedBooks))
  }, [savedBooks])

  const saveBook = (book) => {
    setSavedBooks((prev) => {
      if (prev.some((item) => item.key === book.key)) return prev
      return [book, ...prev]
    })
  }

  const removeBook = (key) => {
    setSavedBooks((prev) => prev.filter((book) => book.key !== key))
  }

  const value = useMemo(
    () => ({ savedBooks, saveBook, removeBook, darkMode, setDarkMode }),
    [savedBooks, darkMode]
  )

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

export function useBooks() {
  const context = useContext(BookContext)
  if (!context) throw new Error('useBooks must be used inside BookProvider')
  return context
}

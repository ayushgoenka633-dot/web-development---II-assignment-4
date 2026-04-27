import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="rounded-2xl border bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white">
        Go Home
      </Link>
    </section>
  )
}

export default NotFoundPage

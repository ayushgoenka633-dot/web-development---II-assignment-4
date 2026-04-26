import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="rounded-2xl border bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white">
        Go Home
      </Link>
    </div>
  )
}

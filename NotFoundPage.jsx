import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="page center">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link className="primary-link" to="/">Go Home</Link>
    </section>
  )
}

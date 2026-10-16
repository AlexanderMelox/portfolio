import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: '120px' }}>
      <p className="eyebrow">404</p>
      <h1 className="section-title">This page wandered off.</h1>
      <p style={{ color: 'var(--muted)', fontSize: 20 }}>It may have moved, or it never existed.</p>
      <Link href="/" className="button button--primary" style={{ marginTop: 24 }}>
        Go home
      </Link>
    </div>
  )
}

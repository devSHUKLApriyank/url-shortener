import { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { getUserUrls, deleteUserUrl } from '../api/user.api'
import { useSelector } from 'react-redux'

export function DashboardPage() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(null)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await getUserUrls()
        setUrls(data.urls)
      } catch (err) {
        console.log('Error fetching urls:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUrls()
  }, [])

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(shortUrl)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDelete = async (id) => {
    try {
      await deleteUserUrl(id)
      setUrls(urls.filter((url) => url._id !== id))
    } catch (err) {
      console.log('Delete error:', err)
    }
  }

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .url-card {
          background: #111120;
          border: 0.5px solid #1e1e2e;
          border-radius: 12px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          transition: border-color 0.2s;
          animation: fadeUp 0.4s ease forwards;
        }
        .url-card:hover { border-color: #7c3aed44; }
        .copy-btn {
          padding: 6px 14px;
          font-size: 12px;
          border-radius: 6px;
          border: 0.5px solid #2a2a40;
          background: transparent;
          color: #6b6b8a;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .copy-btn:hover { border-color: #7c3aed55; color: #a78bfa; }
        .copy-btn.copied { border-color: #10b981; color: #10b981; background: #10b98111; }
        .delete-btn {
          padding: 6px 14px;
          font-size: 12px;
          border-radius: 6px;
          border: 0.5px solid #2a2a40;
          background: transparent;
          color: #6b6b8a;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .delete-btn:hover { border-color: #ef444455; color: #ef4444; background: #ef444411; }
        .skeleton {
          background: linear-gradient(90deg, #111120 25%, #1a1a2e 50%, #111120 75%);
          background-size: 400px 100%;
          animation: shimmer 1.2s infinite;
          border-radius: 12px;
          height: 72px;
        }
      `}</style>

      <Navbar />

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem', animation: 'fadeUp 0.5s ease forwards' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', boxShadow: '0 0 6px #7c3aed' }} />
            <span style={{ fontSize: 11, color: '#4b4b6a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your links</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 500, color: '#fff' }}>Dashboard</h1>
          {user && <p style={{ fontSize: 13, color: '#4b4b6a', marginTop: 4 }}>Welcome back, <span style={{ color: '#a78bfa' }}>{user.name}</span></p>}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: '2rem', animation: 'fadeUp 0.6s ease forwards' }}>
          {[
            { label: 'Total links', value: urls.length },
            { label: 'Total clicks', value: urls.reduce((a, u) => a + (u.clicks || 0), 0) },
            { label: 'Active today', value: urls.filter(u => u.clicks > 0).length },
          ].map(s => (
            <div key={s.label} style={{ background: '#111120', border: '0.5px solid #1e1e2e', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: 22, fontWeight: 500, color: '#a78bfa' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#4b4b6a', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* URL List */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[1, 2, 3].map(i => <div key={i} className="skeleton" />)}
          </div>
        ) : urls.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '0.5px dashed #1e1e2e', borderRadius: 12 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔗</div>
            <p style={{ color: '#4b4b6a', fontSize: 14 }}>No links yet. Go shorten something!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {urls.map((url, i) => (
              <div key={url._id} className="url-card" style={{ animationDelay: `${i * 0.05}s` }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#e0e0ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>
                    {url.full_url}
                  </p>
                  <a
                    href={`${import.meta.env.VITE_API_URL}/${url.short_url}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 12, color: '#7c3aed', textDecoration: 'none' }}
                  >
                    {import.meta.env.VITE_API_URL}/{url.short_url}
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: '#3b3b5c', background: '#1a0a2e', padding: '2px 8px', borderRadius: 10 }}>
                    {url.clicks} clicks
                  </span>
                  <button
                    onClick={() => handleCopy(`${import.meta.env.VITE_API_URL}/${url.short_url}`)}
                    className={`copy-btn ${copied === `${import.meta.env.VITE_API_URL}/${url.short_url}` ? 'copied' : ''}`}
                  >
                    {copied === `${import.meta.env.VITE_API_URL}/${url.short_url}` ? '✓ Copied' : 'Copy'}
                  </button>
                  <button onClick={() => handleDelete(url._id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

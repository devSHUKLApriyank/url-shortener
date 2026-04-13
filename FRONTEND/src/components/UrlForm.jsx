import { useState } from 'react'
import { shortenUrl } from '../api/user.api'
import { useSelector } from 'react-redux'

export function UrlForm({ onShortUrlGenerated }) {
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    try {
      new URL(url)
    } catch {
      setError('Please enter a valid URL')
      return
    }

    setLoading(true)
    try {
      const data = await shortenUrl(url, slug.trim() || null)
      onShortUrlGenerated(data.shortUrl)
      setSlug('')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/very/long/url"
        className="home-input"  // ← use this class
      />

      {isAuthenticated && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 whitespace-nowrap"> {import.meta.env.VITE_API_URL}/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.replace(/\s+/g, '-'))}
            placeholder="custom-slug (optional)"
            className="home-input"  // ← use this class
          />
        </div>
      )}

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="home-btn"  // ← use this class
        style={{ width: '100%' }}
      >
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>
    </form>
  )
}
import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { UrlForm } from '../components/UrlForm'

export function HomePage() {
  const [shortUrl, setShortUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <style>{`
        @keyframes pulse {
          0%,100% { opacity: 0.4; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.08); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0.2; }
        }
        .home-input {
          width: 100%;
          height: 48px;
          padding: 0 1rem;
          font-size: 14px;
          background: #111120;
          border: 0.5px solid #2a2a40;
          border-radius: 10px;
          color: #e0e0ff;
          outline: none;
          transition: border-color 0.2s;
        }
        .home-input::placeholder { color: #3b3b5c; }
        .home-input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px #7c3aed18; }
        .home-btn {
          height: 48px;
          padding: 0 1.5rem;
          font-size: 14px;
          font-weight: 500;
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
          white-space: nowrap;
        }
        .home-btn:hover { opacity: 0.85; }
        .home-btn:active { transform: scale(0.97); }
        .home-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .copy-btn {
          padding: 8px 16px;
          font-size: 13px;
          border-radius: 8px;
          border: 0.5px solid #3b3b5c;
          background: transparent;
          color: #a0a0c0;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .copy-btn:hover { border-color: #7c3aed55; color: #a78bfa; }
        .copy-btn.copied { border-color: #10b981; color: #10b981; background: #10b98111; }
      `}</style>

      <Navbar />

      <div style={{ position: 'relative', textAlign: 'center', padding: '5rem 2rem 4rem' }}>
        {/* Glow */}
        <div style={{ width: 400, height: 400, borderRadius: '50%', background: '#7c3aed15', position: 'absolute', top: 0, left: '50%', filter: 'blur(80px)', pointerEvents: 'none', animation: 'pulse 4s ease-in-out infinite' }} />

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, padding: '4px 12px', borderRadius: 20, background: '#1a0a2e', border: '0.5px solid #7c3aed55', color: '#a78bfa', marginBottom: '1.5rem', position: 'relative', zIndex: 1, animation: 'fadeUp 0.6s ease forwards' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', animation: 'blink 1.5s ease-in-out infinite' }} />
          Paste your link below
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 500, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem', position: 'relative', zIndex: 1, animation: 'fadeUp 0.7s ease forwards' }}>
          Make it <span style={{ color: '#a78bfa' }}>short</span> & powerful
        </h1>
        <p style={{ fontSize: 14, color: '#6b6b8a', marginBottom: '2.5rem', position: 'relative', zIndex: 1, animation: 'fadeUp 0.8s ease forwards' }}>
          Shorten any URL in seconds. Add a custom slug if you want.
        </p>

        {/* Form card */}
        <div style={{ background: '#111120', border: '0.5px solid #1e1e2e', borderRadius: 16, padding: '2rem', maxWidth: 520, margin: '0 auto', position: 'relative', zIndex: 1, animation: 'fadeUp 0.9s ease forwards' }}>
          <UrlForm onShortUrlGenerated={setShortUrl} />

          {shortUrl && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#0d0d18', border: '0.5px solid #7c3aed44', borderRadius: 10 }}>
              <p style={{ fontSize: 11, color: '#6b6b8a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Your short link</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: '#a78bfa', wordBreak: 'break-all', textAlign: 'left' }}>{shortUrl}</span>
                <button onClick={handleCopy} className={`copy-btn ${copied ? 'copied' : ''}`}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

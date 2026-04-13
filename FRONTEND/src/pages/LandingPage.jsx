import { useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'

const links = [
  { orig: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', short: 'url.sh/yt-rick', clicks: '2.4k' },
  { orig: 'https://github.com/torvalds/linux/blob/master/README', short: 'url.sh/linux', clicks: '891' },
  { orig: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms', short: 'url.sh/gsheet', clicks: '312' },
  { orig: 'https://www.amazon.com/dp/B09G3HRMVB?ref=cm_sw_r_cp_ud', short: 'url.sh/amz-deal', clicks: '5.1k' },
  { orig: 'https://twitter.com/elonmusk/status/1234567890', short: 'url.sh/elon-tweet', clicks: '18k' },
  { orig: 'https://medium.com/swlh/how-to-build-a-saas-product-in-2024', short: 'url.sh/saas-guide', clicks: '743' },
  { orig: 'https://www.figma.com/file/abc123/My-Design-System', short: 'url.sh/figma-ds', clicks: '229' },
  { orig: 'https://stackoverflow.com/questions/11227809', short: 'url.sh/so-sorted', clicks: '3.7k' },
]

const positions = [5, 18, 32, 47, 60, 74, 88]

export function LandingPage() {
  const navigate = useNavigate()
  const tickerRef = useRef(null)
  const floatingRef = useRef(null)

  useEffect(() => {
    const ticker = tickerRef.current
    if (ticker) {
      const allLinks = [...links, ...links]
      allLinks.forEach(l => {
        const item = document.createElement('div')
        item.style.cssText = 'display:inline-flex;align-items:center;gap:8px;padding:0 2rem;font-size:12px;white-space:nowrap;'
        item.innerHTML = `
          <span style="color:#4b4b6a;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${l.orig}</span>
          <span style="color:#7c3aed;font-size:14px;">→</span>
          <span style="color:#a78bfa;font-weight:500;">${l.short}</span>
          <span style="font-size:10px;color:#3b3b5c;background:#1a0a2e;padding:2px 6px;border-radius:10px;">${l.clicks} clicks</span>
        `
        ticker.appendChild(item)
      })
    }

    const floating = floatingRef.current
    if (floating) {
      links.forEach((l, i) => {
        const el = document.createElement('div')
        const duration = 5 + (i % 3)
        const delay = i * 0.9
        el.style.cssText = `
          position:absolute;
          font-size:11px;
          white-space:nowrap;
          opacity:0;
          left:${positions[i % positions.length]}%;
          animation:floatUp ${duration}s ease-in ${delay}s infinite;
          color:${i % 2 === 0 ? '#7c3aed' : '#3b3b5c'};
          font-weight:${i % 2 === 0 ? '500' : '400'};
        `
        el.textContent = i % 2 === 0 ? l.short : l.orig.replace('https://', '')
        floating.appendChild(el)
      })
    }
  }, [])

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: 'sans-serif', overflow: 'hidden' }}>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes tickerMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(160px); }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .land-feature-card { background: #111120; border: 0.5px solid #1e1e2e; border-radius: 12px; padding: 1.25rem; transition: border-color 0.2s; }
        .land-feature-card:hover { border-color: #7c3aed55; }
        .land-btn-primary { padding: 11px 28px; font-size: 14px; font-weight: 500; background: #7c3aed; color: #fff; border: none; border-radius: 8px; cursor: pointer; transition: opacity 0.2s; }
        .land-btn-primary:hover { opacity: 0.85; }
        .land-btn-primary:active { transform: scale(0.98); }
        .land-btn-secondary { padding: 11px 28px; font-size: 14px; border: 0.5px solid #3b3b5c; background: transparent; color: #a0a0c0; border-radius: 8px; cursor: pointer; transition: border-color 0.2s; }
        .land-btn-secondary:hover { border-color: #7c3aed55; color: #a78bfa; }
        .land-nav-outline { padding: 7px 16px; font-size: 13px; border: 0.5px solid #3b3b5c; border-radius: 8px; background: transparent; color: #a0a0c0; cursor: pointer; transition: all 0.2s; }
        .land-nav-outline:hover { border-color: #7c3aed55; color: #a78bfa; }
        .land-nav-solid { padding: 7px 16px; font-size: 13px; border: none; border-radius: 8px; background: #7c3aed; color: #fff; cursor: pointer; font-weight: 500; }
      `}</style>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem', borderBottom: '0.5px solid #1e1e2e' }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: '#fff', letterSpacing: '0.05em' }}>
          URL<span style={{ color: '#7c3aed' }}>.</span>short
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => navigate({ to: '/auth' })} className="land-nav-outline">Login</button>
          <button onClick={() => navigate({ to: '/auth' })} className="land-nav-solid">Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '4rem 2rem 3rem', position: 'relative' }}>
        <div style={{
          width: 400, height: 400, borderRadius: '50%', background: '#7c3aed18',
          position: 'absolute', top: -50, left: '50%',
          filter: 'blur(80px)', pointerEvents: 'none',
          animation: 'pulse 4s ease-in-out infinite'
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11,
          padding: '4px 12px', borderRadius: 20, background: '#1a0a2e',
          border: '0.5px solid #7c3aed55', color: '#a78bfa',
          marginBottom: '1.5rem', position: 'relative', zIndex: 1
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', animation: 'blink 1.5s ease-in-out infinite' }} />
          Now with custom slugs
        </div>

        <h1 style={{ fontSize: 38, fontWeight: 500, color: '#fff', lineHeight: 1.15, marginBottom: '1rem', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1 }}>
          Shorten links.<br /><span style={{ color: '#a78bfa' }}>Amplify</span> your reach.
        </h1>
        <p style={{ fontSize: 14, color: '#6b6b8a', maxWidth: 380, margin: '0 auto 2rem', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
          Turn long messy URLs into clean powerful short links. Track clicks, use custom slugs, manage everything from one dashboard.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', position: 'relative', zIndex: 1, marginBottom: '3rem' }}>
          <button onClick={() => navigate({ to: '/auth' })} className="land-btn-primary">Get started free</button>
          <button onClick={() => navigate({ to: '/home' })} className="land-btn-secondary">Try it now</button>
        </div>
      </div>

      {/* Ticker */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '0.75rem 0', borderTop: '0.5px solid #1e1e2e', borderBottom: '0.5px solid #1e1e2e', background: '#0d0d18' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #0d0d18, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #0d0d18, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div ref={tickerRef} style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content', animation: 'tickerMove 18s linear infinite' }} />
      </div>

      {/* Floating links */}
      <div ref={floatingRef} style={{ position: 'relative', height: 180, overflow: 'hidden', background: '#0a0a0f', borderBottom: '0.5px solid #1e1e2e' }} />

      {/* Features */}
      <div style={{ padding: '3rem 2rem', background: '#0d0d18', borderTop: '0.5px solid #1e1e2e' }}>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#4b4b6a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>
          Everything you need
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 700, margin: '0 auto' }}>
          {[
            {
              title: 'Custom slugs',
              desc: 'Choose your own short URL that\'s memorable and on-brand.',
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 10.5L2 8l4-2.5M10 5.5L14 8l-4 2.5M9 4l-2 8" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round"/></svg>
            },
            {
              title: 'Click analytics',
              desc: 'See how many times your links have been clicked in real time.',
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="10" width="3" height="4" rx="1" fill="#a78bfa"/><rect x="6.5" y="6" width="3" height="8" rx="1" fill="#a78bfa" opacity="0.6"/><rect x="11" y="2" width="3" height="12" rx="1" fill="#a78bfa" opacity="0.3"/></svg>
            },
            {
              title: 'Dashboard',
              desc: 'Manage all your shortened links from one clean interface.',
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" fill="#a78bfa"/><rect x="9" y="2" width="5" height="5" rx="1" fill="#a78bfa" opacity="0.5"/><rect x="2" y="9" width="5" height="5" rx="1" fill="#a78bfa" opacity="0.5"/><rect x="9" y="9" width="5" height="5" rx="1" fill="#a78bfa"/></svg>
            },
          ].map((f) => (
            <div key={f.title} className="land-feature-card">
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1a0a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 13, fontWeight: 500, color: '#e0e0ff', marginBottom: 4 }}>{f.title}</h3>
              <p style={{ fontSize: 12, color: '#6b6b8a', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 500, margin: '2rem auto', padding: '0 2rem' }}>
        {[{ num: '10k+', label: 'Links created' }, { num: '99%', label: 'Uptime' }, { num: '0ms', label: 'Added latency' }].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 500, color: '#a78bfa' }}>{s.num}</div>
            <div style={{ fontSize: 12, color: '#4b4b6a', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '3rem 2rem', borderTop: '0.5px solid #1e1e2e' }}>
        <div style={{ background: '#111120', border: '0.5px solid #7c3aed44', borderRadius: 12, padding: '2.5rem', maxWidth: 400, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: '#fff', marginBottom: '0.5rem' }}>Ready to begin?</h2>
          <p style={{ fontSize: 13, color: '#6b6b8a', marginBottom: '1.5rem' }}>No credit card. Free forever.</p>
          <button onClick={() => navigate({ to: '/auth' })} className="land-btn-primary" style={{ width: '100%', padding: 12 }}>
            Create free account
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '1.25rem', borderTop: '0.5px solid #1e1e2e', fontSize: 11, color: '#3b3b5c' }}>
        Built with React + Node.js
      </div>

    </div>
  )
}

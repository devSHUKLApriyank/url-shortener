import { useState } from 'react'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'

export function AuthPage() {
  const [tab, setTab] = useState('login')

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateX(-50%) scale(1.08); }
        }
        .auth-input {
          width: 100%;
          height: 44px;
          padding: 0 1rem;
          font-size: 14px;
          background: #0d0d18;
          border: 0.5px solid #2a2a40;
          border-radius: 8px;
          color: #e0e0ff;
          outline: none;
          transition: border-color 0.2s;
        }
        .auth-input::placeholder { color: #3b3b5c; }
        .auth-input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px #7c3aed18; }
        .auth-btn {
          width: 100%;
          height: 44px;
          font-size: 14px;
          font-weight: 500;
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .auth-btn:hover { opacity: 0.85; }
        .auth-btn:active { transform: scale(0.98); }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .auth-label { display: block; font-size: 12px; font-weight: 500; color: #6b6b8a; margin-bottom: 6px; letter-spacing: 0.02em; }
        .auth-switch-btn { background: none; border: none; color: #a78bfa; font-size: 13px; cursor: pointer; font-weight: 500; padding: 0; }
        .auth-switch-btn:hover { text-decoration: underline; }
        .eye-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #3b3b5c; padding: 4px; transition: color 0.2s; }
        .eye-btn:hover { color: #a78bfa; }
        .tab-btn { flex: 1; padding: 8px; font-size: 13px; font-weight: 500; border: none; cursor: pointer; border-radius: 6px; transition: all 0.2s; }
      `}</style>

      {/* Glow */}
      <div style={{ width: 350, height: 350, borderRadius: '50%', background: '#7c3aed15', position: 'fixed', top: '10%', left: '50%', filter: 'blur(80px)', pointerEvents: 'none', animation: 'pulse 4s ease-in-out infinite' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1, animation: 'fadeUp 0.6s ease forwards' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: 20, fontWeight: 500, color: '#fff', letterSpacing: '0.05em' }}>
            URL<span style={{ color: '#7c3aed' }}>.</span>short
          </span>
          <p style={{ fontSize: 13, color: '#4b4b6a', marginTop: 6 }}>
            {tab === 'login' ? 'Welcome back. Sign in to continue.' : 'Create your free account.'}
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#111120', border: '0.5px solid #1e1e2e', borderRadius: 16, padding: '2rem' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', background: '#0d0d18', borderRadius: 8, padding: 4, marginBottom: '1.5rem', gap: 4 }}>
            <button
              onClick={() => setTab('login')}
              className="tab-btn"
              style={{ background: tab === 'login' ? '#7c3aed' : 'transparent', color: tab === 'login' ? '#fff' : '#4b4b6a' }}
            >
              Sign in
            </button>
            <button
              onClick={() => setTab('register')}
              className="tab-btn"
              style={{ background: tab === 'register' ? '#7c3aed' : 'transparent', color: tab === 'register' ? '#fff' : '#4b4b6a' }}
            >
              Register
            </button>
          </div>

          {tab === 'login' && <LoginForm onSwitch={() => setTab('register')} />}
          {tab === 'register' && <RegisterForm onSwitch={() => setTab('login')} />}
        </div>
      </div>
    </div>
  )
}

import { useNavigate } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import { registerStart, registerSuccess, registerFailure } from '../store/authSlice'
import { registerUser, getCurrentUser } from '../api/user.api'
import { useState } from 'react'

const EyeOpen = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

const EyeClosed = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 2l12 12M6.5 6.6A2 2 0 0010 10M1 8s1.2-2.3 3.5-3.7M7.5 3.1C7.67 3.04 7.83 3 8 3c4.5 0 7 5 7 5a12.3 12.3 0 01-1.9 2.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

export function RegisterForm({ onSwitch }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirm) {
      dispatch(registerFailure('Please fill in all fields.'))
      return
    }
    if (password !== confirm) {
      dispatch(registerFailure('Passwords do not match.'))
      return
    }
    if (password.length < 6) {
      dispatch(registerFailure('Password must be at least 6 characters.'))
      return
    }
    dispatch(registerStart())
    try {
      await registerUser(name, email, password)
      const userRes = await getCurrentUser()
      dispatch(registerSuccess(userRes.user))
      navigate({ to: '/dashboard' })
    } catch (err) {
      dispatch(registerFailure(err.message || 'Registration failed. Try again.'))
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <label className="auth-label">Full name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="auth-input" />
      </div>

      <div>
        <label className="auth-label">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="auth-input" />
      </div>

      <div>
        <label className="auth-label">Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 characters"
            className="auth-input"
            style={{ paddingRight: '2.5rem' }}
          />
          <button type="button" onClick={() => setShowPw(!showPw)} className="eye-btn">
            {showPw ? <EyeClosed /> : <EyeOpen />}
          </button>
        </div>
      </div>

      <div>
        <label className="auth-label">Confirm password</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" className="auth-input" />
      </div>

      {error && <p style={{ fontSize: 12, color: '#ef4444', margin: 0 }}>{error}</p>}

      <button type="submit" disabled={loading} className="auth-btn">
        {loading ? 'Creating account...' : 'Create account'}
      </button>

      <p style={{ textAlign: 'center', fontSize: 13, color: '#4b4b6a', margin: 0 }}>
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="auth-switch-btn">Sign in</button>
      </p>
    </form>
  )
}

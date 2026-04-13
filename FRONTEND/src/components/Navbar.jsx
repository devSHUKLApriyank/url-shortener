import { Link, useNavigate } from '@tanstack/react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { logoutUser } from '../api/user.api'

export function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (err) {
      console.log('Logout error:', err)
    } finally {
      dispatch(logout())
      navigate({ to: '/auth' })
    }
  }

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Left - Brand name */}
        <span className="text-lg font-bold text-gray-800">
          URL Shortener
        </span>

        {/* Center - Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/home"
            className="text-sm text-gray-500 hover:text-gray-800 transition"
            activeProps={{ className: 'text-sm text-gray-900 font-medium' }}
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-sm text-gray-500 hover:text-gray-800 transition"
              activeProps={{ className: 'text-sm text-gray-900 font-medium' }}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right - User info or Login */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <span className="text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 active:scale-95 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 active:scale-95 transition"
          >
            Login
          </Link>
        )}

      </div>
    </nav>
  )
}

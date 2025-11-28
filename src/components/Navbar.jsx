import { Link, useNavigate } from 'react-router-dom'
import { clearToken } from '../auth'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
    const { user, isAdmin } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        clearToken()
        navigate('/products')  // redirect to homepage
    }

    return (
        <header className="bg-beige border-b border-sienna/10">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/products" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E2725B' }}>
                        <span className="text-beige font-semibold">KN</span>
                    </div>
                    <div>
                        <h1 className="text-sienna font-semibold text-lg">KraftNest</h1>
                        <p className="text-sienna/60 text-xs">Handcrafted by home artisans</p>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/products" className="text-sienna/90">Home</Link>
                    <Link to="/products" className="text-sienna/90">Explore</Link>

                    {isAdmin && (
                        <Link to="/admin" className="px-3 py-1 border rounded-md text-sienna" style={{ borderColor: '#A0522D' }}>
                            Admin
                        </Link>
                    )}

                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sienna/70 text-sm">{user?.sub || user?.username}</span>
                            <button onClick={handleLogout} className="px-3 py-1 rounded-md bg-sienna text-beige">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="px-3 py-1 rounded-md border border-sienna">Login</Link>
                            <Link to="/register" className="px-3 py-1 rounded-md bg-terracotta text-beige">Sign up</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

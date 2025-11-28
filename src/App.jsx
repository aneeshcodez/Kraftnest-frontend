import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import useAuth from './hooks/useAuth'
import AdminDashboard from './pages/AdminDashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Register from './pages/Register'

function RequireAdmin({ children }) {
    const { isAdmin } = useAuth()
    if (!isAdmin) return <Navigate to="/login" replace />
    return children
}

export default function App() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* ADD THIS */}
                <Route path="/products" element={<Home />} />

                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />

                {/* FALLBACK */}
                <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
        </div>
    )
}

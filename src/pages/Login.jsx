import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'
import { saveToken } from '../auth'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function submit(e) {
        e.preventDefault()
        setError(null)
        try {
            const res = await login(username, password)
            saveToken(res.token || res)      // save token and update auth listeners
            navigate('/products')            // redirect to homepage
        } catch (err) {
            setError(err.message || 'Login failed')
        }
    }

    return (
        <main className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-semibold text-sienna mb-3">Welcome back</h2>
            <form onSubmit={submit} className="space-y-3 bg-beige p-4 rounded-xl border">
                <div>
                    <label className="text-xs text-sienna/70">Username</label>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border"
                    />
                </div>
                <div>
                    <label className="text-xs text-sienna/70">Password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="w-full px-3 py-2 rounded-md border"
                    />
                </div>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <div className="flex justify-end">
                    <button className="px-4 py-2 rounded-md bg-sienna text-beige">Login</button>
                </div>
            </form>
        </main>
    )
}

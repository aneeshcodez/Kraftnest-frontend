import jwtDecode from 'jwt-decode'

let currentUser = null
let listeners = []

export function saveToken(token) {
    localStorage.setItem('token', token)
    currentUser = getUserFromToken()
    listeners.forEach(cb => cb(currentUser))
}

export function getToken() {
    return localStorage.getItem('token')
}

export function clearToken() {
    localStorage.removeItem('token')
    currentUser = null
    listeners.forEach(cb => cb(currentUser))
}

export function getUserFromToken() {
    const token = getToken()
    if (!token) return null
    try {
        const data = jwtDecode(token)
        return data
    } catch (e) {
        return null
    }
}

export function isAdmin() {
    const user = getUserFromToken()
    if (!user) return false
    const roles = user.roles || user.authorities || []
    if (Array.isArray(roles)) return roles.includes('ROLE_ADMIN')
    if (typeof roles === 'string') return roles.includes('ROLE_ADMIN')
    return false
}

// Allows React hooks to subscribe to user changes
export function subscribeAuth(cb) {
    listeners.push(cb)
    // return unsubscribe function
    return () => {
        listeners = listeners.filter(l => l !== cb)
    }
}

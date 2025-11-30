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

/**
 * Helper to check a roles/authorities value for ROLE_ADMIN.
 * Accepts:
 *  - array of strings: ["ROLE_ADMIN"]
 *  - string: "ROLE_ADMIN" or "ROLE_USER,ROLE_ADMIN"
 *  - array of objects: [{authority: "ROLE_ADMIN"}, {role: "ROLE_USER"}]
 */
function checkRolesForAdmin(roles) {
    if (!roles) return false

    // string case (comma separated or single)
    if (typeof roles === 'string') {
        return roles.split(',').map(s => s.trim()).includes('ROLE_ADMIN')
    }

    if (Array.isArray(roles)) {
        if (roles.length === 0) return false

        // array of strings
        if (roles.every(r => typeof r === 'string')) {
            return roles.includes('ROLE_ADMIN')
        }

        // array of objects - look for common keys
        return roles.some(r => {
            if (!r) return false
            if (typeof r === 'string') return r === 'ROLE_ADMIN'
            // common token shapes: { authority: 'ROLE_ADMIN' } or { role: 'ROLE_ADMIN' } or { name: 'ROLE_ADMIN' }
            const v = r.authority || r.role || r.name || r.permission
            if (typeof v === 'string') return v === 'ROLE_ADMIN'
            // maybe object nested: { authority: { name: 'ROLE_ADMIN' } } — handle simple nested case
            if (typeof v === 'object' && v !== null) {
                return Object.values(v).some(val => String(val) === 'ROLE_ADMIN')
            }
            return false
        })
    }

    // unknown type
    return false
}

export function isAdmin() {
    const user = getUserFromToken()
    if (!user) return false
    const roles = user.roles || user.authorities || user.role || []
    return checkRolesForAdmin(roles)
}

// Allows React hooks to subscribe to user changes
export function subscribeAuth(cb) {
    listeners.push(cb)
    // return unsubscribe function
    return () => {
        listeners = listeners.filter(l => l !== cb)
    }
}

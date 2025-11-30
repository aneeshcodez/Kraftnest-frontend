import { useEffect, useState } from 'react'
import { isAdmin as checkIsAdmin, getUserFromToken, subscribeAuth } from '../auth'

export default function useAuth() {
    const [user, setUser] = useState(getUserFromToken())

    useEffect(() => {
        const unsubscribe = subscribeAuth(setUser)
        return unsubscribe
    }, [])

    // Use the centralized isAdmin() logic from auth.js (reads token)
    const isAdmin = checkIsAdmin()

    return { user, isAdmin }
}

// auth.js
import { useEffect, useState } from 'react'
import { getUserFromToken, subscribeAuth } from '../auth'

export default function useAuth() {
    const [user, setUser] = useState(getUserFromToken())

    useEffect(() => {
        const unsubscribe = subscribeAuth(setUser)
        return unsubscribe
    }, [])

    const isAdmin = user && ((user.roles && user.roles.includes('ROLE_ADMIN')) || (user.authorities && user.authorities.includes('ROLE_ADMIN')))
    return { user, isAdmin }
}

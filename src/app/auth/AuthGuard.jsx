import useAuth from 'app/hooks/useAuth'
import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useAuth()
    const [previouseRoute, setPreviousRoute] = useState(null)
    const { pathname } = useLocation()

    let authenticated = isAuthenticated

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    if (authenticated) return <>{children}</>
    else {
        return (
            <Navigate
                to="/session/signin"
                state={{ redirectUrl: previouseRoute }}
            />
        )
    }
}

export default AuthGuard

import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from 'app/auth/authRoles'

const Analytics2 = Loadable(lazy(() => import('./Analytics2')))
export const dashboardRoutes = [
    {
        path: '/',
        element: <Analytics2 height={300}/>,
        auth: authRoles.sa,
    },
]

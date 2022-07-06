import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from 'app/auth/authRoles'

const Analytics2 = Loadable(lazy(() => import('./Analytics2')))
export const dashboardRoutes = [
    {
        path: 'dashboard/default',
        element: <Analytics2 />,

        auth: authRoles.sa,
    },
]

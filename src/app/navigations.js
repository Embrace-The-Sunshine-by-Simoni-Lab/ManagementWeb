import { authRoles } from 'app/auth/authRoles'

export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
        auth: authRoles.sa // ONLY SUPER ADMIN(SA) CAN ACCESS
    },
    {
        name: 'Analytics',
        path: '/dashboard/analytics',
        icon: 'analytics',
        auth: authRoles.admin // ONLY SUPER ADMIN(SA) AND ADMIN CAN ACCESS
    },
    {
        label: 'Pages',
        type: 'label',
    },

    {
        name: 'Forms',
        icon: 'description',

        children: [
            {
                name: 'Order Form',
                path: '/forms/order-form',
                iconText: 'OF',
            },
            {
                name: 'Invoice Form',
                path: '/forms/invoice-form',
                iconText: 'IF',
            },
            {
                name: 'Property Listing Form',
                path: '/forms/property-listing-form',
                iconText: 'PF',
            },
            {
                name: 'Basic',
                path: '/forms/basic',
                iconText: 'B',
            },
            {
                name: 'Upload',
                path: '/forms/upload',
                iconText: 'U',
            },
            {
                name: 'Wizard',
                path: '/forms/wizard',
                iconText: 'W',
            },
        ],
    },
]

export const getfilteredNavigations = (navList = [], role) => {
    return navList.reduce((array, nav) => {
        if (nav.auth)
        {
            if (nav.auth.includes(role))
            {
                array.push(nav)
            }
        } else
        {
            if (nav.children)
            {
                nav.children = getfilteredNavigations(nav.children, role)
                array.push(nav)
            } else
            {
                array.push(nav)
            }
        }
        return array
    }, [])
}

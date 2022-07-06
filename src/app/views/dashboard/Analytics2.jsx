import React from 'react'
import { styled } from '@mui/system'
const AnalyticsRoot = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Analytics2 = () => {
    return (
        <AnalyticsRoot>
            Future Content here
        </AnalyticsRoot>
    )
}

export default Analytics2

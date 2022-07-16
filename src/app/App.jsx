import '../fake-db'
import React from 'react'
import { Store } from './routes/redux/Store'
import { Provider } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { AllPages } from './routes/routes'
import { MatxTheme } from './components'

const App = () => {
    const all_pages = useRoutes(AllPages())

    return (
        <Provider store={Store}>
            <SettingsProvider>
                <MatxTheme>
                    {all_pages}
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
}

export default App

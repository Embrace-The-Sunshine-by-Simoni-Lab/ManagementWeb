import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import UserPool from 'app/components/UserPool/UserPool'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const reducer = (state, action) => {
    switch (action.type)
    {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (Username, Password) => {

        await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool: UserPool,
            })
            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            })

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            user: '',
                        },
                    })
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error('failure:', err)
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log('new:', data)
                    resolve(data)
                },
            })
        })
    }

    const logout = () => {
        const user = UserPool.getCurrentUser()
        if (user) {
            user.signOut()
            dispatch({ type: 'LOGOUT' })
        }
    }

    useEffect(() => {
        (async () => {
            try
            {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken)
                {
                    const response = await axios.get('/api/auth/profile')
                    const { user } = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else
                {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err)
            {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised)
    {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

import { useContext } from 'react'
import AuthContext from 'app/contexts/JWTAuthContext'
// import AccountContext from 'app/contexts/AccountContext'
// import AuthContext from 'app/contexts/FirebaseAuthContext'
// import AuthContext from 'app/contexts/Auth0Context'


const useAuth = () => useContext(AuthContext)

export default useAuth

import usePersistedState from "../hooks/usePersistedState"
import { UserContext } from "../contexts/UserContext"

export function UserProvider({
    children
}) {

  const [authData, setAuthData] = usePersistedState({})

  const userLoginHandler = (resultData) => {
    setAuthData(resultData)
  }

  const userLogoutHandler = () => {
    setAuthData({})
  }

    return (
        <UserContext.Provider value={{...authData, userLoginHandler, userLogoutHandler}}>
            {children}
        </UserContext.Provider>
    );
}


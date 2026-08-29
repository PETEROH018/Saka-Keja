import { createContext, useState } from "react"

const LoginContext = createContext()

export function LoginContextProvider({children}) {

    const [user, setUser] = useState(null)
    return(
        <LoginContext.Provider value={{user, setUser}}>
            {children}
        </LoginContext.Provider>
    )
}

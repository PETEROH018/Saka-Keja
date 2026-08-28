import { useState } from "react";
import { AuthContext } from "./AuthContext";


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
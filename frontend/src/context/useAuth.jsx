import { useContext } from "react";
import { AuthContext } from "./AuthContext";


export function useAuth() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return {
            user: null,
            token: null,
            setUser: () => {},
            setAuth: () => {},
            setToken: () => {},
            logout: () => {},
        };
    }

    return authContext;
}
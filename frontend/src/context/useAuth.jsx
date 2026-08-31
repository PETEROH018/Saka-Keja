import { useContext } from "react";
import { AuthContext } from "./AuthContext";


export function useAuth() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return {
            user: null,
            setUser: () => {},
            logout: () => {},
        };
    }

    return authContext;
}
import { useState } from "react";
import { AuthContext } from "./AuthContext";

const USER_STORAGE_KEY = "saka_keja_user";
const TOKEN_STORAGE_KEY = "saka_keja_token";

export function AuthProvider({ children }) {
    const [user, setUserState] = useState(() => {
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY) || null);

    const setUser = (nextUser) => {
        setUserState(nextUser);
        if (nextUser) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
        } else {
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    };

    const setAuth = (nextUser, nextToken) => {
        setUser(nextUser);
        setTokenState(nextToken || null);
        if (nextToken) {
            localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
        } else {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    };

    const logout = () => {
        setUser(null);
        setTokenState(null);
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                setUser,
                setAuth,
                setToken: setTokenState,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
import { useState } from "react";
import { AuthContext } from "./AuthContext";


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);


    const login = (userData) => {
        setUser(userData);
    };


    const logout = () => {
        setUser(null);
    };

    const loginAsStudent = () => {
        setUser({
            id: 1,
            name: "Alex Student",
            role: "student",
            profile: "student"
        });
    };

    const loginAsOwner = () => {
        setUser({
            id: 2,
            name: "Mary Owner",
            role: "owner",
            profile: "owner"
        });
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loginAsStudent,
                loginAsOwner
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
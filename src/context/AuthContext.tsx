import { createContext, useContext, useEffect, useState } from "react"
import { loginUser } from "../services/user.service"
import { User } from "../types/User"

type AuthContextType = {
    user: User | null
    token: string | null
    login: (username: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    async function login(username: string, password: string) {
        const { token, user } = await loginUser({ username, password })

        setToken(token)
        setUser(user)

        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
    }

    function logout() {
        setToken(null)
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

import { createContext, useContext, useEffect, useState } from "react"
import { loginUser, updateUser } from "../services/user.service"
import { User } from "../types/User"
import { AvatarType } from "../types/AvatarType"

type UpdateUserPayload = {
    username?: string
    avatar?: AvatarType
    currentPassword?: string
    newPassword?: string
}

type AuthContextType = {
    user: User | null
    token: string | null
    login: (username: string, password: string) => Promise<void>
    logout: () => void
    updateUserProfile: (data: UpdateUserPayload) => Promise<void>
    isAuthenticated: boolean
    loading: boolean
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }

        setLoading(false)
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

async function updateUserProfile(data: UpdateUserPayload) {
        try {
            console.log("Dados enviados para atualização:", data);
            const updatedUser = await updateUser(data);
            
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Erro no AuthContext:", error);
            throw error; 
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                updateUserProfile,
                isAuthenticated: !!token,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
import { LoginResponse } from "../types/LoginResponse.ts"
import { User } from "../types/User.ts"
import { authFetch } from "./authFetch.service.ts"

const API_URL = "http://localhost:3000"

type LoginPayload = {
    username: string
    password: string
}

export async function loginUser(
    data: LoginPayload
): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Erro ao fazer login")
    }

    return response.json()
}

export async function createUser(
    user: Omit<User, "id" | "avatar" | "created_at">
): Promise<User> {
    const response = await fetch(`${API_URL}/user/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: user.username,
            password: user.password
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar usuário")
    }

    return data
}

export async function getMe(): Promise<User> {
    const response = await authFetch(`${API_URL}/user/me`)

    if (!response.ok) {
        throw new Error("Não autenticado")
    }

    return response.json()
}
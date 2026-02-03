import { LoginResponse } from "../types/LoginResponse"
import { User } from "../types/User"
import { authFetch } from "./authFetch.service"

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
    user: Omit<User, "id" | "avatar">
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

    if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário")
    }

    return response.json()
}

export async function getMe(): Promise<User> {
    const response = await authFetch(`${API_URL}/user/me`)

    
    if (!response.ok) {
        throw new Error("Não autenticado")
    }

    return response.json()
}
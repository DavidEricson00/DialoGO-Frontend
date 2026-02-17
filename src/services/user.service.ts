import { AvatarType } from "../types/AvatarType.ts"
import { LoginResponse } from "../types/LoginResponse.ts"
import { User } from "../types/User.ts"
import { authFetch } from "./authFetch.service.ts"

const API_URL = "http://localhost:3000"

type LoginPayload = {
    username: string
    password: string
}

type UpdateUserPayload = {
  username?: string
  avatar?: AvatarType
  currentPassword?: string
  newPassword?: string
}

type CreateUserPayload = {
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
    user: CreateUserPayload
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

export async function updateUser(
    user: UpdateUserPayload
): Promise<User> {

    const response = await authFetch(`${API_URL}/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: user.username,
            avatar: user.avatar,
            currentPassword: user.currentPassword,
            newPassword: user.newPassword
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Erro ao atualizar usuário");
    }

    return result;
}

export async function getUserById(id: string): Promise<User> {
    const response = await authFetch(`${API_URL}/user/${id}`)

    if (!response.ok) {
        throw new Error("Usuário não encontrado")
    }

    return response.json()
}
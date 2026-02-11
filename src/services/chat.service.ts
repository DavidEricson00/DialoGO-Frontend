import { ChatListItem, ChatDetail } from "../types/Chat"
import { authFetch } from "./authFetch.service"

const API_URL = "http://localhost:3000"

type UpdateChatPayload = {
  id: string
  name?: string
  description?: string
  password?: string
}

type CreateChatPayload = {
  name: string
  description?: string
  password?: string
}

export type GetChatsFilters = {
  search?: string
  order?: "name" | "created_at" | "users_count"
  direction?: "asc" | "desc"
  hasPassword?: boolean
}

export async function createChat(
  chat: CreateChatPayload
): Promise<ChatDetail> {
  const response = await authFetch(`${API_URL}/chat`, {
    method: "POST",
    body: JSON.stringify({
      name: chat.name,
      description: chat.description,
      password: chat.password
    })
  })

  if (!response.ok) {
    throw new Error("Erro ao criar chat")
  }

  return response.json()
}

export async function getAvailableChats(
  filters: GetChatsFilters = {}
): Promise<ChatListItem[]> {
  const params = new URLSearchParams()

  if (filters.search) params.set("search", filters.search)
  if (filters.order) params.set("order", filters.order)
  if (filters.direction) params.set("direction", filters.direction)
  if (filters.hasPassword !== undefined) {
    params.set("hasPassword", String(filters.hasPassword))
  }

  const queryString = params.toString()
  const url = `${API_URL}/chat${queryString ? `?${queryString}` : ""}`

  const response = await authFetch(url, {
    method: "GET"
  })

  if (!response.ok) {
    throw new Error("Erro ao buscar chats")
  }

  return response.json()
}

export async function getUserChats(
): Promise<ChatListItem[]> {
  const response = await authFetch(`${API_URL}/chat/me`, {
    method: "GET"
  })

  return response.json()
}


export async function getChatById(
  chatId: string
): Promise<ChatDetail> {
  const response = await authFetch(`${API_URL}/chat/${chatId}`, {
    method: "GET"
  })

  if (!response.ok) {
    throw new Error("Erro ao buscar chat")
  }

  return response.json()
}

export async function updateChat(
  chat: UpdateChatPayload
): Promise<ChatDetail> {
  const response = await authFetch(`${API_URL}/chat`, {
    method: "PATCH",
    body: JSON.stringify({
      chatId: chat.id,
      name: chat.name,
      description: chat.description,
      password: chat.password
    })
  })

  if (!response.ok) {
    throw new Error("Erro ao atualizar chat")
  }

  return response.json()
}

export async function deleteChat(chatId: string): Promise<void> {
  const response = await authFetch(`${API_URL}/chat/${chatId}`, {
    method: "DELETE"
  })

  if (!response.ok) {
    throw new Error("Erro ao deletar o chat")
  }
}

export async function joinChat(chatId: string, password?: string): Promise<void> {
  const body = password
    ? JSON.stringify({ password })
    : undefined

  const response = await authFetch(`${API_URL}/chat/join/${chatId}`, {
    method: "POST",
    body
  })

  if (!response.ok) {
    throw new Error("Erro ao entrar no chat")
  }
}

export async function leaveChat(chatId: string): Promise<void> {
  const response = await authFetch(`${API_URL}/chat/leave/${chatId}`, {
    method: "DELETE"
  })

  if (!response.ok) {
    throw new Error("Erro ao sair do chat")
  }
}

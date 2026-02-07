import { Chat } from "../types/Chat.ts";
import { authFetch } from "./authFetch.service.ts";

const API_URL = "http://localhost:3000";

type UpdateChatPayload = {
  id: string;
  name?: string;
  description?: string;
  password?: string;
};

type CreateChatPayload = {
  name: string;
  description?: string;
  password?: string;
};

export async function createChat(
  chat: CreateChatPayload
): Promise<Chat> {
  const response = await authFetch(`${API_URL}/chat`, {
    method: "POST",
    body: JSON.stringify({
      name: chat.name,
      description: chat.description,
      password: chat.password
    })
  });

  if (!response.ok) {
    throw new Error("Erro ao criar chat");
  }

  return response.json();
}

export async function getChats(): Promise<Chat[]> {
  const response = await authFetch(`${API_URL}/chat`, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar chats");
  }

  return response.json();
}

export async function getChatById(chatId: string): Promise<Chat> {
  const response = await authFetch(`${API_URL}/chat/${chatId}`, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar chat");
  }

  return response.json();
}

export async function updateChat(
  chat: UpdateChatPayload
): Promise<Chat> {
  const response = await authFetch(`${API_URL}/chat`, {
    method: "PATCH",
    body: JSON.stringify({
      chatId: chat.id,
      name: chat.name,
      description: chat.description,
      password: chat.password
    })
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar chat");
  }

  return response.json();
}

export async function deleteChat(chatId: string): Promise<void> {
  const response = await authFetch(`${API_URL}/chat/${chatId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar o chat");
  }
}

export async function joinChat(chatId: string): Promise<void> {
  const response = await authFetch(`${API_URL}/chat/join/${chatId}`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Erro ao entrar no chat");
  }
}

export async function leaveChat(chatId: string): Promise<void> {
  const response = await authFetch(`${API_URL}/chat/leave/${chatId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Erro ao sair do chat");
  }
}

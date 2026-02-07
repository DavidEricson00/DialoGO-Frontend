import { Message } from "../types/Message.ts";
import { authFetch } from "./authFetch.service.ts";

const API_URL = "http://localhost:3000";

type sendMessagePayload = {
  chat_id: string;
  content: string;
};

export async function sendMessage(
  message: sendMessagePayload
): Promise<Message> {
  const response = await authFetch(`${API_URL}/message`, {
    method: "POST",
    body: JSON.stringify({
      content: message.content,
      chatId: message.chat_id,
    })
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar mensagem");
  }

  return response.json();
}

export async function getChatMessages(chatId: string): Promise<Message[]> {
  const response = await authFetch(`${API_URL}/message/chat/${chatId}`, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar mensagens");
  }

  return response.json();
}
import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { Message } from "../../types/Message";
import ChatUsersList from "./ChatUsersList";
import { getChatById, getUsersFromChat } from "../../services/chat.service";
import { ChatListItem } from "../../types/Chat";
import { ChevronLeft, Hash, Loader2 } from "lucide-react";
import ChatInput from "../layout/ChatInput";
import { getChatMessages, sendMessage } from "../../services/message.service";

type ChatViewProps = {
  chatId: string;
  onBack: () => void;
  onLeave: () => void;
}

export default function ChatView({ chatId, onBack, onLeave }: ChatViewProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [chat, setChat] = useState<ChatListItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    loadChatData();
  }, [chatId]);

  async function loadChatData() {
    setLoading(true);
    try {
      const chatData = await getChatById(chatId);
      const chatMembers = await getUsersFromChat(chatId);

      setChat(chatData);
      setUsers(chatMembers);
    } catch (error) {
      console.error("Erro ao carregar dados do chat:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMessges() {
    try {
      const response = await getChatMessages(chatId);
      setMessages(response);
    } catch (error) {
      console.error("Erro ao carregar mensagens do chat:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleLeave = () => {
    onLeave();
    onBack();
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    try {
      await sendMessage({
        chat_id: chatId,
        content: text
      });
      setMessageText("");
      loadMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 flex h-full w-full overflow-hidden bg-gray-50">
      
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        
        <header className="h-20 px-4 md:px-6 bg-white border-b border-gray-200 flex items-center shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 w-full">
            <button 
              onClick={onBack} 
              className="p-2 -ml-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-100">
                <Hash size={22} strokeWidth={2.5} />
              </div>
              
              <div className="flex flex-col min-w-0">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin text-blue-600" size={16} />
                    <span className="text-sm font-medium text-gray-400">Sincronizando...</span>
                  </div>
                ) : (
                  <>
                    <h1 className="font-bold text-gray-800 text-base md:text-lg leading-tight truncate">
                      {chat?.name || "Carregando..."}
                    </h1>
                    <span className="text-xs font-semibold text-green-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      {users.length} membros nesse chat
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar flex flex-col">
          <div className="flex-1" />

          {!loading && users.length > 0 && (
            <div className="flex flex-col items-center justify-center py-10 opacity-60">
              <div className="px-4 py-1.5 bg-gray-200 text-gray-600 text-[11px] font-bold uppercase tracking-widest rounded-full mb-4">
                Início da conversa
              </div>
              <p className="text-sm text-gray-400 text-center max-w-xs">
                Este é o começo do chat <strong>{chat?.name}</strong>. Diga oi para seus amigos!
              </p>
            </div>
          )}

          {/* mensagens */}
        </div>

        <div className="bg-white border-t border-gray-200">
          <ChatInput
            text={messageText} 
            onTextChange={setMessageText} 
            sendText={handleSendMessage} 
          />
        </div>
      </div>

      <aside className="w-72 lg:w-80 h-full hidden md:block bg-white border-l border-gray-200 z-20">
        <ChatUsersList 
          users={users} 
          loading={loading}
          onLeaveChat={handleLeave} 
        />
      </aside>
    </div>
  );
}
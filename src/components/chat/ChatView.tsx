import { useEffect, useState } from "react";
import { User } from "../../types/User";
import ChatUsersList from "./ChatUsersList";
import { getChatById, getUsersFromChat, leaveChat } from "../../services/chat.service";
import { ChatListItem } from "../../types/Chat";
import { ChevronLeft, Hash, Loader2 } from "lucide-react";

type ChatViewProps = {
  chatId: string;
  onBack: () => void;
  onLeave: () => void;
}

export default function ChatView({ chatId, onBack, onLeave }: ChatViewProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [chat, setChat] = useState<ChatListItem | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleLeave = () => {
    onLeave();
    onBack();
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="p-4 border-b flex items-center gap-4">
           <button onClick={onBack} className="text-blue-600">← Voltar</button>
           <h1 className="font-bold">ID do chat: {chatId}</h1>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar relative">
          
          {!loading && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
               <span className="text-sm font-medium text-gray-400 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                 Início da conversa
               </span>
             </div>
          )}
        </div>
      </div>

      <aside className="w-72 lg:w-80 h-full hidden md:block bg-white border-l border-gray-200 shadow-[-4px_0_24px_-16px_rgba(0,0,0,0.1)] z-20">
        <ChatUsersList 
          users={users} 
          loading={loading}
          onLeaveChat={handleLeave} 
        />
      </aside>
    </div>
  );
}
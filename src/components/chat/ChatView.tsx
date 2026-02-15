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
    <div className="mt-4 flex h-full w-full overflow-hidden bg-gray-50">
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        <header className="h-20 px-4 md:px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack} 
              className="p-2 -ml-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all flex items-center justify-center cursor-pointer"
              title="Voltar para a lista"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100">
                <Hash size={24} strokeWidth={2} />
              </div>
              
              <div className="flex flex-col">
                {loading ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Loader2 className="animate-spin text-blue-600" size={16} />
                    <span className="text-sm font-medium text-gray-400">Carregando chat...</span>
                  </div>
                ) : (
                  <>
                    <h1 className="font-bold text-gray-800 text-lg leading-tight truncate max-w-50 md:max-w-md">
                      {chat?.name || "Chat Desconhecido"}
                    </h1>
                    <span className="text-xs font-medium text-gray-500 mt-0.5">
                      {users.length} {users.length === 1 ? 'membro' : 'membros'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
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
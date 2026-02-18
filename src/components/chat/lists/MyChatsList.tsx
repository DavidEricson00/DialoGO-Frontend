import { useEffect, useState } from "react";
import { MessageSquare, Loader2, PlusCircle } from "lucide-react";
import { ChatListItem } from "../../../types/Chat";
import { createChat, getUserChats } from "../../../services/chat.service";
import MyChatsCard from "../cards/MyChatsCard";
import CreateChatModal from "../../modals/CreateChatModal";

interface MyChatsListProps {
  refreshTrigger?: number;
  onOpenChat: (id:string) => void
}

export default function MyChatsList({ 
  refreshTrigger = 0, 
  onOpenChat
}: MyChatsListProps) {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [chatDescription, setChatDescription] = useState("");
  const [chatPassword, setChatPassword] = useState("");

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await getUserChats();
      setChats(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function openChatAction(id: string) {
    onOpenChat(id)
  }

  function handleOpenModal() {
    setChatName("");
    setChatDescription("");
    setChatPassword("");
    setIsModalOpen(true);
  }

  async function handleCreateChat() {
    await createChat({
      name: chatName,
      description: chatDescription,
      password: chatPassword
    })
    
    await fetchData()
  }

  return (
    <>
      <div className="flex flex-col h-full bg-white">
        <div className="p-10 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <MessageSquare className="text-blue-600" size={20} />
            Meus Chats
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-2 space-y-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <Loader2 className="animate-spin mb-2" size={24} />
              </div>
            ) : chats.length > 0 ? (
              chats.map((chat) => (
                <MyChatsCard
                  key={chat.id}
                  chat={chat}
                  openChat={() => openChatAction(chat.id)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <MessageSquare size={32} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500">Nenhum chat</p>
                <p className="text-xs text-gray-400 mt-1">Entre em um chat para listá-lo aqui.</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 shrink-0">
          <button
            onClick={handleOpenModal}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-100"
          >
            <PlusCircle size={20} />
            Criar chat
          </button>
        </div>
      </div>

      <CreateChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={chatName}
        onNameChange={setChatName}
        description={chatDescription}
        onDescriptionChange={setChatDescription}
        password={chatPassword}
        onPasswordChange={setChatPassword}
        createChat={handleCreateChat}
      />
    </>
  );
}
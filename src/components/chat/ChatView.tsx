import { useEffect, useState } from "react";
import { User } from "../../types/User";
import ChatUsersList from "./ChatUsersList";
import { getUsersFromChat } from "../../services/chat.service";

type ChatViewProps = {
  chatId: string;
  onBack: () => void;
}

export default function ChatView({ chatId, onBack }: ChatViewProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData();
  }, [chatId]);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await getUsersFromChat(chatId);
      setUsers(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleLeave = () => {
    onBack();
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="p-4 border-b flex items-center gap-4">
           <button onClick={onBack} className="text-blue-600">← Voltar</button>
           <h1 className="font-bold">ID do chat: {chatId}</h1>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4">
        </div>
      </div>

      <aside className="w-72 h-full hidden md:block">
        <ChatUsersList 
          users={users} 
          onLeaveChat={handleLeave} 
        />
      </aside>
    </div>
  );
}
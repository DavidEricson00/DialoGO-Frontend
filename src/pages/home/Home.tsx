import { useState } from "react";
import Header from "../../components/layout/Header"
import MyChatsList from "../../components/chat/lists/MyChatsList"
import ChatDiscoveryList from "../../components/chat/lists/ChatDiscoveryList"
import ChatView from "../../components/chat/ChatView";
import { useAuth } from "../../context/AuthContext"
import { leaveChat, deleteChat } from "../../services/chat.service";

export default function Home() {
  const { user } = useAuth(); 
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleChatJoined = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenChat = (chatId: string) => {
    setSelectedChatId(chatId)
  };

  const handleBackToDiscovery = () => {
    setSelectedChatId(null);
  };

  const handleLeaveChat = async () => {
    if (selectedChatId) {
      try {
        await leaveChat(selectedChatId);
        setRefreshTrigger((prev) => prev + 1);
        handleBackToDiscovery();
      } catch (error) {
        console.error("Erro ao sair do chat", error);
      }
    }
  };

  const handleDeleteChat = async () => {
    if (selectedChatId) {
      try {
        await deleteChat(selectedChatId);
        setRefreshTrigger((prev) => prev + 1);
        handleBackToDiscovery();
      } catch (error) {
        alert("Erro ao excluir o chat.");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {user && (
        <div className="shrink-0 z-50">
          <Header user={user} />
        </div>
      )}

      <div className="flex-1 flex pt-20 overflow-hidden">
        
        <aside className="hidden lg:block w-80 h-full border-r border-gray-200 bg-white shrink-0">
          < MyChatsList 
          refreshTrigger={refreshTrigger} 
          onOpenChat={handleOpenChat}
          />
        </aside>

        <main className="flex-1 h-full overflow-y-auto">
          <div className="max-w-full mx-auto h-full flex flex-col">

            {selectedChatId ? (
              <ChatView 
                chatId={selectedChatId}
                onBack={handleBackToDiscovery}
                onLeave={handleLeaveChat}
                onDelete={handleDeleteChat}
              />
            ) : (
              <ChatDiscoveryList 
              refreshTrigger={refreshTrigger} 
              onChatJoined={handleChatJoined} 
              />
            )}
          </div>
        </main>
        
      </div>
    </div>
  );
}
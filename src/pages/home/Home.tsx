import { useState } from "react";
import Header from "../../components/layout/Header"
import MyChatsList from "../../components/chat/lists/MyChatsList"
import ChatDiscoveryList from "../../components/chat/lists/ChatDiscoveryList"
import { useAuth } from "../../context/AuthContext"

export default function Home() {
  const { user } = useAuth(); 
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleChatJoined = () => {
    setRefreshTrigger((prev) => prev + 1);
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
          <MyChatsList refreshTrigger={refreshTrigger} />
        </aside>

        <main className="flex-1 h-full overflow-y-auto">
          <div className="max-w-full mx-auto p-8">
            <ChatDiscoveryList onChatJoined={handleChatJoined} />
          </div>
        </main>
        
      </div>
    </div>
  );
}
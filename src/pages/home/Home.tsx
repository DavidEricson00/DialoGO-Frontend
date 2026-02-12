import { useEffect, useState } from "react"
import Header from "../../components/layout/Header"
import { User } from "../../types/User"
import { getMe } from "../../services/user.service"
import MyChatsList from "../../components/chat/lists/MyChatsList"
import ChatDiscoveryList from "../../components/chat/lists/ChatDiscoveryList"

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe()
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {user && (
        <div className="shrink-0 z-50">
          <Header user={user} />
        </div>
      )}

      <div className="flex-1 flex pt-20 overflow-hidden">
        
        <aside className="hidden lg:block w-80 h-full border-r border-gray-200 bg-white shrink-0">
          <MyChatsList />
        </aside>

        <main className="flex-1 h-full overflow-y-auto">
          <div className="max-w-full mx-auto p-8">
            <ChatDiscoveryList />
          </div>
        </main>
        
      </div>
    </div>
  );
}
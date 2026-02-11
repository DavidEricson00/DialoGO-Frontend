import { useEffect, useState } from "react";
import { ChatSearchBar } from "../../layout/ChatSearchBar";
import ChatFilterController from "../../layout/ChatFilterController";
import { ChatListItem } from "../../../types/Chat";
import { getAvailableChats, joinChat } from "../../../services/chat.service";
import ChatDiscoveryCard from "../cards/ChatDiscoveryCard";
import JoinChatModal from "../../modals/JoinChatModal";
import { Loader2, MessageSquareOff } from "lucide-react";

type SortOption = "date" | "name" | "users";
type SortDirection = "asc" | "desc";

export default function ChatDiscoveryList() {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [hasPassword, setHasPassword] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
  const [chatPassword, setChatPassword] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await getAvailableChats();
      setChats(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleJoinChat(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedChat) return;

    const passwordToSend =
      selectedChat.has_password ? chatPassword : undefined;

    joinChat(selectedChat.id, passwordToSend);
    setSelectedChat(null);
    setChatPassword("");
  }

  function enterChatAction(chat: ChatListItem) {
    setSelectedChat(chat);
    setChatPassword("");
  }

  function searchText(query: string) {
    console.log("Searching:", query, { hasPassword, sortBy, sortDirection });
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {selectedChat && (
        <JoinChatModal
          chat={selectedChat}
          password={chatPassword}
          onPasswordChange={setChatPassword}
          joinChat={handleJoinChat}
          onClose={() => setSelectedChat(null)}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        <div className="flex-1 w-full order-2 lg:order-1">
          <div className="mb-6">
            <ChatSearchBar
              text={text}
              searchText={searchText}
              setText={setText}
              clearSearchBar={() => setText("")}
            />
          </div>

          <div className="w-full">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="animate-spin mb-2" size={32} />
                <p className="font-medium">Buscando chats disponíveis...</p>
              </div>
            ) : chats.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {chats.map((chat) => (
                  <ChatDiscoveryCard
                    key={chat.id}
                    chat={chat}
                    enterChat={() => enterChatAction(chat)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 text-gray-400">
                <MessageSquareOff size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium text-gray-600">Nenhum chat por aqui</p>
                <p className="text-sm">Tente mudar os termos da busca ou filtros.</p>
              </div>
            )}
          </div>
        </div>

        <aside className="w-full lg:w-80 shrink-0 order-1 lg:order-2 lg:sticky lg:top-8">
          <ChatFilterController
            hasPassword={hasPassword}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={setSortBy}
            onSortDirectionChange={setSortDirection}
            onHasPasswordToggle={() => setHasPassword(!hasPassword)}
            applyFilters={() => searchText(text)}
          />
        </aside>
      </div>
    </div>
  );
}
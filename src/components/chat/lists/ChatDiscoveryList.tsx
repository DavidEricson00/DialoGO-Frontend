import { useEffect, useState } from "react";
import { ChatSearchBar } from "../../layout/ChatSearchBar";
import ChatFilterController from "../../layout/ChatFilterController";
import { ChatListItem } from "../../../types/Chat";
import { getAvailableChats, joinChat, GetChatsFilters } from "../../../services/chat.service";
import ChatDiscoveryCard from "../cards/ChatDiscoveryCard";
import JoinChatModal from "../../modals/JoinChatModal";
import { Loader2, MessageSquareOff } from "lucide-react";

type SortDirection = "asc" | "desc";

interface ChatDiscoveryListProps {
  refreshTrigger?: number;
  onChatJoined?: () => void;
}

export default function ChatDiscoveryList({ 
  refreshTrigger = 0,
  onChatJoined
}: ChatDiscoveryListProps) {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [hasPassword, setHasPassword] = useState<boolean | undefined>(undefined);
  const [sortBy, setSortBy] = useState<GetChatsFilters["order"]>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
  const [chatPassword, setChatPassword] = useState("");

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  function buildFilters(): GetChatsFilters {
    return {
      search: text || undefined,
      order: sortBy,
      direction: sortDirection,
      hasPassword
    };
  }

  async function fetchData(filters?: GetChatsFilters) {
    setLoading(true);
    try {
      const response = await getAvailableChats(filters ?? buildFilters());
      setChats(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleJoinChat(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedChat) return;

    try {
      const passwordToSend =
        selectedChat.has_password ? chatPassword : undefined;

      await joinChat(selectedChat.id, passwordToSend);

      await fetchData();

      onChatJoined?.();

      setSelectedChat(null);
      setChatPassword("");
    } catch (err) {
      console.error(err);
    }
  }

  function enterChatAction(chat: ChatListItem) {
    setSelectedChat(chat);
    setChatPassword("");
  }

  function searchText(query: string) {
    setText(query);
    fetchData({
      ...buildFilters(),
      search: query || undefined
    });
  }

  function applyFilters() {
    fetchData(buildFilters());
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
              clearSearchBar={() => {
                setText("");
                fetchData({
                  ...buildFilters(),
                  search: undefined
                });
              }}
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
            onHasPasswordChange={setHasPassword}
            applyFilters={applyFilters}
          />
        </aside>
      </div>
    </div>
  );
}
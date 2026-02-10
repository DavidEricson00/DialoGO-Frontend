import { Users, Lock, Unlock, ArrowRight } from "lucide-react";
import { ChatListItem } from "../../../types/Chat";

type ChatDiscoveryCardProps = {
  chat: ChatListItem;
  enterChat: () => void;
};

export default function ChatDiscoveryCard({
  chat,
  enterChat,
}: ChatDiscoveryCardProps) {
  return (
    <div
      onClick={enterChat}
      className="group relative flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:border-blue-300 cursor-pointer mb-3 gap-4"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors truncate max-w-37.5 xs:max-w-[200px] md:max-w-[300px] lg:max-w-none">
            {chat.name}
          </h3>
          
          <div className="shrink-0">
            {chat.has_password ? (
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                <Lock size={10} /> Privado
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                <Unlock size={10} /> Público
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-1 italic">
          {chat.description}
        </p>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1.5" title="Membros">
            <Users size={18} className="text-gray-400" />
            <span className="text-sm font-medium">{chat.users_count}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Entrar <ArrowRight size={16} />
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
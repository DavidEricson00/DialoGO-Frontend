import { Hash, Lock, Users, ChevronRight } from "lucide-react";
import { ChatListItem } from "../../../types/Chat";

type MyChatsCardProps = {
  chat: ChatListItem;
  openChat: () => void;
};

export default function MyChatsCard({ 
  chat, 
  openChat 
}: MyChatsCardProps) {
  return (
    <div
      onClick={openChat}
      className="group flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200"
    >
      <div className={`
        flex items-center justify-center w-10 h-10 shrink-0 rounded-lg transition-colors
        ${chat.has_password 
          ? "bg-amber-100 text-amber-600 group-hover:bg-amber-200" 
          : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
        }
      `}>
        {chat.has_password ? <Lock size={16} /> : <Hash size={18} />}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-between items-center mb-0.5">
          <h4 className="text-sm font-semibold text-gray-800 truncate pr-2 group-hover:text-blue-700 transition-colors">
            {chat.name}
          </h4>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1 shrink-0">
            <Users size={10} />
            {chat.users_count}
          </span>
          <span className="text-gray-300">•</span>
          <p className="truncate opacity-80 max-w-30">
            {chat.description || "Sem descrição"}
          </p>
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 -ml-2">
        <ChevronRight size={16} />
      </div>
    </div>
  );
}
import { Users, LogOut, Loader2 } from "lucide-react";
import { User } from "../../types/User";
import { getAvatarPath } from "../../utils/getAvatarPath";

interface ChatUsersListProps {
  users: User[];
  loading?: boolean;
  onLeaveChat: () => void;
}

export default function ChatUsersList({ 
  users, 
  loading = false, 
  onLeaveChat 
}: ChatUsersListProps) {
  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-100">
      <div className="p-5 border-b border-gray-100 shrink-0">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-blue-600" size={20} />
          Usuários
          <span className="ml-auto text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            {users.length}
          </span>
        </h2>
      </div>

     <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-2 space-y-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <Loader2 className="animate-spin mb-2" size={24} />
              <p className="text-xs">Carregando membros...</p>
            </div>
          ) : users.length > 0 ? (
            users.map((user) => (
              <div 
                key={user.id} 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="relative shrink-0">
                  <img 
                    src={getAvatarPath(user.avatar) || "/default-avatar.png"} 
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-blue-100 transition-all"
                  />
                </div>
                
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-700 truncate">
                    {user.username}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center px-4">
              <p className="text-sm text-gray-400">Nenhum usuário online.</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 shrink-0 bg-gray-50/50">
        <button
          onClick={onLeaveChat}
          className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-all active:scale-[0.98]"
        >
          <LogOut size={18} />
          Sair do chat
        </button>
      </div>
    </div>
  );
}
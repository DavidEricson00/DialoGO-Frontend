import { Users, LogOut, Loader2, Trash2 } from "lucide-react";
import { User } from "../../types/User";
import { getAvatarPath } from "../../utils/getAvatarPath";
import { useAuth } from "../../context/AuthContext";

interface ChatUsersListProps {
  users: User[];
  loading?: boolean;
  onLeaveChat: () => void;
  onDeleteChat: () => void;
  isOwner: boolean;
  ownerId: string | number;
}

export default function ChatUsersList({
  users,
  loading = false,
  onLeaveChat,
  onDeleteChat,
  isOwner,
  ownerId,
}: ChatUsersListProps) {
  const { user: currentUser } = useAuth();
  const owner = users.find((u) => String(u.id) === String(ownerId));
  const members = users.filter((u) => String(u.id) !== String(ownerId));

  const UserItem = ({ user }: { user: User }) => {
    const isMe = String(currentUser?.id) === String(user.id);

    return (
      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
        <div className="relative shrink-0">
          <img
            src={getAvatarPath(user.avatar) || "/default-avatar.png"}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-blue-100 transition-all"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700 truncate">
              {user.username}
            </span>
            {isMe && (
              <span className="text-[9px] font-bold bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                (Você)
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

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
        <div className="p-2 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <Loader2 className="animate-spin mb-2" size={24} />
              <p className="text-xs">Carregando membros...</p>
            </div>
          ) : (
            <>
              {owner && (
                <div>
                  <h3 className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Anfitrião</h3>
                  <UserItem user={owner} />
                </div>
              )}

              {members.length > 0 && (
                <div>
                  <h3 className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Membros</h3>
                  <div className="space-y-1">
                    {members.map((user) => (
                      <UserItem key={user.id} user={user} />
                    ))}
                  </div>
                </div>
              )}

              {!owner && members.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                  <p className="text-sm text-gray-400">Nenhum usuário online.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="p-4 border-t-2 border-gray-200 shrink-0 bg-gray-50/50">
        {isOwner ? (
          <button
            onClick={onDeleteChat}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-red-200"
          >
            <Trash2 size={18} />
            Excluir Chat
          </button>
        ) : (
          <button
            onClick={onLeaveChat}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-xl transition-all active:scale-[0.98]"
          >
            <LogOut size={18} />
            Sair do chat
          </button>
        )}
      </div>
    </div>
  );
}
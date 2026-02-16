import { useState, useEffect } from "react";
import { Message } from "../../types/Message";
import { User } from "../../types/User";
import { getUserById } from "../../services/user.service";
import { getAvatarPath } from "../../utils/getAvatarPath";
import { AvatarType } from "../../types/AvatarType";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      if (!message.user_id) return;
      
      try {
        setIsLoading(true);
        const response = await getUserById(message.user_id);
        if (isMounted) setUser(response);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchUser();

    return () => { isMounted = false };
  }, [message.user_id]);

  const formattedTime = new Date(message.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const avatarSrc = getAvatarPath(user?.avatar ?? AvatarType.avatar_1);

  return (
    <div className="flex gap-4 p-4 hover:bg-gray-50 transition-colors rounded-lg w-full">
      <div className="shrink-0">
        {isLoading ? (
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
        ) : (
          <img 
            src={avatarSrc} 
            alt={user?.username || "Usuário"} 
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
        )}
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-baseline gap-2">
          {isLoading ? (
             <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          ) : (
             <h3 className="font-semibold text-gray-900 text-sm">
                {user?.username || "Usuário Desconhecido"}
             </h3>
          )}
          
          <span className="text-xs text-gray-400 select-none">
            {formattedTime}
          </span>
        </div>

        <div className="mt-1 text-gray-700 text-base leading-relaxed">
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
}
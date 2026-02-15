import { ChatListItem } from "../../types/Chat";
import { Lock, X } from "lucide-react";

type JoinChatModalProps = {
  chat: ChatListItem;
  password: string;
  onPasswordChange: (password: string) => void;
  joinChat: (e: React.FormEvent) => void;
  onClose: () => void;
};

export default function JoinChatModal({
  password,
  onPasswordChange,
  joinChat,
  chat,
  onClose,
}: JoinChatModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <form 
        onSubmit={joinChat}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xs font-bold uppercase text-blue-600 tracking-wider">Entrar no chat</h2>
              <h1 className="text-2xl font-bold text-gray-900">{chat.name}</h1>
            </div>
            <button type="button" onClick={onClose} className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          <p className="text-gray-500 text-sm mb-6 wrap-break-word leading-tight">{chat.description}</p>

          {chat.has_password && (
            <div className="space-y-2 mb-6">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock size={14} /> Senha de acesso
              </label>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Digite a senha do chat"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cursor-pointer flex-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-200 transition-colors"
            >
              Entrar no chat
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
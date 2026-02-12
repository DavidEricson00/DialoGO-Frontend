import { X, PlusCircle, AlignLeft, Lock, MessageSquare } from "lucide-react";
import React from "react";

type CreateChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  password: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onPasswordChange: (password: string) => void;
  createChat: () => void;
};

export default function CreateChatModal({
  isOpen,
  onClose,
  name,
  description,
  password,
  onNameChange,
  onDescriptionChange,
  onPasswordChange,
  createChat,
}: CreateChatModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createChat();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Criar novo chat</h2>
            <p className="text-sm text-gray-500">Inicie uma nova conversa com seus amigos</p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
          <div className="p-6 space-y-5">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nome do chat <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                  <MessageSquare size={18} />
                </div>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="Ex: Time de Desenvolvimento"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Descrição <span className="text-xs text-gray-400 font-normal">(Opcional)</span>
              </label>
              <div className="relative group">
                <div className="absolute top-3 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                  <AlignLeft size={18} />
                </div>
                <textarea
                  value={description || ""}
                  onChange={(e) => onDescriptionChange(e.target.value)}
                  placeholder="Sobre o que é este chat?"
                  rows={3}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Senha de acesso <span className="text-xs text-gray-400 font-normal">(Opcional)</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password || ""}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  placeholder="Deixe em branco para chat público"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={onClose}
              type="button"
              className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="cursor-pointer flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <PlusCircle size={18} />
              Criar chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { X, PlusCircle, AlignLeft, Lock, MessageSquare, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

type CreateChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  password: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onPasswordChange: (password: string) => void;
  createChat: () => Promise<void>; // Alterado para Promise para permitir o await
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) return;

    setIsLoading(true);

    try {
      await createChat();
      setSuccess("Chat criado com sucesso!");
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Erro ao criar o chat.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading && !success) {
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
            onClick={handleClose}
            type="button"
            disabled={isLoading || !!success}
            className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
          <div className="p-6 space-y-5">
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Nome do chat <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-gray-400">
                  ({name.length}/32)
                </span>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                  <MessageSquare size={18} />
                </div>
                <input
                  required
                  disabled={isLoading || !!success}
                  type="text"
                  value={name}
                  onChange={e => {
                    if (e.target.value.length <= 32) onNameChange(e.target.value)
                  }}
                  placeholder="Ex: Time de Desenvolvimento"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Descrição <span className="text-xs text-gray-400 font-normal">(Opcional)</span>
                </label>
                <span className="text-xs text-gray-400">
                  ({(description || "").length}/128)
                </span>
              </div>
              <div className="relative group">
                <div className="absolute top-3 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                  <AlignLeft size={18} />
                </div>
                <textarea
                  disabled={isLoading || !!success}
                  value={description || ""}
                  onChange={e => {
                    if (e.target.value.length <= 128) onDescriptionChange(e.target.value)
                  }}
                  placeholder="Sobre o que é este chat?"
                  rows={3}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 resize-none disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Senha de acesso <span className="text-xs text-gray-400 font-normal">(Opcional)</span>
                </label>
                <span className="text-xs text-gray-400">
                  ({(password || "").length}/100)
                </span>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                  <Lock size={18} />
                </div>
                <input
                  disabled={isLoading || !!success}
                  type="password"
                  value={password || ""}
                  onChange={e => {
                    if (e.target.value.length <= 100) onPasswordChange(e.target.value)
                  }}
                  placeholder="Deixe em branco para chat público"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-sm font-medium rounded-lg animate-in slide-in-from-top-1 duration-200 border border-red-100">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 text-sm font-medium rounded-lg animate-in slide-in-from-top-1 duration-200 border border-green-100">
                <CheckCircle size={16} className="shrink-0" />
                <span>{success}</span>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={handleClose}
              type="button"
              disabled={isLoading || !!success}
              className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name.trim() || isLoading || !!success}
              className="cursor-pointer flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isLoading ? (
                 <Loader2 className="animate-spin" size={18} />
              ) : (
                <PlusCircle size={18} />
              )}
              {isLoading ? "Criando..." : "Criar chat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
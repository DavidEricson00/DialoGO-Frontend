import { X, Save, User, AlertCircle } from "lucide-react";
import React, { useState } from "react";

type ChangeUsernameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  onUsernameChange: (value: string) => void;
  changeUsername: () => Promise<void>;
};

export default function ChangeUsernameModal({
  isOpen,
  onClose,
  username,
  onUsernameChange,
  changeUsername,
}: ChangeUsernameModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await changeUsername();
      onClose();
    } catch (err: any) {
      setError(err.message || "Este nome de usuário já está sendo utilizado.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (val: string) => {
    if (error) setError(null);
    if (val.length <= 20) onUsernameChange(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Mudar nome de usuário</h2>
            <p className="text-sm text-gray-500">Atualize como seu nome aparece para os outros</p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Novo nome de usuário
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Máx. 20 caracteres"
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 placeholder:text-gray-400 ${
                  error 
                  ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" 
                  : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                }`}
                autoFocus
              />
            </div>

            {error && (
              <div className="mt-3 flex items-center gap-2 text-red-600 text-sm font-medium animate-in slide-in-from-top-1 duration-200">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={onClose}
              type="button"
              disabled={isLoading}
              className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cursor-pointer flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!username.trim() || isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
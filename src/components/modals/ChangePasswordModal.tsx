import { X, Save, Lock, AlertCircle, KeyRound } from "lucide-react";
import React, { useState, useEffect } from "react";

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentPassword: string;
  onCurrentPasswordChange: (value: string) => void;
  newPassword: string;
  onNewPasswordChange: (value: string) => void;
  changePassword: () => void;
};

export default function ChangePasswordModal({
  isOpen,
  onClose,
  currentPassword,
  onCurrentPasswordChange,
  newPassword,
  onNewPasswordChange,
  changePassword,
}: ChangePasswordModalProps) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (confirmPassword && newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
    } else {
      setError(null);
    }
  }, [newPassword, confirmPassword]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (newPassword.length < 8) {
      setError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      await changePassword();
      onClose();
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Erro ao alterar a senha.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (val: string) => {
    if (val.length <= 100) onNewPasswordChange(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Alterar Senha</h2>
            <p className="text-sm text-gray-500">Mantenha sua conta segura atualizando sua senha</p>
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
          <div className="p-6 space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha antiga
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <KeyRound size={20} />
                </div>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => onCurrentPasswordChange(e.target.value)}
                  placeholder="Digite sua senha atual"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nova senha
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Sua nova senha"
                  maxLength={20}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repita a Nova senha
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme a nova senha"
                  maxLength={20}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-sm font-medium rounded-lg animate-in slide-in-from-top-1 duration-200 border border-red-100">
                <AlertCircle size={16} className="shrink-0" />
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
              disabled={!currentPassword || !newPassword || !confirmPassword || isLoading || !!error}
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
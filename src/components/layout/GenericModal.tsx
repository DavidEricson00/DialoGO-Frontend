import { X, AlertTriangle, Info, Check } from "lucide-react";
import React, { useState } from "react";

type ModalType = "common" | "warning";

type GenericModalProps = {
  isOpen: boolean;
  title: string;
  description: string | React.ReactNode;
  type?: ModalType;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export default function GenericModal({
  isOpen,
  title,
  description,
  type = "common",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: GenericModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  const isWarning = type === "warning";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        
        <div className="flex justify-between items-start p-6 border-b border-gray-100">
          <div className="flex gap-4 items-center">
            <div className={`p-3 rounded-full shrink-0 ${isWarning ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              {isWarning ? <AlertTriangle size={24} /> : <Info size={24} />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            type="button"
            className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 text-gray-600 text-base leading-relaxed">
          {description}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onCancel}
            type="button"
            disabled={isLoading}
            className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            type="button"
            disabled={isLoading}
            className={`cursor-pointer flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              isWarning 
                ? 'bg-red-600 hover:bg-red-700 shadow-red-200' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
            }`}
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check size={18} />
            )}
            {isLoading ? "Aguarde..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
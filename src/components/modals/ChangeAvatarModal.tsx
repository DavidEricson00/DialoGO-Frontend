import { X, Check, Save } from "lucide-react";
import { AvatarType } from "../../types/AvatarType";
import { getAvatarPath } from "../../utils/getAvatarPath";

const AVATARS: AvatarType[] = Object.values(AvatarType);

type ChangeAvatarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAvatar: AvatarType;
  onSelectAvatar: (avatar: AvatarType) => void;
  updateAvatar: () => void;
};

export default function ChangeAvatarModal({
  isOpen,
  onClose,
  selectedAvatar,
  onSelectAvatar,
  updateAvatar,
}: ChangeAvatarModalProps) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Escolha seu Avatar</h2>
            <p className="text-sm text-gray-500">Selecione uma imagem para o seu perfil</p>
          </div>
          <button 
            onClick={onClose}
            className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="cursor-pointer grid grid-cols-3 gap-6 justify-items-center">
            {AVATARS.map((avatar) => {
              const isSelected = selectedAvatar === avatar;

              return (
                <button
                  key={avatar}
                  onClick={() => onSelectAvatar(avatar)}
                  className={`
                    cursor-pointer group relative w-24 h-24 rounded-full transition-all duration-200 ease-out
                    ${isSelected 
                      ? "ring-4 ring-blue-500 ring-offset-2 scale-105 shadow-lg" 
                      : "hover:scale-105 hover:ring-4 hover:ring-gray-200 opacity-70 hover:opacity-100 grayscale-[0.5] hover:grayscale-0"
                    }
                  `}
                >
                  <img
                    src={getAvatarPath(avatar)}
                    alt={avatar}
                    className="w-full h-full object-cover rounded-full"
                  />
                  
                  {isSelected && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full shadow-md animate-in zoom-in duration-200">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              updateAvatar();
              onClose();
            }}
            className="cursor-pointer flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Save size={18} />
            Salvar Alterações
          </button>
        </div>

      </div>
    </div>
  );
}
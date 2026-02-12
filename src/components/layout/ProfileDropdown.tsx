import { LogOut, Image, UserPen } from "lucide-react";

type ProfileDropdownProps = {
    onChangeUsername: () => void;
    onChangeAvatar: () => void;
    onLogout: () => void;
};

export default function ProfileDropdown({
    onChangeUsername,
    onChangeAvatar,
    onLogout,
}: ProfileDropdownProps) {
    return (
        <div className="absolute right-0 top-full mt-4 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-1.5">
                <button 
                    onClick={onChangeUsername} 
                    className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                        <UserPen size={16} />
                    </div>
                    Alterar nome
                </button>
                <button 
                    onClick={onChangeAvatar} 
                    className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                        <Image size={16} />
                    </div>
                    Alterar avatar
                </button>
            </div>
            
            <div className="h-px bg-gray-100 mx-2 my-0.5" />
            
            <div className="p-1.5">
                <button 
                    onClick={onLogout} 
                    className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <div className="p-1.5 bg-red-100 text-red-600 rounded-md">
                        <LogOut size={16} />
                    </div>
                    Sair da conta
                </button>
            </div>
        </div>
    );
}
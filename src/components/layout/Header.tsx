import { User } from "../../types/User"
import { getAvatarPath } from "../../utils/getAvatarPath"

type HeaderProps = {
    user: User,
    onClick?: () => void
}

export default function Header({ user, onClick }: HeaderProps) {
    return (
        <header className="fixed left-0 top-0 w-full h-24 bg-blue-600 text-white flex flex-row justify-between items-center px-10 shadow-lg z-50">
            <div className="bg-blue-700/50 py-2 px-4 rounded-lg border border-blue-200">
                <h1 className="text-xl font-bold tracking-wider">DialoGO</h1>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 group cursor-pointer">
                <div className="relative" onClick={onClick}>
                    <img 
                        src={getAvatarPath(user.avatar)}
                        alt="Perfil" 
                        className="w-12 h-12 rounded-full object-cover border-3 border-white/50 group-hover:border-white transition-all"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-400 rounded-full"></span>
                </div>
                <p className="text-xs font-medium text-blue-100 group-hover:text-white transition-colors">
                    {user.username}
                </p>
            </div>
        </header>
    )
}
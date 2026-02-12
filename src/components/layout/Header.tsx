import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { getAvatarPath } from "../../utils/getAvatarPath";
import ProfileDropdown from "../layout/ProfileDropdown";
import ChangeAvatarModal from "../modals/ChangeAvatarModal";
import { AvatarType } from "../../types/AvatarType";

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>(user.avatar);

  useEffect(() => {
    setSelectedAvatar(user.avatar);
  }, [user.avatar]);

  function handleChangeUsername() {
    setIsDropdownOpen(false);
  }

  function handleChangeAvatar() {
    setIsDropdownOpen(false);
    setIsAvatarModalOpen(true);
  }

  function handleLogout() {
    setIsDropdownOpen(false);
  }

  function handleUpdateAvatar() {
    console.log("Novo avatar:", selectedAvatar);
    setIsAvatarModalOpen(false);
  }

  return (
    <>
      <header className="fixed left-0 top-0 w-full h-24 bg-blue-600 text-white flex flex-row justify-between items-center px-10 shadow-lg z-50">
        <div className="cursor-default bg-blue-700/50 py-2 px-4 rounded-lg border border-blue-200">
          <h1 className="text-xl font-bold tracking-wider">DialoGO</h1>
        </div>

        <div className="relative">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex flex-col items-center justify-center gap-1 group cursor-pointer select-none"
          >
            <div className="relative transition-transform duration-200 active:scale-95">
              <img
                src={getAvatarPath(user.avatar)}
                alt="Perfil"
                className={`w-12 h-12 rounded-full object-cover border-3 transition-all ${
                  isDropdownOpen
                    ? "border-white ring-4 ring-blue-400/50"
                    : "border-white/50 group-hover:border-white"
                }`}
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-blue-600 rounded-full"></span>
            </div>
            <p className="text-xs font-medium text-blue-100 group-hover:text-white transition-colors">
              {user.username}
            </p>
          </div>

          {isDropdownOpen && (
            <ProfileDropdown
              onChangeUsername={handleChangeUsername}
              onChangeAvatar={handleChangeAvatar}
              onLogout={handleLogout}
            />
          )}
        </div>
      </header>

      <ChangeAvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        selectedAvatar={selectedAvatar}
        onSelectAvatar={setSelectedAvatar}
        updateAvatar={handleUpdateAvatar}
      />
    </>
  );
}

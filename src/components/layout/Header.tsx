import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { getAvatarPath } from "../../utils/getAvatarPath";
import ProfileDropdown from "../layout/ProfileDropdown";
import ChangeAvatarModal from "../modals/ChangeAvatarModal";
import ChangeUsernameModal from "../modals/ChangeUsernameModal";
import { AvatarType } from "../../types/AvatarType";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../modals/ChangePasswordModal";

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>(user.avatar);

  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const { logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedAvatar(user.avatar);
  }, [user.avatar]);

  useEffect(() => {
    setNewUsername(user.username);
  }, [user.username]);

  function handleOpenUsernameModal() {
    setIsDropdownOpen(false);
    setNewUsername(user.username);
    setIsUsernameModalOpen(true);
  }

  function handleOpenAvatarModal() {
    setIsDropdownOpen(false);
    setIsAvatarModalOpen(true);
  }

  function handleOpenPasswordModal() {
    setIsDropdownOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setIsPasswordModalOpen(true);
  }
  
  function handleLogout() {
    setIsDropdownOpen(false);
    logout();
    navigate("/login", { replace: true });
  }

  async function handleUpdateUsername() {
    try {
      await updateUserProfile({
        username: newUsername,
      });
      setIsUsernameModalOpen(false);
    } catch (err: any) {
      console.error("Erro ao atualizar username:", err);
      throw err; 
    }
  }

  async function handleUpdateAvatar() {
    try {
        await updateUserProfile({
          avatar: selectedAvatar
        });
      } catch(err){
        console.log(err);
      } finally {
        setIsAvatarModalOpen(false);
      }
    }

  async function handleUpdatePassword(currentPass: string, newPass: string) {
    await updateUserProfile({
      currentPassword: currentPass,
      newPassword: newPass,
    });
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
              onChangeUsername={handleOpenUsernameModal}
              onChangeAvatar={handleOpenAvatarModal}
              onChangePassword={handleOpenPasswordModal}
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

      <ChangeUsernameModal
        isOpen={isUsernameModalOpen}
        onClose={() => setIsUsernameModalOpen(false)}
        username={newUsername}
        onUsernameChange={setNewUsername}
        changeUsername={handleUpdateUsername}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        currentPassword={currentPassword}
        onCurrentPasswordChange={setCurrentPassword}
        newPassword={newPassword}
        onNewPasswordChange={setNewPassword}
        changePassword={handleUpdatePassword}
      />
    </>
  );
}
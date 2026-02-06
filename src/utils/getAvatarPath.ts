import { AVATAR_MAP } from "../constants/avatarPath";
import { AvatarType } from "../types/AvatarType";

export function getAvatarPath(avatar: AvatarType): string {
    return AVATAR_MAP[avatar];
}
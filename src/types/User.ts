import { AvatarType } from "./AvatarType"

export type User = {
    id: number
    username: string
    avatar: AvatarType
    created_at: string
}
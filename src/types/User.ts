import { AvatarType } from "./AvatarType"

export type User = {
    id: number
    username: string
    password: string
    avatar: AvatarType
    created_at: string
}
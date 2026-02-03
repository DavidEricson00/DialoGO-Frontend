import { User } from "./User"

export type LoginResponse = {
    token: string
    user: User
}
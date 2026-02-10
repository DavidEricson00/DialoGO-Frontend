export type ChatBase = {
  id: string
  name: string
  description: string | null
  created_at: string
}

export type ChatListItem = ChatBase & {
  users_count: number
  has_password: boolean
}

export type ChatDetail = ChatBase & {
  owner_id: string
}
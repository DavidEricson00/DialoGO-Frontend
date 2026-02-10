export type ChatBase = {
  id: string
  name: string
  description: string | null
  created_at: string
}

export type ChatListItem = ChatBase & {
  users_count: number
  hasPassword: boolean
}

export type ChatDetail = ChatBase & {
  owner_id: string
}
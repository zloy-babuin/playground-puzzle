export type GamePlayer = {
  user_id: string, //uuid
  name: string,
  avatar: string,
  piece_count: number,
  joined_at: number, // timestamp
  premium_user: boolean
}

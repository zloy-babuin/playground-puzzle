export interface UserModel {
  id: string, // uuid
  name: string,
  email: string,
  avatar_url: string | null,
  last_logged: string | null,
}

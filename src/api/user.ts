// import { api } from "@/api/instance"
import type { UserModel } from '@/entities/user/user-model.ts'

export const userApi = {
  async get(): Promise<UserModel> {
    return new Promise(() => {
      return {
        id: "",
        name: "",
        email: "",
        last_logged: null,
        avatar_url: null,
      }
    })
  }
}

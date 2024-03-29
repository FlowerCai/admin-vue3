// 用户状态管理
import { defineStore } from "pinia"
import type { UserType } from "@/api/types"
import userApi from "@/api/user"
import { usePermissionStore } from "@/store/permission"

type UserState = {
  currentUser: UserType | null
}

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      currentUser: null,
    }
  },
  persist: true,
  actions: {
    async fetchCurrentUser() {
      this.currentUser = await userApi.me()
      console.log("id", this.currentUser.id)
      // Todo: 超级管理员机制
      usePermissionStore().generateRoutes(this.currentUser.permissions)
      this.currentUser.nickname = "Fang"
    },
  },
})

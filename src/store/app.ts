import { defineStore } from "pinia"
import type { AppState, TokenRequest } from "@/api/types"
import tokenApi from "@/api/token"
import { useUserStore } from "@/store/user"

export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      token: "",
      menuCollapse: false,
    }
  },
  // 持久层 可以选择localstorage session
  persist: true,
  actions: {
    async login(loginForm: TokenRequest): Promise<void> {
      this.token = await tokenApi.createToken(loginForm)
    },
    async logout(): Promise<void> {
      const userStore = useUserStore()
      this.token = ""
      userStore.$reset()
    },
  },
})

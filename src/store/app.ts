// 全局程序管理 token
import { defineStore } from "pinia"
import type { AppState, TokenRequest } from "@/api/types"
import tokenApi from "@/api/token"
import { useUserStore } from "@/store/user"

export const useAppStore = defineStore("app", {
  // 让false可以正确判断类型
  state: (): AppState => {
    return {
      token: "",
      // 控制边侧栏展开与否
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
      // 清空用户信息
      const userStore = useUserStore()
      this.token = ""
      userStore.$reset()
    },
  },
})

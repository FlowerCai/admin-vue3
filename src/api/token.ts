import request from "@/api/request"
import type { TokenRequest } from "@/api/types"
import type { AxiosResponse } from "axios"

// 获取tokens
const createToken = (tokenRequest: TokenRequest): Promise<string> => {
  return request.post("/tokens", tokenRequest)
}

export default {
  createToken,
}

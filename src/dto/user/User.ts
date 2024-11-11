import type { UserTokenPair } from '@/dto/user/UserTokenPair'

export interface User {
  id: number,
  name: string,
  tokenPair: UserTokenPair
}

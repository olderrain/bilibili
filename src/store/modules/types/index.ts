import type { accountInfo } from "@/api/user/type"
export interface StyleStore {
  show: boolean,
  whiteTabbar: boolean,
  isBottom:boolean,
}
export interface UserStore {
  token: string|null, //用户唯一标识token
  username: string,
  userName: string,
  userId: number,
  userImage: string,
  signature: string,
  sexType: string,
  birthday: string,
  school: string,
  level: number,
  exp: number,
  follows: number,
  fans: number,
  likes: number,
  plays: number,
  coins: number,
  collects: number,
  published: number,
  accountInfo:accountInfo,
  notice:string
  dongtais:number
}
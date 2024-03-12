import request from '@/utils/request'
import { fansResponseData,followResponseData,coinsRecordResponseData, LoginFormData, accountInfoResponseData, blacklistResponseData, dailyMissionResponseData, loginResponseData, userInfoData, userInfoReponseData, weekResponseData } from './type'
enum API {
  // 登录接口
  LOGIN_URL = '/login',
  // 注册用户
  REGISTER_URL = '/login/register',
  // 获取验证码
  GETCODE_URL = '/login/sendCode',
  // 找回密码
  FINDPASSWORD = '/login/findPassword',
  // 获取用户信息
  GETUSERINFO = '/info/getUserInfo',
  // 首页个人信息概览展示
  ACCOUNTINFO_URL = '/info/accountInfo',
  // 获取每日任务情况
  GETDAILYMISSION_URL = '/info/getDailyMission',
  // 修改我的信息
  EDITINFO_URL = '/info/editInfo',
  // 获取黑名单
  GETBLACKLIST_URL = '/info/getBlacklist?',
  // 移除黑名单
  DELETEBLACKLIST_URL = '/info/deleteBlacklist?',
  // 硬币记录
  GETCOINSRECORD_URL = '/info/getCoinsAddRecord?',
  // 修改用户头像
  POSTIMG_URL = '/info/postImg?',
  // 修改签名
  EDITSIGNATURE_URL = '/info/editSignature?',
  // 创作中心获取一周的数据
  GETWEEKDATA_URL='/video/getWeekData',
  // 获取关注的人的信息概览
  GETFOLLOWLIST_URL='/info/getFollowList?',
  // 取关up
  UNFOLLOW_URL='/info/unfollow?',
  // 关注up
  FOLLOW_URL='/info/follow?',
  // 获取粉丝
  GETFANS_URL='/info/getFans?',
}
// 登录接口
export const reqLogin = (data: LoginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 注册接口
export const reqRegister = (data: LoginFormData) => request.post<any, any>(API.REGISTER_URL, data)
// 获取验证码
export const reqGetCode = (account: string) => request.get<any, any>(API.GETCODE_URL + `?account=${account}`)
// 找回密码
export const reqFindPassword = (data: LoginFormData) => request.post<any, any>(API.FINDPASSWORD, data)
// 获取用户信息
export const reqUserInfo = () => request.get<any, userInfoReponseData>(API.GETUSERINFO)
// 首页个人信息概览展示
export const reqAccountInfo = () => request.get<any, accountInfoResponseData>(API.ACCOUNTINFO_URL)
// 获取每日任务情况
export const reqDailyMission = () => request.get<any, dailyMissionResponseData>(API.GETDAILYMISSION_URL)
// 修改我的信息
export const reqEditInfo = (data: userInfoData) => request.post<any, any>(API.EDITINFO_URL, data)
// 获取黑名单
export const reqBlacklist = (pageNum: number, pageSize: number) => request.get<any, blacklistResponseData>(API.GETBLACKLIST_URL + `pageNum=${pageNum}&pageSize=${pageSize}`)
// 移除黑名单
export const reqDeleteBlacklist = (userId: number) => request.get<any, any>(API.DELETEBLACKLIST_URL + `userId=${userId}`)
// 硬币记录
export const reqCoinsRecord = (pageNum: number, pageSize: number) => request.get<any, coinsRecordResponseData>(API.GETCOINSRECORD_URL + `pageNum=${pageNum}&pageSize=${pageSize}`)
// 修改用户头像
export const reqPostImg = (img: string) => request.get<any, any>(API.POSTIMG_URL + `img=${img}`)
// 修改签名
export const reqEditSignature = (signature: string) => request.post<any, any>(API.EDITSIGNATURE_URL + `signature=${signature}`)
// 创作中心获取一周的数据
export const reqWeekData=()=>request.get<any,weekResponseData>(API.GETWEEKDATA_URL)
// 获取关注的人信息概览
export const reqFollowList=(pageNum:number,pageSize:number,userId:number)=>request.get<any,followResponseData>(API.GETFOLLOWLIST_URL+`pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}`)
// 取关
export const reqUnfollow=(userId:number)=>request.get<any,any>(API.UNFOLLOW_URL+`userId=${userId}`)
// 关注
export const reqFollow=(userId:number)=>request.get<any,any>(API.FOLLOW_URL+`userId=${userId}`)
// 获取粉丝
export const reqFansList=(pageNum:number,pageSize:number,userId:number)=>request.get<any,fansResponseData>(API.GETFANS_URL+`pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}`)
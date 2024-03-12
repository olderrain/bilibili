import request from "@/utils/request";
import type{publishMarkParams,markResponseData,markParams,dynamicForm,dynamicResponseData,followResponseData} from '@/api/dynamic/type.ts'
enum API{
  // 根据userId获取动态
  GETDYNAMIC_URL='/mark/getDongtai?',
  // 获取关注列表
  GETFOLLOWLIST_URL='/info/getFollowList?',
  // 获取我关注的所有动态
  GETMYFOLLOWSDYNAMIC='/mark/getMyFollowsDongtais?',
  // 搜索名字
  SEARCHNAME_URL='/info/searchName?',
  // 发表动态
  PUBLISHDYNAMIC='/mark/publishDongtai',
  // 删除动态
  DELETEDYNAMIC_URL='/mark/delete?',
  // 点赞动态
  LIKEDYNAMIC='/mark/likeDongtai?',
  // 取消点赞动态
  UNLIKEDYNAMIC='/mark/unlikeDongtai?',
  // 获取评论
  GETMARKS='/mark/getMarks',
  // 点赞评论
  LIKEMARK='/mark/likeMark?',
  // 取消点赞评论
  UNLIKEMARK='/mark/unlikeMark?',
  // 点赞回复
  LIKEREPLY='/mark/likeReply?',
  // 取消点赞回复
  UNLIKEREPLY='/mark/unlikeReply?',
  // 发表评论
  PUBLISHMARK='/mark/publishMark',
}
// 根据userId获取动态
export const reqDynamic=(pageNum:number,pageSize:number,userId:number)=>request.get<any,dynamicResponseData>(API.GETDYNAMIC_URL+`pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}`)
// 获取关注列表
export const reqFollowList=(pageNum:number,pageSize:number,userId:number)=>request.get<any,followResponseData>(API.GETFOLLOWLIST_URL+`pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}`)
// 获取我关注的所有动态
export const reqMyFollowsDynamic=(pageNum:number,pageSize:number)=>request.get<any,dynamicResponseData>(API.GETMYFOLLOWSDYNAMIC+`pageNum=${pageNum}&pageSize=${pageSize}`)
// 搜索名字
export const reqSearchName=(name:string,pageNum:number,pageSize:number)=>request.get<any,followResponseData>(API.SEARCHNAME_URL+`name=${name}&pageNum=${pageNum}&pageSize=${pageSize}`)
// 发表动态
export const reqPublishDynamic=(data:dynamicForm)=>request.post<any,any>(API.PUBLISHDYNAMIC,data)
// 删除动态
export const reqDeleteDynamic=(dongtaiId:string)=>request.get<any,any>(API.DELETEDYNAMIC_URL+`dongtaiId=${dongtaiId}`)
// 点赞动态
export const reqLikeDynamic=(dongtaiId:string)=>request.get<any,any>(API.LIKEDYNAMIC+`dongtaiId=${dongtaiId}`)
// 取消点赞动态
export const reqUnLikeDynamic=(dongtaiId:string)=>request.get<any,any>(API.UNLIKEDYNAMIC+`dongtaiId=${dongtaiId}`)
// 获取评论
export const reqMarks=(data:markParams)=>request.post<any,markResponseData>(API.GETMARKS,data)
// 点赞评论
export const reqLikeMark=(markId:string)=>request.get<any,any>(API.LIKEMARK+`markId=${markId}`)
// 取消点赞评论
export const reqUnLikeMark=(markId:string)=>request.get<any,any>(API.UNLIKEMARK+`markId=${markId}`)
// 点赞回复
export const reqLikeReply=(replyId:string)=>request.get<any,any>(API.LIKEREPLY+`replyId=${replyId}`)
// 取消点赞回复
export const reqUnLikeReply=(replyId:string)=>request.get<any,any>(API.UNLIKEREPLY+`replyId=${replyId}`)
// 发表评论
export const reqPublishMark=(data:publishMarkParams)=>request.post(API.PUBLISHMARK,data)
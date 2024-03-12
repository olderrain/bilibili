import request from "@/utils/request.ts"
import type{EverydayPlayResponseData,EverydayLikeResponseData,EverydayCollectResponseData,EverydayCoinResponseData} from './type.ts'
enum API{
  // 获取播放量图表数据
  GETEVERYDAYPLAY_URL='/video/getEverydayPlay?',
  // 获取点赞图表数据
  GETEVERYDAYLIKE_URL='/video/getEverydayLike?',
  // 获取收藏图表数据
  GETEVERYDAYCOLLECT_URL='/video/getEverydayCollect?',
  // 获取硬币图表数据
  GETEVERYDAYCOIN_URL='/video/getEverydayCoin?',
}
// 获取播放量图表数据
export const reqEverydayPlay=(pageNum:number,pageSize:number)=>request.get<any,EverydayPlayResponseData>(API.GETEVERYDAYPLAY_URL+`pageNum=${pageNum}&pageSize=${pageSize}`)
// 获取点赞图表数据
export const reqEverydayLike=(pageNum:number,pageSize:number)=>request.get<any,EverydayLikeResponseData>(API.GETEVERYDAYLIKE_URL+`pageNum=${pageNum}&pageSize=${pageSize}`)
// 获取收藏图表数据
export const reqEverydayCollect=(pageNum:number,pageSize:number)=>request.get<any,EverydayCollectResponseData>(API.GETEVERYDAYCOLLECT_URL+`pageNum=${pageNum}&pageSize=${pageSize}`)
// 获取硬币图表数据
export const reqEverydayCoin=(pageNum:number,pageSize:number)=>request.get<any,EverydayCoinResponseData>(API.GETEVERYDAYCOIN_URL+`pageNum=${pageNum}&pageSize=${pageSize}`)
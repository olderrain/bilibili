import request from '@/utils/request'
import type { VideoResponseData,outerVideoResponseData,videoSubmitParams,VideoManagerResponseData } from './type'
enum API {
  // 获取主页视频
  GETHOMEPAGEVIDEO_URL = '/video/getHomePageVideo?',
  // 获取我的视频
  GETMYVIDEO_URL = '/video/getMyVideo?',
  // 获取投币视频
  GETCOINSVIDEO_URL = '/video/getCoinsVideos?',
  // 获取点赞视频
  GETLIKEVIDEO_URL = '/video/getLikeVideos?',
  // 视频投稿
  VIDEOSUBMIT_URL='/video/submit',
  // 删除视频
  DELVIDEO_URL='/video/delVideo?',
  // 视频管理
  VIDEOMANAGER_URL='/video/videoManagement?',
  // 视频管理删除
  DELVIDEOS_URL='/video/delVideos?',
  // 进入视频页面
  GETVIDEO_URL='/video/getVideo/',
  // 投币
  GIVECOINS_URL='/video/giveCoins?',
  // 点赞视频
  LIKEVIDEO_URL='/video/like?',
  // 取消点赞视频
  UNLIKEVIDEO_URL='/video/unlike?'
}
// 获取主页视频
export const reqHomePageVideo = (pageNum: number, pageSize: number) => request.get<any, outerVideoResponseData>(API.GETHOMEPAGEVIDEO_URL + `pageNum=${pageNum}&pageSize=${pageSize}`)
// 获取我的视频
export const reqMyVideo = (data: any) => request.get<any, outerVideoResponseData>(API.GETMYVIDEO_URL + `pageNum=${data.pageNum}&pageSize=${data.pageSize}&userId=${data.userId}`)
// 获取投币视频
export const reqCoinsVideo = (data: any) => request.get<any, outerVideoResponseData>(API.GETCOINSVIDEO_URL + `pageNum=${data.pageNum}&pageSize=${data.pageSize}&userId=${data.userId}`)
// 获取点赞视频
export const reqLikeVideo = (data: any) => request.get<any, outerVideoResponseData>(API.GETLIKEVIDEO_URL + `pageNum=${data.pageNum}&pageSize=${data.pageSize}&userId=${data.userId}`)
// 获取点赞视频
export const reqVideoSubmit = (data: videoSubmitParams) => request.post<any, any>(API.VIDEOSUBMIT_URL ,data)
// 删除视频
export const reqDelVideo=(filename:string,extension:String)=>request.get<any,any>(API.DELVIDEO_URL+`filename=${filename}&extension=${extension}`)
// 视频管理
export const reqVideoManager=(pageNum:number,pageSize:number)=>request.get<any,VideoManagerResponseData>(API.VIDEOMANAGER_URL+`pageNum=${pageNum}&pageSize=${pageSize}`)
// 视频管理
export const reqDeleteVideoManager=(videoId:string)=>request.get<any,any>(API.DELVIDEOS_URL+`videoId=${videoId}`)
// 进入视频页面
export const reqVideo=(videoId:string)=>request.post<any,VideoResponseData>(API.GETVIDEO_URL+`${videoId}`)
// 投币
export const reqGiveCoins=(videoId:string,count:number)=>request.get<any,any>(API.GIVECOINS_URL+`videoId=${videoId}&count=${count}`)
// 点赞视频
export const reqLike=(videoId:string)=>request.get<any,any>(API.LIKEVIDEO_URL+`videoId=${videoId}`)
// 取消点赞视频
export const reqUnLike=(videoId:string)=>request.get<any,any>(API.UNLIKEVIDEO_URL+`videoId=${videoId}`)
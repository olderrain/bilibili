import request from '@/utils/request'
import type { onLiveResponseData, enterLiveResponseData, liveRecommendResponseData,livingFollowerResponseData } from './type.ts'
enum API {
  // 开播
  ONLIVE_URL = '/live/onlive',
  // 下播
  OFFLIVE_URL = '/live/offlive',
  // 修改直播间标题
  EDITNAME_URL = '/live/editName?',
  // 修改直播间封面
  EDITIMAGE_URL = '/live/editImage?',
  // 进入直播间
  ENTERLIVE_URL = '/live/enterLive?',
  // 获取封面
  GETIMAGE_URL = '/live/getImage',
  // 获取标题
  GETTITLE_URL = '/live/getTitle',
  // 直播推荐
  LIVERECOMMEND_URL = '/live/liveRecommend?',
  // 获取正在直播的关注者
  GETLIVINGFOLLOWER_URL = '/live/getLivingFollower?'
}
// 开播
export const reqOnLive = () => request.get<any, onLiveResponseData>(API.ONLIVE_URL)
// 下播
export const reqOffLive = () => request.get<any, any>(API.OFFLIVE_URL)
// 修改直播间标题
export const reqEditName = (name: string) => request.get<any, any>(API.EDITNAME_URL + `name=${name}`)
// 修改直播间封面
export const reqEditImage = (image: string) => request.get<any, any>(API.EDITIMAGE_URL + `image=${image}`)
// 进入直播间
export const reqEnterLive = (cid: string) => request.get<any, enterLiveResponseData>(API.ENTERLIVE_URL + `cid=${cid}`)
// 获取封面
export const reqImage = () => request.get<any, any>(API.GETIMAGE_URL)
// 获取标题
export const reqTitle = () => request.get<any, any>(API.GETTITLE_URL)
// 直播推荐
export const reqLiveRecommend = (pageNum: number, pageSize: number) => request.get<any, liveRecommendResponseData>(API.LIVERECOMMEND_URL + `pageNum=${pageNum}&pageSize=${pageSize}`)
// 获取正在直播的关注者
export const reqLivingFollower = (pageNum: number, pageSize: number) => request.get<any, livingFollowerResponseData>(API.GETLIVINGFOLLOWER_URL + `pageNum=${pageNum}&pageSize=${pageSize}`)
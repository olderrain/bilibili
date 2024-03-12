export interface ResponseData {
  code: number,
  message: string,
}
export interface onLiveData {
  "cid": string,
  "pushUrl": string
}
export interface onLiveResponseData extends ResponseData {
  data: onLiveData
}
export interface enterLiveData {
  "userId": number,
  "userImage": string,
  "userName": string,
  "fans": number,
  "name": string,
  "httpPullUrl": string,
  "hlsPullUrl": string,
  "rtmpPullUrl": string
}
export interface enterLiveResponseData extends ResponseData {
  data: enterLiveData
}
export interface liveRecommendData {
  "cid": string,
  "name": string,
  "image": string,
  "userId": number,
  "userImage": string,
  "userName": string,
  "watch": number,
  "isFollowed": boolean
}
export interface liveRecommendResponseData extends ResponseData {
  data: {
    record: liveRecommendData[]
    total: number
    pageNum: number
    pageSize: number
  }
  isEnd: boolean
}
export interface livingFollowerData {
  "userId": number,
  "userImage": string,
  "userName": string,
  "cid": string
}
export interface livingFollowerResponseData extends ResponseData {
  data: {
    record: livingFollowerData[]
    total: number
    pageNum: number
    pageSize: number
  }
  isEnd: boolean
}

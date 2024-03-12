export interface ResponseData {
  code: number,
  message: string,
}
export interface outerVideoData {
  "videoId": number,
  "coverImageLink": string,
  "title": string,
  "plays": number,
  "marks": number,
  "totalHours": number,
  "totalMinutes": number,
  "totalSeconds": number,
  "name": string,
  "releaseTime": string,
  videoLength?: string,
}
export interface outerVideoResponseData extends ResponseData {
  data: {
    record: outerVideoData[]
    total: number
    pageNum: number,
    pageSize: number
  },
}
export interface videoSubmitParams {
  "videos": [
    {
      "videoLink": string,
      "videoTitle": string,
      "hours": number,
      "minutes": number,
      "seconds": number
    }
  ],
  "coverImageLink": string,
  "title": string,
  "partitions": string,
  "subPartition": string,
  "tags": [],
  "description": string,
  "releaseTime": string
}
export interface VideoManagerData {
  "videoId": string,
  "coverImageLink": string,
  "title": string,
  "totalHours": number,
  "totalMinutes": number,
  "totalSeconds": number,
  "releaseTime": string,
  "plays": number,
  "marks": number,
  danmus: number,
  "likes": number,
  "coins": number,
  "collects": number,
  "forwards": number
}
export interface VideoManagerResponseData extends ResponseData {
  data: {
    record: VideoManagerData[]
    total: number,
    pageNum: number,
    pageSize: number
  }
  isEnd: boolean
}
// 进入视频页面
export interface VideoData {
  "userId": number,
  "userName": string,
  "userImage": string,
  "signature": string,
  "fans": number,
  "isFollowed": boolean,
  "releaseTime": string,
  "plays": number,
  danmus:number
  "marks": number,
  "title": string,
  "videoInfos": [
    {
      videoItemId:string
      "videoLink": string,
      "videoTitle": string,
      "hours": number,
      "minutes": number,
      "seconds": number
    }
  ],
  "likes": number,
  "coins": number,
  "collects": number,
  "forwards": number,
  "tags": [],
  "description": string
  isLike:boolean
}
export interface VideoResponseData extends ResponseData{
  data:VideoData
}
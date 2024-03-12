export interface ResponseData {
  code: number,
  message: string,
}
export interface dynamicData {
  "markId": string,
  "userId": number,
  "content": string,
  "quoteType": number,
  userImage: string,
  userName: string,
  "videoOutline": {
    "videoId": number,
    "coverImageLink": string,
    "title": string,
    "plays": number,
    "description": string,
    "marks": number,
    "totalHours": number,
    "totalMinutes": number,
    "totalSeconds": number,
    "name": string,
    "releaseTime": string
    videoLength: string
  },
  "dongtaiOutline": {
    "userId": number,
    "userImage": string,
    "userName": string,
    "markId": string,
    "content": string,
    "images": []
  },
  "forwards": number,
  "marks": number,
  "likes": number,
  "time": string,
  "images": [],
  isLike: boolean
  activeBtnIndex?: number
}
export interface dynamicResponseData extends ResponseData {
  data: {
    record: dynamicData[]
    total: number
    pageNum: number,
    pageSize: number
  }
  isEnd: boolean
}
export interface followData {
  "userId"?: number,
  "userName"?: string
  "userImage"?: string
  "fans"?: number
  signature?: string
  follow?:boolean
}
export interface followResponseData extends ResponseData {
  data: {
    record: followData[]
    total: number,
    pageNum: number,
    pageSize: number
  }
  isEnd: boolean
}
export interface dynamicForm {
  "content": string,
  "images"?: string[],
  "quoteId"?: string,
  "quoteType"?: number,
  "parentId"?: number,
  "fromType"?: number
}
export interface markParams {
  "parentId": string,
  "pageNum": number,
  "pageSize": number,
  "heat": boolean
}
export interface markData{
  "markId": "",
  "userId": 0,
  "userImage": "",
  "userName": "",
  "level": 0,
  "content": "",
  "images": [],
  "replys": [
    {
      "replyId": "",
      "markId": "",
      "userId": 0,
      "userName": "",
      "userImage": "",
      "level": 0,
      "content": "",
      "likes": 0,
      "time": ""
      isLike:boolean
      like?:boolean
    }
  ],
  "marks": 0,
  "likes": 0,
  "time": ""
  isLike:boolean
  like?:boolean
}
export interface markResponseData extends ResponseData{
  data:{
    record:markData[]
    total:number,
    pageNum:number
    pageSize:number
  }
  isEnd:boolean
}
export interface publishMarkParams{
  "parentId": string,
  "authorId": number,
  "fromType": number,
  "content": string,
  "images"?: string[]
}
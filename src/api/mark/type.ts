export interface ResponseData {
  code: number,
  message: string,
}
export interface markManagerData {
  "userId": number,
  "userName": string,
  "userImage": string,
  markId:string
  "replyContent": string,
  "likes": number,
  "time": string,
  videoId:string
  coverImageLink:string
  title:string
}
export interface markManagerResponseData extends ResponseData {
  data:{
    record:markManagerData[]
    total:number,
    pageNum:number
    pageSize:number
  }
  isEnd:boolean
}
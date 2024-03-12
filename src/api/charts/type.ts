export interface ResponseData {
  code: number,
  message: string,
}
export interface EverydayPlayData {
  "everydayPlays": 0,
  "userId": 0,
  "date": ""
}
export interface EverydayPlayResponseData extends ResponseData {
  data: {
    record: EverydayPlayData[]
    total: number,
    pageNum: number,
    pageSize: number
  }
  isEnd:boolean
}
export interface EverydayLikeData {
  "everydayLikes": 0,
  "userId": 0,
  "date": ""
}
export interface EverydayLikeResponseData extends ResponseData {
  data: {
    record: EverydayLikeData[]
    total: number,
    pageNum: number,
    pageSize: number
  }
  isEnd:boolean
}
export interface EverydayCollectData {
  "everydayCollects": 0,
  "userId": 0,
  "date": ""
}
export interface EverydayCollectResponseData extends ResponseData {
  data: {
    record: EverydayCollectData[]
    total: number,
    pageNum: number,
    pageSize: number
  }
  isEnd:boolean
}
export interface EverydayCoinData {
  "everydayCoins": 0,
  "userId": 0,
  "date": ""
}
export interface EverydayCoinResponseData extends ResponseData {
  data: {
    record: EverydayCoinData[]
    total: number,
    pageNum: number,
    pageSize: number
  }
  isEnd:boolean
}
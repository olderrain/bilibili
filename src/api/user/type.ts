export interface ResponseData {
  code: number,
  message: string,
}
export interface LoginFormData {
  username: string,
  password: string,
  code?: string,
}
export interface loginResponseData extends ResponseData {
  data: string,
}
export interface userInfoData {
  "userId"?: number,
  "userImage"?: string,
  "userName"?: string,
  "signature"?: string,
  "sexType"?: string,
  "birthday"?: string,
  "school"?: string,
  "level"?: number,
  "exp"?: number,
  "follows"?: number,
  "fans"?: number,
  "likes"?: number,
  "plays"?: number,
  "coins"?: number,
  "collects"?: number,
  "published"?: number,
  notice: string
  dongtais: number
}
export interface userInfoReponseData extends ResponseData {
  data: userInfoData
}
export interface accountInfo {
  "userName": string,
  "userImage": string,
  "level": number,
  "exp": number,
  "nextExp": number,
  "coins": number,
  "follows": number,
  "fans": number,
  "dongtais": number
}
export interface accountInfoResponseData extends ResponseData {
  data: accountInfo
}
export interface dailyMissionData {
  "userId": number,
  "dailyReg": boolean,
  "dailyWatch": boolean,
  "dailyCoins": number,
  "dailyShare": boolean
}
export interface dailyMissionResponseData extends ResponseData {
  data: dailyMissionData
}
export interface blacklistData {
  "userId": number,
  "userName": string,
  "userImage": string,
  time: string
}
export interface blacklistResponseData extends ResponseData {
  data: {
    record: blacklistData[],
    total: number,
    pageNum: number,
    pageSize: number
  }
}
export interface coinsRecord {
  "userId": number,
  "count": number,
  "time": string,
  "reason": string
}
export interface coinsRecordResponseData extends ResponseData {
  data: {
    record: coinsRecord[],
    total: number,
    pageNum: number,
    pageSize: number
  }
}
export interface WeekData {
  "plays": number,
  "fans": number,
  "likes": number,
  "collects": number,
  "coins": number,
  "marks": number,
  "danmus": number,
  "forwards": number
}
export interface weekResponseData extends ResponseData{
  data:WeekData
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
export interface fansData {
  "userId"?: number,
  "userName"?: string
  "userImage"?: string
  "fans"?: number
  signature?: string
  follow?:boolean
  isFollow?:boolean
}
export interface fansResponseData extends ResponseData {
  data: {
    record: followData[]
    total: number,
    pageNum: number,
    pageSize: number
  }
  isEnd: boolean
}
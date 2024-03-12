export interface ResponseData {
  code: number,
  message: string,
}
export interface collectorOutlineData{
  collectorId:number,
  collectorName:string,
  count:number,
  isPrivate:boolean,
  coverImageLink:string,
}
export interface collectorOutlineResponseData extends ResponseData{
  data:{
    record:collectorOutlineData[]
    total:number
    pageNum:number,
    pageSize:number
  }
}
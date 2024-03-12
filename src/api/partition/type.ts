export interface ResponseData {
  code: number,
  message: string,
}
export interface partitionData{
  "partition": string,
  "subPartition": string,
  "description": string
}
export interface partitionResponseData extends ResponseData{
  data:partitionData[]
}
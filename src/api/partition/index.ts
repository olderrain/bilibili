import request from '@/utils/request.ts'
import type{partitionResponseData} from './type.ts'
enum API{
  // 获取分区
  GETPARTITION_URL='/video/getPartition'
}
export const reqPartition=()=>request.get<any,partitionResponseData>(API.GETPARTITION_URL)
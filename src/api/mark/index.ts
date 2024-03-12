import request from '@/utils/request'
import type{markManagerResponseData} from './type.ts'
enum API{
  // 获取评论管理
  MARKMANAGER_URL='/mark/notify/markManagement?',
  // 删除评论管理
  DELMARK_URL='/mark/notify/delMark?'
}
// 获取评论管理
export const reqMarkManager=(type:number,pageNum:number,pageSize:number)=>request.get<any,markManagerResponseData>(API.MARKMANAGER_URL+`type=${type}&pageNum=${pageNum}&pageSize=${pageSize}`)
// 删除评论管理
export const reqDelMarkManager=(markId:string)=>request.get<any,any>(API.DELMARK_URL+`markId=${markId}`)
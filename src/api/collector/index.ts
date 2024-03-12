import request from '@/utils/request'
import type{collectorOutlineResponseData} from '@/api/collector/type.ts'
enum API {
  // 获取收藏夹
  GETCOLLECTOR_URL = '/info/getCollectorOutline?'
}
// 获取收藏夹
export const reqCollector = (data: any) => request.get<any, collectorOutlineResponseData>(API.GETCOLLECTOR_URL + `pageNum=${data.pageNum}&pageSize=${data.pageSize}&userId=${data.userId}`)
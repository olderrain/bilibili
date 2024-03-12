<template>
  <div class="container">
    <div class="title">
      我的硬币
    </div>
    <div class="content">
      <div class="yue">
        <span style="font-weight: 600;">硬币余额：</span>
        <span style="font-weight: 600;color: #00AEEC;">{{ userStore.coins }}</span>
      </div>
      <div class="title1">
        <span style="font-weight: 600;font-size: 14px;margin-right: 20px;">硬币记录</span>
        <span style="color: #888; font-size: 14px;">您最近一周的变化情况</span>
      </div>
      <el-table :data="coinsRecords" style="width: 100%" border>
        <el-table-column prop="time" label="时间" align="center" />
        <el-table-column prop="count" label="变化" align="center" />
        <el-table-column prop="reason" label="原因" align="center" />
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" layout="prev, pager, next,->, jumper"
        :total="total" @current-change="getCoin" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { reqCoinsRecord } from '@/api/user';
import type { coinsRecordResponseData, coinsRecord } from '@/api/user/type.ts'
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(300)
let coinsRecords = ref<coinsRecord[]>([])
onMounted(() => {
  getCoin()
})
const getCoin = async (pager=1) => {
  pageNo.value=pager
  let result: coinsRecordResponseData = await reqCoinsRecord(pageNo.value, pageSize.value)
  if (result.code == 200) {
    coinsRecords.value=result.data.record
    total.value=result.data.total
  }
}
</script>

<style scoped lang="scss">
.container {
  .title {
    color: #00AEEC;
    padding: 20px 30px;
    border-bottom: 1px solid #eee;
  }

  .content {
    padding: 30px 30px;

    .yue {
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }

    .title1 {
      padding: 20px 0;
    }
  }
}
</style>
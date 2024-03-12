<template>
  <div class="container">
    <div class="title">
      黑名单管理
    </div>
    <div class="content">
      <div class="item" v-for="(item, index) of blacklist" :key="item.userId">
        <div class="left">
          <img :src="item.userImage" alt="" style="width: 60px;height: 60px;border-radius: 50%;margin-right: 20px;">
          <div class="information">
            <div class="name">{{ item.userName }}</div>
            <div class="time">添加时间: {{ item.time }}</div>
          </div>
        </div>
        <div class="right">
          <el-button class="btn" @click="deleteBlacklist(item.userId)">移除</el-button>
        </div>
      </div>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" layout="prev, pager, next,->, jumper"
        :total="total" @current-change="getBlackList" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { reqBlacklist, reqDeleteBlacklist } from '@/api/user/index.ts'
import type { blacklistResponseData, blacklistData } from '@/api/user/type.ts'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(300)
let blacklist = ref<blacklistData[]>([])
onMounted(() => {
  getBlackList()
})
const getBlackList = async (pager = 1) => {
  pageNo.value = pager
  let result: blacklistResponseData = await reqBlacklist(pageNo.value, pageSize.value)
  if (result.code == 200) {
    blacklist.value = result.data.record
    total.value = result.data.total
  }
}
const deleteBlacklist = async (userId: number) => {
  let result: any = await reqDeleteBlacklist(userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '移除成功'
    })
    getBlackList()
  } else {
    ElMessage({
      type: 'error',
      message: '移除失败'
    })
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
    padding: 20px;

    .item {
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;

        .information {
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .time {
            font-size: 12px;
            color: #888;
          }
        }
      }

      .right {
        .btn {
          background-color: transparent;
          width: 80px;
          height: 36px;
        }
      }
    }
  }
}
</style>
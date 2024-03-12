<template>
  <div class="follow">
    <div class="title">全部关注</div>
    <div class="followlist">
      <div class="item" v-for="(item, index) of followList" :key="item.userId">
        <div class="left">
          <div class="avatar">
            <img :src="item.userImage" style="width: 60px;height: 60px;border-radius: 50%;">
          </div>
          <div class="info">
            <div class="name">{{ item.userName }}</div>
            <div class="signature">{{ item.signature }}</div>
          </div>
        </div>
        <div class="right">
          <el-button v-if="!item.follow" @click="follow(item)" style="width: 80px;height: 26px;">关注</el-button>
          <el-button v-if="item.follow" @click="unfollow(item)"
            style="width: 80px;height: 26px;background-color: #E5E9EF;">已关注</el-button>
        </div>
      </div>
    </div>
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
      layout="->,prev, pager, next, total, jumper" :total="total" @current-change="getFollowList" />
  </div>
</template>

<script setup lang='ts'>
import { reqFollowList, reqUnfollow,reqFollow } from '@/api/user';
import { followData, followResponseData } from '@/api/user/type';
import { ref, onMounted } from 'vue'
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';
let userStore = useUserStore()
let pageNum = ref<number>(1)
let pageSize = ref<number>(20)
let followList = ref<followData[]>([])
let total = ref<number>(0)
onMounted(() => {
  getFollowList()
})
const getFollowList = async (pager = 1) => {
  pageNum.value = pager
  let result: followResponseData = await reqFollowList(pageNum.value, pageSize.value, userStore.userId)
  if (result.code == 200) {
    followList.value = result.data.record
    followList.value.forEach((item) => {
      item.follow = true
    })
    total.value = result.data.total
  }
}
const unfollow = async (item: any) => {
  let result: any = await reqUnfollow(item.userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '取关成功'
    })
    followList.value.forEach((it: any) => {
      if(it.userId==item.userId){
        it.follow=false
      }
    })
  } else {
    ElMessage({
      type: 'error',
      message: '取关失败'
    })
  }
}
const follow = async (item: any) => {
  let result: any = await reqFollow(item.userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '关注成功'
    })
    followList.value.forEach((it: any) => {
      if(it.userId==item.userId){
        it.follow=true
      }
    })
  } else {
    ElMessage({
      type: 'error',
      message: '关注失败'
    })
  }
}
</script>

<style scoped lang="scss">
.follow {
  margin: 0 20px;

  .title {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }

  .followlist {
    .item {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;

        .avatar {
          margin-right: 20px;
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .name {
            font-size: 15px;
          }

          .signature {
            font-size: 13px;
            color: #888;
          }
        }
      }
    }
  }
}
</style>
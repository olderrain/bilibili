<template>
  <el-card class="tougao">
    <div class="title">我的视频</div>
    <div class="myvideolist">
      <outer-video v-for="(item, index) of myvideolist" :key="item.videoId" :item="item"></outer-video>
    </div>
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
      layout="->,prev, pager, next, total, jumper" :total="total" @current-change="getMyVideoList" />
  </el-card>
</template>

<script setup lang='ts'>
import { reqMyVideo } from '@/api/video';
import { outerVideoData, outerVideoResponseData } from '@/api/video/type';
import OuterVideo from '@/components/outerVideo/index.vue'
import { ref, onMounted } from 'vue'
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
let pageNum = ref<number>(1)
let pageSize = ref<number>(18)
let total = ref<number>(0)
let myvideolist = ref<outerVideoData[]>([])
onMounted(() => {
  getMyVideoList()
})
const getMyVideoList = async (pager=1) => {
  pageNum.value=pager
  let result: outerVideoResponseData = await reqMyVideo({ pageNum: pageNum.value, pageSize: pageSize.value, userId: userStore.userId })
  if (result.code == 200) {
    myvideolist.value = result.data.record
    total.value = result.data.total
  }
}
</script>

<style scoped lang="scss">
.tougao {
  width: 100%;

  .title{
    font-weight: 600;
    padding-bottom: 20px;
  }
  .myvideolist {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
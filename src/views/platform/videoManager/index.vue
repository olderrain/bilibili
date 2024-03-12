<template>
  <div class="videomanager">
    <el-card>
      <div class="title">视频管理</div>
      <div class="videolist">
        <div class="item" v-for="(item, index) of videoManagerList" :key="item.videoId">
          <div class="left">
            <div class="img">
              <img :src="item.coverImageLink" style="width: 160px;height: 90px;">
            </div>
            <div class="info">
              <div class="itemtitle">{{ item.title }}</div>
              <div class="time">{{ item.releaseTime }}</div>
              <div class="datainfo">
                <div class="datainfoitem">
                  <img src="../images/播放量.png" style="width: 16px;height: 16px;">
                  <span>{{ item.plays }}</span>
                </div>
                <div class="datainfoitem">
                  <img src="../images/赞 (1).png" style="width: 16px;height: 16px;">
                  <span>{{ item.likes }}</span>
                </div>
                <div class="datainfoitem">
                  <img src="../images/弹幕 (3).png" style="width: 16px;height: 16px;">
                  <span>{{ item.danmus }}</span>
                </div>
                <div class="datainfoitem">
                  <img src="../images/评论 (1).png" style="width: 16px;height: 16px;">
                  <span>{{ item.marks }}</span>
                </div>
                <div class="datainfoitem">
                  <img src="../images/硬币.png" style="width: 16px;height: 16px;">
                  <span>{{ item.coins }}</span>
                </div>
                <div class="datainfoitem">
                  <img src="../images/收藏 (3).png" style="width: 16px;height: 16px;">
                  <span>{{ item.collects }}</span>
                </div>
                <div class="datainfoitem">
                  <img src="../images/分享.png" style="width: 16px;height: 16px;">
                  <span>{{ item.forwards }}</span>
                </div>


              </div>
            </div>
          </div>
          <div class="right">
            <el-popconfirm title="你确定删除此视频吗？" @confirm="deleteVideoManager(item)">
              <template #reference>
                <el-button :icon="Delete" type="danger">删除稿件</el-button>
              </template>
            </el-popconfirm>

          </div>
        </div>
      </div>
      <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
        layout="->,prev, pager, next, total, jumper" :total="total" @current-change="getVideoManager" />
    </el-card>

  </div>
</template>

<script setup lang='ts'>
import { reqVideoManager,reqDeleteVideoManager } from '@/api/video';
import { VideoManagerData, VideoManagerResponseData } from '@/api/video/type';
import { Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
let pageNum = ref<number>(1)
let pageSize = ref<number>(5)
let videoManagerList = ref<VideoManagerData[]>([])
let total = ref<number>(0)
onMounted(() => {
  getVideoManager()
})
const getVideoManager = async (pager = 1) => {
  pageNum.value = pager
  let result: VideoManagerResponseData = await reqVideoManager(pageNum.value, pageSize.value)
  if (result.code == 200) {
    videoManagerList.value = result.data.record
    total.value = result.data.total
  }
}
const deleteVideoManager = async (item: any) => {
  let result:any=await reqDeleteVideoManager(item.videoId)
  if(result.code==200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    getVideoManager(videoManagerList.value[0]==item?pageNum.value-1:pageNum.value)
  }else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
}
</script>

<style scoped lang="scss">
.videomanager {
  margin-top: 50px;

  .title {
    font-weight: 600;
    font-size: 15px;
    padding-bottom: 20px;
  }

  .videolist {
    .item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;

      .left {
        display: flex;

        .img {
          margin-right: 20px;
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .itemtitle {
            font-size: 15px;
          }

          .time {
            font-size: 13px;
          }

          .datainfo {
            display: flex;
            align-items: center;
            font-size: 13px;
            color: #888;

            .datainfoitem {
              display: flex;
              align-items: center;
              margin-right: 20px;
              width: 50px;

              img {
                margin-right: 6px;
              }
            }
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
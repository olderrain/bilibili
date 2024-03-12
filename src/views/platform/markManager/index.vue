<template>
  <div class="markmanager">
    <el-card>
      <div class="title">
        <div>评论管理</div>
        <div class="sort">
          <div class="sortitem" :class="type==1?'active':''" @click="changeType(1)">最近发布</div>
          <div class="sortitem" :class="type==2?'active':''" @click="changeType(2)">点赞最多</div>
          <div class="sortitem" :class="type==3?'active':''" @click="changeType(3)" style="border-right: 0;">回复最多</div>
        </div>
      </div>
      <div class="marklist">
        <div class="item" v-for="(item,index) of markManagerList" :key="item.markId">
          <div class="left">
            <div class="avatar">
              <img :src="item.userImage" style="width: 40px;height: 40px;border-radius: 50%;">
            </div>
            <div class="info">
              <div class="name">{{ item.userName }}</div>
              <div class="content">{{ item.replyContent }}</div>
              <div class="bottom">
                <div class="time">{{ item.time }}</div>
                <div class="like">
                  <img src="../images/赞 (1).png" style="width: 16px;height: 16px;">
                  <span>{{ item.likes }}</span>
                </div>
                <div class="del" @click="deleteMarkManager(item)">删除</div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="img">
              <img :src="item.coverImageLink" style="width: 100px;height: 60px;">
            </div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>

      </div>
      <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
        layout="->,prev, pager, next, total, jumper" :total="total" @current-change="getMarkManager" />
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { reqMarkManager,reqDelMarkManager } from '@/api/mark';
import { markManagerData, markManagerResponseData } from '@/api/mark/type';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
let pageNum = ref<number>(1)
let pageSize = ref<number>(5)
let markManagerList = ref<markManagerData[]>([])
let total = ref<number>(0)
let type = ref<number>(1)
onMounted(() => {
  getMarkManager()
})
const getMarkManager = async (pager = 1) => {
  if(pager==0){pager=1}
  pageNum.value = pager
  let result: markManagerResponseData = await reqMarkManager(type.value, pageNum.value, pageSize.value)
  if (result.code == 200) {
    markManagerList.value = result.data.record
    total.value = result.data.total
  }
}
const deleteMarkManager = async (item: any) => {
  let result: any = await reqDelMarkManager(item.markId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getMarkManager(markManagerList.value[0] == item ? pageNum.value - 1 : pageNum.value)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
const changeType=(t:number)=>{
  type.value=t
  getMarkManager()
}
</script>

<style scoped lang="scss">
.markmanager {
  margin-top: 50px;

  .title {
    font-weight: 600;
    font-size: 15px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .sort{
      display: flex;
      .sortitem{
        cursor: pointer;
        padding: 0 20px;
        font-weight: normal;
        border-right: 1px solid #eee;
        &:hover{
          color: #00aeec;
        }
      }
      .active{
        font-weight: 600;
        color: #00aeec;
      }
    }
  }

  .marklist {
    .item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;

      .left {
        display: flex;

        .avatar {
          margin-right: 10px;
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .bottom {
            display: flex;
            align-items: center;
            font-size: 13px;
            color: #888;
            .time {
              margin-right: 20px;
            }

            .like {
              display: flex;
              align-items: center;
              margin-right: 20px;
              cursor: pointer;
              img {
                margin-right: 4px;
              }
            }
            .del{
              &:hover{
                color: #00aeec;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
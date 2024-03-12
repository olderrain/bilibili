<template>
  <div class="live">
    <div class="space"></div>
    <div class="container">
      <div class="header">
        <div class="title">我的关注<span class="num">{{ total1 }}人正在直播中</span></div>
        <div class="followlivelist">
          <div class="prevbtn" v-if="pageNum1 > 1">
            <img src="./images/左 (1).png" style="width: 20px;height: 20px;">
          </div>
          <div class="item" v-for="(item, index) of livingFollowerList" :key="item.userId">
            <div class="avatar">
              <img :src="item.userImage"
                style="width: 50px;height: 50px;border-radius: 50%;border: 1px solid #FF6699;padding: 2px;">
              <img class="living" src="./images/直播中.png" style="width: 12px;height: 12px;">
            </div>
            <div class="name">
              {{ item.userName }}
            </div>
          </div>
          <div class="nextbtn" v-if="!isEnd">
            <img src="./images/右 (1).png" style="width: 20px;height: 20px;">
          </div>
        </div>
      </div>
      <div class="recommend">
        <div class="title">推荐直播</div>
        <div class="recommendlist">
          <div class="item" @click="goLivingRoom(item.cid)" v-for="(item, index) of liveRecommendList" :key="item.cid">
            <div class="image">
              <img :src="item.image" style="width: 210px;height: 120px;">
            </div>
            <div class="bottom">
              <div class="bottom-avatar">
                <img :src="item.userImage" style="width: 40px;height: 40px;border-radius: 50%;">
              </div>
              <div class="bottom-right">
                <div class="bottom-title">{{ item.name }}</div>
                <div class="bottom-right-bottom">
                  <div class="name">{{ item.userName }}</div>
                  <div class="watch">
                    <img src="./images/观看.png" style="width: 16px;height: 16px;">
                    {{ item.watch }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination v-model:current-page="pageNum" :page-size="pageSize" layout="->,prev, pager, next, total, jumper"
          :total="total" @current-change="getLiveRecommend" />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reqLiveRecommend, reqLivingFollower } from '@/api/live';
import type { liveRecommendResponseData, liveRecommendData, livingFollowerData, livingFollowerResponseData } from '@/api/live/type'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
let pageNum1 = ref<number>(1)
let pageSize1 = ref<number>(20)
let isEnd = ref<boolean>(false)
let total1 = ref<number>(0)
let pageNum = ref<number>(1)
let pageSize = ref<number>(12)
let total = ref<number>(0)
let liveRecommendList = ref<liveRecommendData[]>([])
let livingFollowerList = ref<livingFollowerData[]>([])
let $router=useRouter()
onMounted(() => {
  getLivingFollower()
  getLiveRecommend()
})
const getLiveRecommend = async (pager = 1) => {
  pageNum.value = pager
  let result: liveRecommendResponseData = await reqLiveRecommend(pageNum.value, pageSize.value)
  if (result.code == 200) {
    liveRecommendList.value = result.data.record
    total.value = result.data.total
  }
}
const getLivingFollower = async () => {
  let result: livingFollowerResponseData = await reqLivingFollower(pageNum1.value, pageSize1.value)
  if (result.code == 200) {
    if (result.data == null) {
      isEnd.value = true
    } else {
      livingFollowerList.value = result.data.record
      total1.value = result.data.total
      isEnd.value = result.isEnd
    }

  }
}
const goLivingRoom=(cid:string)=>{
  $router.push(`/livingroom/${cid}`)
}
</script>

<style scoped lang="scss">
.live {
  background-color: #F1F2F3;
  height: 70vw;

  .space {
    width: 100%;
    height: 64px;
  }

  .container {
    width: 1400px;
    margin: 20px auto;

    .header {
      margin-bottom: 30px;

      .title {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 10px;

        .num {
          font-size: 13px;
          background-color: #FF6699;
          color: white;
          font-weight: normal;
          border-radius: 8px;
          padding: 1px 2px;
          margin-left: 10px;
        }
      }

      .followlivelist {
        width: 100%;
        height: 125px;
        background-color: white;
        border-radius: 5px;
        display: flex;
        padding: 20px 30px;
        position: relative;

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 20px;
          cursor: pointer;
          .avatar {
            position: relative;
            margin-bottom: 10px;

            .living {
              position: absolute;
              top: 0;
              right: 0;
            }
          }

          .name {
            font-size: 13px;
          }
        }

        .prevbtn {
          cursor: pointer;
          position: absolute;
          left: 0;
          top: 38%;
        }

        .nextbtn {
          cursor: pointer;
          position: absolute;
          right: 0;
          top: 38%;
        }
      }
    }

    .recommend {
      .title {
        font-size: 18px;
        margin-bottom: 20px;
        padding-left: 10px;
      }

      .recommendlist {
        .item {
          display: inline-block;
          margin: 0 11px;
          margin-bottom: 27px;
          cursor: pointer;
          .bottom {
            display: flex;
            margin-top: 10px;

            .bottom-avatar {
              margin-right: 10px;
            }

            .bottom-right {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;

              .bottom-title {
                font-size: 15px;
              }

              .bottom-right-bottom {
                display: flex;
                justify-content: space-between;

                .name {
                  font-size: 14px;
                  color: #888;
                }

                .watch {
                  font-size: 14px;
                  display: flex;
                  align-items: center;
                  color: #888;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
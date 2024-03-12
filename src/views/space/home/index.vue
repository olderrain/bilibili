<template>
  <el-row class="row">
    <el-col :span="18">
      <el-card class="left">
        <div class="myvideo">
          <div class="top">
            <div class="title">我的视频</div>
            <div class="btn">
              <el-button @click="changeActiveIndex('3')" size="small" style="background-color: transparent;">
                更多
                <img src="../images/右.png" style="width: 14px;height: 14px;">
              </el-button>
            </div>
          </div>
          <div class="videolist">
            <div class="item" v-for="(item, index) of myVideoList" :key="item.videoId">
              <img :src="item.coverImageLink" style="width: 160px;height: 100px;">
              <div class="title">{{ item.title }}</div>
              <div class="bottom">
                <div class="left">
                  <img src="../images/视频 (2).png" style="width: 18px;height: 16px;margin-right: 4px;">
                  <span>{{ item.plays }}</span>
                </div>
                <div class="right">
                  <span>{{ item.releaseTime.split(' ')[0] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mycollect">
          <div class="top">
            <div class="title">我的收藏夹</div>
            <div class="btn">
              <el-button @click="changeActiveIndex('5')" size="small" style="background-color: transparent;">
                更多
                <img src="../images/右.png" style="width: 14px;height: 14px;">
              </el-button>
            </div>
          </div>
          <div class="collectlist">
            <div class="item" v-for="(item, index) of collectorList" :key="item.collectorId">
              <img :src="item.coverImageLink">
              <span class="collect-count">{{ item.count }}</span>
              <div class="bottom">
                <div class="left">{{ item.collectorName }}</div>
                <div class="right">公开</div>
              </div>
            </div>
          </div>
        </div>
        <div class="coinsvideo">
          <div class="top">
            <div class="title">最近投币的视频</div>
          </div>
          <div class="coinsvideolist">
            <div class="item" v-for="(item, index) of coinsVideoList" :key="item.videoId">
              <img :src="item.coverImageLink" style="width: 160px;height: 100px;">
              <span class="videolength">{{ item.videoLength }}</span>
              <div class="title">{{ item.title }}</div>
              <div class="bottom">
                <div class="left">
                  <img src="../images/视频 (2).png" style="width: 18px;height: 16px;margin-right: 4px;">
                  <span>{{ item.plays }}</span>
                </div>
                <div class="right">
                  <img src="../images/弹幕 (2).png" style="width: 16px;height: 14px;">
                  <span>{{ item.releaseTime.split(' ')[0] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="likevideo">
          <div class="top">
            <div class="title">最近点赞的视频</div>
          </div>
          <div class="likevideolist">
            <div class="item" v-for="(item, index) of likeVideoList" :key="item.videoId">
              <img :src="item.coverImageLink" style="width: 160px;height: 100px;">
              <span class="videolength">{{ item.videoLength }}</span>
              <div class="title">{{ item.title }}</div>
              <div class="bottom">
                <div class="left">
                  <img src="../images/视频 (2).png" style="width: 18px;height: 16px;margin-right: 4px;">
                  <span>{{ item.plays }}</span>
                </div>
                <div class="right">
                  <img src="../images/弹幕 (2).png" style="width: 16px;height: 14px;">
                  <span>{{ item.releaseTime.split(' ')[0] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="notice">
        <div class="title">公告</div>
        <textarea class="textarea" rows="12" placeholder="编辑我的空间公告" v-model="notice"></textarea>
      </el-card>
      <el-card class="userinfo">
        <div class="top">
          <div class="title">个人资料</div>
          <el-button @click="goSetting" size="small" style="background-color: transparent;">修改资料</el-button>
        </div>
        <div class="info">
          <div class="item">UID {{ userStore.userId }}</div>
          <div class="item">生日 {{ userStore.birthday }}</div>
          <div class="item">学校 {{ userStore.school }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router'
import { reqCoinsVideo, reqMyVideo, reqLikeVideo } from '@/api/video';
import type { outerVideoData, outerVideoResponseData } from '@/api/video/type';
import { collectorOutlineData, collectorOutlineResponseData } from '@/api/collector/type';
import { reqCollector } from '@/api/collector';
let userStore = useUserStore()
let $router = useRouter()
let notice = userStore.notice
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let myVideoList = ref<outerVideoData[]>([])
let collectorList = ref<collectorOutlineData[]>([])
let coinsVideoList = ref<outerVideoData[]>([])
let likeVideoList = ref<outerVideoData[]>([])
onMounted(() => {
  getMyVideo()
  getCollector()
  getCoinsVideo()
  getLikeVideo()
})
const getMyVideo = async () => {
  let result: outerVideoResponseData = await reqMyVideo({ pageNum: pageNo.value, pageSize: pageSize.value, userId: userStore.userId })
  if (result.code == 200) {
    myVideoList.value = result.data.record
    myVideoList.value.forEach(item => {
      item.videoLength = (item.totalHours == 0 ? '' : item.totalHours + ':') + (item.totalMinutes >= 10 ? item.totalMinutes : '0' + item.totalMinutes) + ':' + (item.totalSeconds >= 10 ? item.totalSeconds : '0' + item.totalSeconds)
    });
  }
}
const getCollector = async () => {
  let result: collectorOutlineResponseData = await reqCollector({ pageNum: pageNo.value, pageSize: pageSize.value, userId: userStore.userId })
  if (result.code == 200) {
    collectorList.value = result.data.record
  }
}
const getCoinsVideo = async () => {
  let result: outerVideoResponseData = await reqCoinsVideo({ pageNum: pageNo.value, pageSize: pageSize.value, userId: userStore.userId })
  if (result.code == 200) {
    coinsVideoList.value = result.data.record
    coinsVideoList.value.forEach(item => {
      item.videoLength = (item.totalHours == 0 ? '' : item.totalHours + ':') + (item.totalMinutes >= 10 ? item.totalMinutes : '0' + item.totalMinutes) + ':' + (item.totalSeconds >= 10 ? item.totalSeconds : '0' + item.totalSeconds)
    });
  }
}
const getLikeVideo = async () => {
  let result: outerVideoResponseData = await reqLikeVideo({ pageNum: pageNo.value, pageSize: pageSize.value, userId: userStore.userId })
  if (result.code == 200) {
    likeVideoList.value = result.data.record
    likeVideoList.value.forEach(item => {
      item.videoLength = (item.totalHours == 0 ? '' : item.totalHours + ':') + (item.totalMinutes >= 10 ? item.totalMinutes : '0' + item.totalMinutes) + ':' + (item.totalSeconds >= 10 ? item.totalSeconds : '0' + item.totalSeconds)
    });
  }
}
const changeActiveIndex = (index: string) => {
  window.scrollTo(0, 0)
  if (index == '1') {
    $router.push('/space/home')
  }
  if (index == '2') {
    $router.push('/space/dongtai')
  }
  if (index == '3') {
    $router.push('/space/tougao')
  }
  if (index == '4') {
    $router.push('/space/collection')
  }
  if (index == '5') {
    $router.push('/space/collect')
  }
}
const goSetting = () => {
  $router.push('/account/setting')
}
</script>

<style scoped lang="scss">
.row {
  width: 100%;

  .left {
    margin-right: 10px;

    .myvideo {
      border-top: 1px solid #eee;
      padding-top: 20px;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 15px;

        .title {
          font-weight: 600;
          font-size: 20px;
        }
      }

      .videolist {
        display: flex;
        flex-wrap: wrap;

        .item {
          font-size: 12px;
          width: 160px;
          padding: 10px 10px 10px 0;
          margin-right: 20px;

          .title {
            margin-top: 6px;
            height: 38px;
            line-height: 20px;
          }

          .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #888;

            .left {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }

    .mycollect {
      border-top: 1px solid #eee;
      padding-top: 20px;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 15px;

        .title {
          font-weight: 600;
          font-size: 20px;
        }
      }

      .collectlist {
        display: flex;
        flex-wrap: wrap;

        .item {
          position: relative;
          width: 152px;
          margin-right: 20px;
          margin-bottom: 28px;

          img {
            width: 152px;
            height: 152px;
            cursor: pointer;
          }

          .collect-count {
            position: absolute;
            right: 10px;
            top: 10px;
            background-color: rgba($color: #000, $alpha: 0.5);
            border-radius: 9px;
            font-size: 12px;
            padding: 1px 5px;
            color: white;
          }

          .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;

            .left {
              font-size: 18px;
              cursor: pointer;

              &:hover {
                color: #00AEEC;
              }
            }

            .right {
              font-size: 12px;
              color: #888;
            }
          }
        }

      }
    }

    .coinsvideo {
      border-top: 1px solid #eee;
      padding-top: 20px;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 15px;

        .title {
          font-weight: 600;
          font-size: 20px;
        }
      }

      .coinsvideolist {
        .item {
          position: relative;
          font-size: 12px;
          width: 160px;
          padding: 10px 10px 10px 0;

          .videolength {
            position: absolute;
            right: 10px;
            top: 90px;
            background-color: rgba($color: #000, $alpha: 0.5);
            color: white;
            padding: 2px 5px;
            font-size: 12px;
          }

          .title {
            margin-top: 6px;
            height: 38px;
            line-height: 20px;
          }

          .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #888;

            .left {
              display: flex;
              align-items: center;
            }

            .right {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }

    .likevideo {
      border-top: 1px solid #eee;
      padding-top: 20px;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 15px;

        .title {
          font-weight: 600;
          font-size: 20px;
        }
      }

      .likevideolist {
        .item {
          position: relative;
          font-size: 12px;
          width: 160px;
          padding: 10px 10px 10px 0;

          .videolength {
            position: absolute;
            right: 10px;
            top: 90px;
            background-color: rgba($color: #000, $alpha: 0.5);
            color: white;
            padding: 2px 5px;
            font-size: 12px;
          }

          .title {
            margin-top: 6px;
            height: 38px;
            line-height: 20px;
          }

          .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #888;

            .left {
              display: flex;
              align-items: center;
            }

            .right {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }

  .notice {
    margin-bottom: 10px;

    .title {
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      font-weight: 600;
    }

    .textarea {
      border: 1px solid transparent;
      width: 100%;
      font-size: 12px;
      padding: 10px;
      color: #888;

      &:hover {
        border: 1px solid #00AEEC;
      }
    }
  }

  .userinfo {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }

    .info {
      display: flex;
      flex-wrap: wrap;
      padding-top: 10px;

      .item {
        font-size: 12px;
        color: #888;
        width: 150px;
        margin: 10px 0;
      }
    }
  }
}
</style>
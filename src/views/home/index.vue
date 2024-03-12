<template>
  <div class="main" style="width: 100%;">
    <div class="header-banner"></div>
    <div class="container">
      <div class="header-channel">
        <div class="channel-left">
          <div class="btn" @click="goDynamic">
            <el-button class="btn1" size="large" circle style="width: 50px;height: 50px;">
              <img src="./images/风车.png" style="width: 25px;height: 25px;">
            </el-button>
            <span style="margin-top: 6px;">动态</span>
          </div>
          <div class="btn">
            <el-button class="btn2" size="large" circle style="width: 50px;height: 50px;">
              <img src="./images/热门.png" style="width: 25px;height: 25px;">
            </el-button>
            <span style="margin-top: 6px;">热门</span>
          </div>
        </div>
        <div class="channel-right">
          <div class="channel">
            <el-button plain type="info" size="small" class="btn">番剧</el-button>
            <el-button plain type="info" size="small" class="btn">国创</el-button>
            <el-button plain type="info" size="small" class="btn">综艺</el-button>
            <el-button plain type="info" size="small" class="btn">动画</el-button>
            <el-button plain type="info" size="small" class="btn">鬼畜</el-button>
            <el-button plain type="info" size="small" class="btn">舞蹈</el-button>
            <el-button plain type="info" size="small" class="btn">娱乐</el-button>
            <el-button plain type="info" size="small" class="btn">科技</el-button>
            <el-button plain type="info" size="small" class="btn">美食</el-button>
            <el-button plain type="info" size="small" class="btn">汽车</el-button>
            <el-button plain type="info" size="small" class="btn">运动</el-button>
            <el-button plain type="info" size="small" class="btn">电影</el-button>
            <el-button plain type="info" size="small" class="btn">电视剧</el-button>
            <el-button plain type="info" size="small" class="btn">纪录片</el-button>
            <el-button plain type="info" size="small" class="btn">游戏</el-button>
            <el-button plain type="info" size="small" class="btn">音乐</el-button>
            <el-button plain type="info" size="small" class="btn">影视</el-button>
            <el-button plain type="info" size="small" class="btn">知识</el-button>
            <el-button plain type="info" size="small" class="btn">资讯</el-button>
            <el-button plain type="info" size="small" class="btn">生活</el-button>
            <el-button plain type="info" size="small" class="btn">时尚</el-button>
            <el-button plain type="info" size="small" class="btn">更多</el-button>
          </div>
          <div class="channel2">
            <el-button text class="channel-right-btn">
              <img v-show="styleStore.show" src="./images/专栏.png" style="width: 20px;height: 20px;margin-right: 5px;">
              <span>专栏</span>
            </el-button>
            <el-button text class="channel-right-btn">
              <img v-show="styleStore.show" src="./images/我的活动.png" style="width: 20px;height: 20px;margin-right: 5px;">
              <span>活动</span>
            </el-button>
            <el-button text class="channel-right-btn">
              <img v-show="styleStore.show" src="./images/nav_社区中心.png"
                style="width: 20px;height: 20px;margin-right: 5px;">
              <span>社区中心</span>
            </el-button>
            <el-button @click="goLive" text class="channel-right-btn">
              <img v-show="styleStore.show" src="./images/直播.png" style="width: 20px;height: 20px;margin-right: 5px;">
              <span>直播</span>
            </el-button>
            <el-button text class="channel-right-btn">
              <img v-show="styleStore.show" src="./images/课堂.png" style="width: 20px;height: 20px;margin-right: 5px;">
              <span>课堂</span>
            </el-button>
            <el-button text class="channel-right-btn">
              <img v-show="styleStore.show" src="./images/nav_新歌热榜.png"
                style="width: 20px;height: 20px;margin-right: 5px;">
              <span>新歌热榜</span>
            </el-button>
          </div>
        </div>
      </div>
      <div ref="recommend" class="recommend" :style="`height:100%`">
        <div class="carousel">
          <el-carousel trigger="click" style="height: 300px;">
            <el-carousel-item v-for="item in carouselVideoList" :key="item.videoId">
              <img :src="item.coverImageLink" style="background-size: cover;height: 300px;width: 100%;">
            </el-carousel-item>
          </el-carousel>
        </div>
        <outer-video v-for="(item, index) of homePageVideoList" :key="item.videoId" :item="item"></outer-video>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import useStyleStore from '@/store/modules/style';
import OuterVideo from '@/components/outerVideo/index.vue'
import { ref, onMounted,watch } from 'vue'
import { reqHomePageVideo } from '@/api/video';
import type { outerVideoResponseData, outerVideoData } from '@/api/video/type.ts'
import {useRouter} from 'vue-router'
let styleStore = useStyleStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let carouselVideoList = ref<outerVideoData[]>([])
let homePageVideoList = ref<outerVideoData[]>([])
let $router=useRouter()
onMounted(() => {
  getHomePageVideo()
})
const getHomePageVideo = async () => {
  let result: outerVideoResponseData = await reqHomePageVideo(pageNo.value, pageSize.value)
  if (result.code == 200) {
    if (pageNo.value == 1) {
      carouselVideoList.value.push(result.data.record[0], result.data.record[1], result.data.record[2], result.data.record[3])
      homePageVideoList.value.push(result.data.record[4], result.data.record[5], result.data.record[6], result.data.record[7], result.data.record[8], result.data.record[9])
    } else {
      homePageVideoList.value = [...homePageVideoList.value, ...result.data.record]
    }
  }
}
watch(()=>styleStore.isBottom,async (newValue:boolean)=>{
  if(newValue){
    pageNo.value++
    try {
      await getHomePageVideo()
    } catch (error) {
      pageNo.value--
    }
  }
})
const goDynamic=()=>{
  $router.push('/dynamic')
  styleStore.whiteTabbar=true
}
const goLive=()=>{
  $router.push('/live')
  styleStore.whiteTabbar=true
}
</script>

<style scoped lang="scss">
.main {
  .header-banner {
    width: 100%;
    height: 155px;
    background: url(./images/b站首页顶部图片.png) no-repeat;
    background-size: cover;
  }

  .container {
    margin: 0 50px;

    .header-channel {
      padding: 10px 0;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;

      .channel-left {
        display: flex;
        margin-right: 10px;
        transform-origin: top left;

        .btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          margin-right: 20px;

          .btn1 {
            background-color: #FF9212;

            &:hover {
              background-color: rgba(255, 146, 18, 0.8);
            }
          }

          .btn2 {
            background-color: #F07775;

            &:hover {
              background-color: rgba(240, 119, 117, 0.8);
            }
          }
        }
      }

      .channel-right {
        width: 100%;
        display: flex;

        .channel {
          width: 100%;
          padding-right: 30px;
          border-right: 1px solid #E3E5E7;
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(11, 1fr);
          grid-template-rows: repeat(2, 1fr);
          justify-content: center;
          align-items: center;

          .btn {
            color: black;
            border: 0;
            margin-left: 0;
          }

        }

        .channel2 {
          width: 280px;
          display: grid;
          grid-row-gap: 10px;
          grid-template-rows: repeat(2, 1fr);
          grid-template-columns: repeat(3, 1fr);
          flex-shrink: 0;

          .channel-right-btn {
            margin-left: 0;
            transform-origin: top left;

            &:hover {
              color: #00AEEC;
            }
          }
        }
      }


    }

    .recommend {
      width: 100%;
      display: grid;
      grid-gap: 20px;
      grid-template-rows: repeat(4, 1fr);

      .carousel {
        grid-column: 1/3;
        grid-row: 1/3;
      }
    }
  }

}
</style>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<style scoped lang="scss">
@media (max-width:1400px) {
  .main {
    .container {
      .recommend {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
}

@media (max-width:1200px) {
  .main {
    .container {
      .recommend {
        grid-template-columns: repeat(4, 260px);
      }
    }
  }
}

@media (min-width:1400px) {
  .main {
    .container {
      .recommend {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }
}
</style>
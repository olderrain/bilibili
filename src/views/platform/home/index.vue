<template>
  <div class="home">
    <el-card class="videodata">
      <div class="title">视频数据</div>
      <div class="datalist">
        <div class="dataitem" :class="activeIndex == 1 ? 'active' : ''" @click="activeIndex = 1">
          <div class="itemtitle">
            <img v-if="activeIndex != 1" src="../images/播放量.png" style="width: 20px;height: 20px;margin-right: 4px;">
            <img v-if="activeIndex == 1" src="../images/播放量 (1).png"
              style="width: 20px;height: 20px;margin-right: 4px;">播放量
          </div>
          <div class="num">{{ weekData.plays }}</div>
        </div>
        <div class="dataitem" :class="activeIndex == 2 ? 'active' : ''" @click="activeIndex = 2">
          <div class="itemtitle">
            <img v-if="activeIndex != 2" src="../images/净增粉丝数.png" style="width: 20px;height: 20px;margin-right: 4px;">
            <img v-if="activeIndex == 2" src="../images/净增粉丝数 (1).png"
              style="width: 20px;height: 20px;margin-right: 4px;">净增粉丝
          </div>
          <div class="num">{{ weekData.fans }}</div>
        </div>
        <div class="dataitem" :class="activeIndex == 3 ? 'active' : ''" @click="activeIndex = 3">
          <div class="itemtitle">
            <img v-if="activeIndex != 3" src="../images/赞 (1).png" style="width: 20px;height: 20px;margin-right: 4px;">
            <img v-if="activeIndex == 3" src="../images/赞 (2).png" style="width: 20px;height: 20px;margin-right: 4px;">点赞
          </div>
          <div class="num">{{ weekData.likes }}</div>
        </div>
        <div class="dataitem" :class="activeIndex == 4 ? 'active' : ''" @click="activeIndex = 4">
          <div class="itemtitle">
            <img v-if="activeIndex != 4" src="../images/收藏 (3).png" style="width: 20px;height: 20px;margin-right: 4px;">
            <img v-if="activeIndex == 4" src="../images/收藏 (4).png" style="width: 20px;height: 20px;margin-right: 4px;">收藏
          </div>
          <div class="num">{{ weekData.collects }}</div>
        </div>
        <div class="dataitem" :class="activeIndex == 5 ? 'active' : ''" @click="activeIndex = 5">
          <div class="itemtitle">
            <img v-if="activeIndex != 5" src="../images/硬币.png" style="width: 20px;height: 20px;margin-right: 4px;">
            <img v-if="activeIndex == 5" src="../images/硬币 (1).png" style="width: 20px;height: 20px;margin-right: 4px;">硬币
          </div>
          <div class="num">{{ weekData.coins }}</div>
        </div>
        <div class="dataitem" :class="activeIndex == 6 ? 'active' : ''" @click="activeIndex = 6">
          <div class="itemtitle">
            <img v-if="activeIndex != 6" src="../images/评论 (1).png" style="width: 20px;height: 20px;margin-right: 4px;">
            <img v-if="activeIndex == 6" src="../images/评论 (2).png" style="width: 20px;height: 20px;margin-right: 4px;">评论
          </div>
          <div class="num">{{ weekData.marks }}</div>
        </div>
        <div class="dataitem" :class="activeIndex == 7 ? 'active' : ''" @click="activeIndex = 7">
          <div class="itemtitle">
            <img v-if="activeIndex != 7" src="../images/弹幕 (3).png" style="width: 20px;height: 20px;margin-right: 4px;">
            <img v-if="activeIndex == 7" src="../images/弹幕 (4).png" style="width: 20px;height: 20px;margin-right: 4px;">弹幕
          </div>
          <div class="num">{{ weekData.danmus }}</div>
        </div>
        <div class="dataitem" :class="activeIndex == 8 ? 'active' : ''" @click="activeIndex = 8">
          <div class="itemtitle">
            <img v-if="activeIndex != 8" src="../images/分享.png" style="width: 20px;height: 20px;margin-right: 4px;">
            <img v-if="activeIndex == 8" src="../images/分享 (1).png" style="width: 20px;height: 20px;margin-right: 4px;">分享
          </div>
          <div class="num">{{ weekData.forwards }}</div>
        </div>
      </div>
    </el-card>
    <charts :activeIndex="activeIndex"></charts>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive } from 'vue'
import Charts from '@/components/charts/index.vue'
import { WeekData, weekResponseData } from '@/api/user/type';
import { reqWeekData } from '@/api/user';
let activeIndex = ref<number>(1)
let weekData = reactive<WeekData>({
  "plays": 0,
  "fans": 0,
  "likes": 0,
  "collects": 0,
  "coins": 0,
  "marks": 0,
  "danmus": 0,
  "forwards": 0
})
onMounted(() => {
  getWeekData()
})
const getWeekData = async () => {
  let result: weekResponseData = await reqWeekData()
  if (result.code == 200) {
    Object.assign(weekData,result.data)
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 1400px;
  margin: 0 auto;

  .videodata {
    margin-top: 50px;
    margin-bottom: 10px;

    .title {
      font-weight: 600;
      padding-bottom: 20px;

    }

    .datalist {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;

      .dataitem {
        cursor: pointer;
        font-size: 15px;
        padding: 20px;
        height: 120px;
        background-color: rgba(0, 174, 236, .04);
        color: #888;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .itemtitle {
          display: flex;
          align-items: center;
        }

        .num {
          font-size: 20px;
          color: black;
          font-weight: 600;
        }
      }

      .active {
        background-color: #FF4684;
        color: white;

        .num {
          color: white;
        }
      }
    }
  }
}
</style>
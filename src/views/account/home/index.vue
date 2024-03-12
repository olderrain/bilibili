<template>
  <div class="active2">
    <div class="information">
      <el-button @click="goSpace" class="avatarbtn" style="--el-button-text-color:white">
        <div class="hidden"></div>
        <img :src="userStore.accountInfo.userImage">
        <span>个人空间</span>
      </el-button>
      <div class="right">
        <div class="username">
          {{ userStore.accountInfo.userName }}
          <el-tag type="danger">正式会员</el-tag>
        </div>
        <div class="exp">
          <el-progress class="progress" :stroke-width="20"
            :percentage="userStore.accountInfo.exp / userStore.accountInfo.nextExp * 100" status="exception">
            <span style="font-size: 14px;">{{ userStore.accountInfo.exp }}/{{ userStore.accountInfo.nextExp
              }}</span>
          </el-progress>
          <div class="btn">
            <el-button size="small" style="background-color: transparent;" @click="goSetting">修改资料</el-button>
            <el-button size="small" style="background-color: transparent;" @click="goSpace">个人空间
              <img src="../images/右.png" alt="" style="width: 14px;height: 14px;">
            </el-button>
          </div>
        </div>
        <div class="coins">硬币:{{ userStore.accountInfo.coins }}</div>
      </div>
    </div>
    <div class="reward">
      <div class="title">
        <img src="../images/奖励单.png" alt="" style="width: 30px;height: 30px;">
        <span style="font-size: 18px;">每日奖励</span>
      </div>
      <div class="rewardcontent">
        <div class="item">
          <img v-show="dailyMission.dailyReg" src="../images/完成经验任务.png" alt=""
            style="width: 72px;height: 76px;margin-bottom: 16px;">
          <img v-show="!dailyMission.dailyReg" src="../images/5exp获得.png" alt=""
            style="width: 72px;height: 72px;margin-bottom: 16px;">
          <div class="mission">每日登录</div>
          <div v-show="!dailyMission.dailyReg" class="unachieve">未完成</div>
          <div class="achieve" v-show="dailyMission.dailyReg">
            <el-tag type="info" size="small">5经验值到手</el-tag>
          </div>
        </div>
        <div class="item">
          <img v-show="dailyMission.dailyWatch" src="../images/完成经验任务.png" alt=""
            style="width: 72px;height: 76px;margin-bottom: 16px;">
          <img v-show="!dailyMission.dailyWatch" src="../images/5exp获得.png" alt=""
            style="width: 72px;height: 72px;margin-bottom: 16px;">
          <div class="mission">每日观看视频</div>
          <div v-show="!dailyMission.dailyWatch" class="unachieve">未完成</div>
          <div v-show="dailyMission.dailyWatch" class="achieve">
            <el-tag type="info" size="small">5经验值到手</el-tag>
          </div>
        </div>
        <div class="item">
          <img v-show="dailyMission.dailyCoins >= 50 ? true : false" src="../images/完成经验任务.png" alt=""
            style="width: 72px;height: 76px;margin-bottom: 16px;">
          <img v-show="dailyMission.dailyCoins >= 50 ? false : true" src="../images/投币经验.png" alt=""
            style="width: 72px;height: 72px;margin-bottom: 16px;">
          <div class="mission">每日投币</div>
          <div v-show="dailyMission.dailyCoins >= 50 ? false : true" class="unachieve">已获得{{
        dailyMission.dailyCoins }}/50</div>
          <div v-show="dailyMission.dailyCoins >= 50 ? true : false" class="achieve">
            <el-tag type="info" size="small">50经验值到手</el-tag>
          </div>
        </div>
        <div class="item" style="border-right: 0;">
          <img v-show="dailyMission.dailyShare" src="../images/完成经验任务.png" alt=""
            style="width: 72px;height: 76px;margin-bottom: 16px;">
          <img v-show="!dailyMission.dailyShare" src="../images/5exp获得.png" alt=""
            style="width: 72px;height: 72px;margin-bottom: 16px;">
          <div class="mission">每日分享视频</div>
          <div v-show="!dailyMission.dailyShare" class="unachieve">未完成</div>
          <div v-show="dailyMission.dailyShare" class="achieve">
            <el-tag type="info" size="small">5经验值到手</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive } from 'vue'
import useUserStore from '@/store/modules/user';
import { reqDailyMission } from '@/api/user/index.ts'
import type { dailyMissionResponseData, dailyMissionData, userInfoData } from '@/api/user/type.ts'
import { useRouter } from 'vue-router'
let $router = useRouter()
let userStore = useUserStore()
let dailyMission = reactive<dailyMissionData>({
  "userId": 0,
  "dailyReg": true,
  "dailyWatch": true,
  "dailyCoins": 0,
  "dailyShare": true
})
const getAccountInfo = () => {
  userStore.getAccountInfo()
}
onMounted(() => {
  getAccountInfo()
  getDailyMission()
})
const getDailyMission = async () => {
  let result: dailyMissionResponseData = await reqDailyMission()
  if (result.code == 200) {
    dailyMission = result.data
  }
}
const goSpace = () => {
  $router.push('/space')
}
const goSetting = () => {
  $router.push('/account/setting')
}
</script>

<style scoped lang="scss">
.active2 {
  padding: 50px 20px;

  .information {
    display: flex;
    padding-bottom: 50px;
    border-bottom: 1px solid #eee;

    .avatarbtn {
      position: relative;
      width: 60px;
      height: auto;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background-color: transparent;
      margin: 0 20px;
      right: 50px;
      .hidden {
        position: absolute;
        z-index: 1;
        width: 60px;
        height: 60px;
        background-color: transparent;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      img {
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        z-index: 0.9;
      }

      span {
        position: absolute;
        color: #eee;
        font-size: 12px;
        display: none;
        left: 30px;
      }

      &:hover {
        .hidden {
          background-color: #fff;
          filter: brightness(20%) opacity(0.7);
        }

        span {
          display: block;
          z-index: 2;

        }
      }
    }

    .right {
      width: 100%;
      // position: relative;
      .exp {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .progress {
          width: 500px;
        }

        .btn {
          display: flex;
          font-size: 12px;
        }
      }
    }
  }

  .reward {
    padding: 50px 0;
    border-bottom: 1px solid #eee;

    .title {
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
      }
    }

    .rewardcontent {
      display: flex;
      justify-content: space-around;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid #eee;
        width: 257px;

        .mission {
          margin-bottom: 15px;
        }

        .unachieve {
          color: #888;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
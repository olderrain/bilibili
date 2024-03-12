<template>
  <div class="account">
    <div class="space"></div>
    <div class="header">
      <div class="header-img"></div>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="3" class="left">
          <el-menu :default-active="activeIndex" class="el-menu-demo" @select="handleSelect">
            <el-menu-item index="1" disabled>个人中心</el-menu-item>
            <el-menu-item index="2">
              <img class="img1" src="./images/首页.png" alt="">
              首页
            </el-menu-item>
            <el-menu-item index="3">
              <img class="img1" src="./images/我的信息.png" alt="">
              我的信息
            </el-menu-item>
            <el-menu-item index="4">
              <img class="img1" src="./images/我的头像.png" alt="">
              我的头像
            </el-menu-item>
            <el-menu-item index="5">
              <img class="img1" src="./images/黑名单管理.png" alt="">
              黑名单
            </el-menu-item>
            <el-menu-item index="6">
              <img class="img1" src="./images/积分 金币 硬币.png" alt="">
              我的硬币
            </el-menu-item>
            <el-button text style="width: 100%;height: 56px;" @click="goSpace">
              个人空间
              <img src="./images/右.png" alt="" style="width: 16px;height: 16px;">
            </el-button>
            <el-button text style="width: 100%;height: 56px;margin-left: 0;" @click="goPlatform">
              创作空间
              <img src="./images/右.png" alt="" style="width: 16px;height: 16px;">
            </el-button>
          </el-menu>
        </el-col>
        <el-col :span="21" class="right">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { ref,computed } from 'vue'
import { useRouter,useRoute } from 'vue-router';
let $router = useRouter()
let $route = useRoute()
let activeIndex=computed(()=>{
  if($route.path=='/account/home'){
    return '2'
  }
  if($route.path=='/account/setting'){
    return '3'
  }
  if($route.path=='/account/face/vip'||$route.path=='/account/face/upload'){
    return '4'
  }
  if($route.path=='/account/blacklist'){
    return '5'
  }
  if($route.path=='/account/coin'){
    return '6'
  }
})
const handleSelect = (key: string) => {
  if (key == '2') {
    $router.push('/account/home')
  }
  if (key == '3') {
    $router.push('/account/setting')
  }
  if (key == '4') {
    $router.push('/account/face')
  }
  if (key == '5') {
    $router.push('/account/blacklist')
  }
  if (key == '6') {
    $router.push('/account/coin')
  }
}
const goSpace=()=>{
  $router.push('/space')
}
const goPlatform=()=>{
  $router.push('/platform')
}
</script>

<style scoped lang="scss">
.account {
  .space {
    width: 100%;
    height: 64px;
  }

  .header {
    width: 100%;
    height: 134px;
    background: url(./images/顶部图片色块.png) repeat-x;

    .header-img {
      width: 1231px;
      height: 134px;
      margin: 0 auto;
      background: url(./images/找回密码顶部图片.png) no-repeat;
    }
  }

  .content {

    width: 1231px;
    height: auto;
    margin: 10px auto;
    border: 1px solid #eee;

    .left {
      .img1 {
        width: 18px;
        height: 18px;
        margin-right: 5px;
      }
    }

    .right {}
  }
}
</style>
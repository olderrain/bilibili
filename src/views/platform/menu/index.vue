<template>
  <div class="menu">
    <div class="tougaobtn">
      <el-button @click="goUpload" color="#00aeec" style="color: white;width: 120px;">
        <img src="../images/上传.png" style="width: 20px;height: 20px;margin-right: 6px;">
        投稿
      </el-button>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
      <el-menu-item index="1">
        <el-icon><home-filled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon>
          <document />
        </el-icon>
        <span>视频管理</span>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><chat-line-round /></el-icon>
          <span>互动管理</span>
        </template>
        <el-menu-item index="3-1">评论管理</el-menu-item>
        <el-menu-item index="3-2">弹幕管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang='ts'>
import {ref,onMounted} from 'vue'
import {
  Document,
  HomeFilled,
  ChatLineRound
} from '@element-plus/icons-vue'
import { useRouter,useRoute } from 'vue-router';
let $router=useRouter()
let $route=useRoute()
let activeIndex=ref<string>('')
onMounted(()=>{
  if($route.path=='/platform/home'){
    activeIndex.value='1'
  }
  if($route.path=='/platform/video-manager'){
    activeIndex.value='2'
  }
  if($route.path=='/platform/mark-manager'){
    activeIndex.value='3-1'
  }
  if($route.path=='/platform/danmu-manager'){
    activeIndex.value='3-2'
  }
})
const handleSelect=(key:string)=>{
  activeIndex.value=key
  if(key=='1'){
    $router.push('/platform/home')
  }
  if(key=='2'){
    $router.push('/platform/video-manager')
  }
  if(key=='3-1'){
    $router.push('/platform/mark-manager')
  }
  if(key=='3-2'){
    $router.push('/platform/danmu-manager')
  }
}
const goUpload=()=>{
  $router.push('/platform/upload')
}
</script>

<style scoped lang="scss">
.menu {
  .tougaobtn {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
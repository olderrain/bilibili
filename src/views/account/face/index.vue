<template>
  <div class="active4">
    <div class="title">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/account/face' }">我的头像</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.path=='/account/face/upload'" :to="{ path: '/account/face' }">我的头像</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang='ts'>
import { ArrowRight } from '@element-plus/icons-vue';
import {useRoute} from 'vue-router'
let $route=useRoute()
</script>

<style scoped lang="scss">
.active4 {
  padding: 20px;

  .title {
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  
}</style>
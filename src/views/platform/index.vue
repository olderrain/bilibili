<template>
  <div class="container">
    <div class="space"></div>
    <div class="row">
      <div class="menu">
        <el-scrollbar height="100vh">
          <Menu></Menu>
        </el-scrollbar>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import Menu from '@/views/platform/menu/index.vue'
</script>

<style scoped lang="scss">
.container {
  .space {
    height: 64px;
    width: 100%;
  }

  .row {
    width: 100%;
    display: flex;

    .menu {
      width: 200px;
    }

    .content {
      width: 100%;
    }
  }
}
</style>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
<template>
  <div class="layout_container">
    <div class="layout_tabbar">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Tabbar from './tabbar/index.vue'
import Main from './main/index.vue'
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100%;

  .layout_tabbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 64px;
    z-index: 1;
  }

  .layout_main {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
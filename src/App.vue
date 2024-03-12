<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang='ts'>
import useStyleStore from './store/modules/style';
import { useRoute } from 'vue-router';
let styleStore=useStyleStore()
let $route = useRoute()
window.onscroll = function () {
  //变量scrollTop是滚动条滚动时，距离顶部的距离
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  //变量windowHeight是可视区的高度
  var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //变量scrollHeight是滚动条的总高度
  var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  //滚动条到底部的条件
  if (scrollTop + windowHeight == scrollHeight) {
    //到了这个就可以进行业务逻辑加载后台数据了
    styleStore.isBottom = true;
  } else {
    styleStore.isBottom = false;
  }
  if ($route.path == "/home") {
    let top = document.documentElement.scrollTop;
    if (top > 0) {
      styleStore.whiteTabbar = true;
    } else {
      styleStore.whiteTabbar = false;
    }
  } else {
    styleStore.whiteTabbar = true;
  }
}
</script>

<style scoped>

</style>
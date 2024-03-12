<template>
  <div class="outervideo" @click="goVideo">
    <div class="top">
      <div class="img" ref="img">
        <div></div>
        <div class="information">
          <div class="left">
            <img src="./images/视频.png" alt="" style="width: 22px;height: 20px;margin-right: 2px;margin-left: 5px;">
            <span style="margin-right: 10px;">{{ props.item.plays }}</span>
            <img src="./images/弹幕.png" alt="" style="width: 18px;height: 15px;margin-right: 2px;">
            <span>{{ props.item.marks }}</span>
          </div>
          <div class="right">
            {{ props.item.totalHours==0?'':props.item.totalHours + ':' }}{{ props.item.totalMinutes>=10?props.item.totalMinutes:'0'+props.item.totalMinutes +':' }}{{ props.item.totalSeconds>=10?props.item.totalSeconds:'0'+props.item.totalSeconds}}
          </div>
        </div>
      </div>
      <div class="title">
        {{ props.item.title }}
      </div>
    </div>
    <div class="bottom">
      <img src="./images/UP主 (1).png" alt="" style="width: 22px;height: 20px; margin-right: 5px;">
      <span>{{ props.item.name }} · {{ time }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import useStyleStore from '@/store/modules/style';
import { onMounted, ref } from 'vue'
import {useRouter} from 'vue-router'
const props = defineProps(['item'])
let img = ref<any>()
let time = ref<string>('')
let $router=useRouter()
let styleStore = useStyleStore()
onMounted(() => {
  img.value.style.background = `url(${props.item.coverImageLink}) no-repeat`
  img.value.style.backgroundSize = 'cover'
  time.value = props.item.releaseTime.split(' ')[0]
})
const goVideo=()=>{
  $router.push(`/video/${props.item.videoId}`)
  styleStore.whiteTabbar = true
}
</script>

<style scoped lang="scss">
.outervideo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  cursor: pointer;
  .top {
    .img {
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // background: url(./images/视频封面.png) no-repeat;
      // background-size: cover;

      .information {
        display: flex;
        align-items: center;
        color: white;
        margin-bottom: 5px;
        justify-content: space-between;
        .left{
          display: flex;
          align-items: center;
        }
        .right{
          display: flex;
          align-items: center;
          margin-right: 5px;
        }
      }
    }

    .title {
      margin: 5px 0;
    }
  }


  .bottom {
    display: flex;
    align-items: center;

    span {
      font-size: 14px;
      color: #bfbfbf;
    }
  }
}
</style>
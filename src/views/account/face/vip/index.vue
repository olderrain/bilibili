<template>
  <div class="userimage">
    <el-button class="btn" @click="goUpload">
      <div class="btn-container">
        <div>更换</div>
        <div>头像</div>
      </div>
    </el-button>
    <img :src="userStore.userImage">
  </div>
</template>

<script setup lang='ts'>
import {useRouter} from 'vue-router'
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
let $router=useRouter()
const goUpload=()=>{
  $router.push('/account/face/upload')
}
</script>

<style scoped lang="scss">
.userimage {
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .btn {
    position: absolute;
    right: 49%;
    top: 32%;
    background-color: #00AEEC;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
  }

  img {
    padding: 40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 1px solid #eee;
  }
}
</style>
<template>
  <el-card class="fans">
    <el-row>
      <el-col :span="3">
        <el-menu :default-active="activeIndex" @select="handleSelect">
          <el-menu-item index="1">
            <span>我的关注</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;360</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>我的粉丝</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang='ts'>
import {ref,onMounted} from 'vue'
import {useRoute,useRouter} from 'vue-router'
let $route=useRoute()
let $router=useRouter()
let activeIndex=ref<string>('1')
onMounted(()=>{
  if($route.path=='/space/fans/follow'){
    activeIndex.value='1'
  }
  if($route.path=='/space/fans/fan'){
    activeIndex.value='2'
  }
})
const handleSelect=(key:string)=>{
  if(key=='1'){
    $router.push('/space/fans/follow')
  }
  if(key=='2'){
    $router.push('/space/fans/fan')
  }
}
</script>

<style scoped lang="scss">
.fans {
  width: 1679px;
}

@media (max-width:1700px) {
  .fans {
    width: 1400px;
  }
}
</style>
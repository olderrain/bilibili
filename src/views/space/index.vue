<template>
  <div class='space'>
    <div class="occupyspace"></div>
    <div class="container">
      <el-card class="header" :body-style="elCardBodyStyle">
        <div class="top">
          <div class="user">
            <img :src="userStore.userImage" style="width: 60px;height: 60px;border-radius: 50%;">
            <div class="information">
              <div class="name">
                <span style="margin-right: 5px;">{{ userStore.userName }}</span>
                <img v-show="userStore.sexType == '男'" src="./images/男.png" style="width: 20px;height: 20px;">
                <img v-show="userStore.sexType == '女'" src="./images/女.png" style="width: 20px;height: 20px;">
              </div>
              <div class="signiture">
                <input type="text" class="input" v-model="signature" @blur="saveSignature" @keyup.enter="saveSignature($event)">
              </div>
            </div>
          </div>
        </div>
        <div class="menu">
          <div class="left">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">
                <img src="./images/首页 (1).png" style="width: 18px;height: 18px;">
                主页
              </el-menu-item>
              <el-menu-item index="2">
                <img src="./images/动态.png" style="width: 20px;height: 20px;">
                动态
              </el-menu-item>
              <el-menu-item index="3">
                <img src="./images/电视机.png" style="width: 22px;height: 22px;">
                投稿
              </el-menu-item>
              <el-menu-item index="4">
                <img src="./images/24px.png" style="width: 20px;height: 20px;">
                合集和列表
              </el-menu-item>
              <el-menu-item index="5">
                <img src="./images/收藏 (2).png" style="width: 22px;height: 22px;">
                收藏
              </el-menu-item>
            </el-menu>
            <el-input v-model="input1" placeholder="搜索视频、动态" class="search" :suffix-icon="Search" />
          </div>
          <div class="right">
            <div class="rightnum" @click="goFollow">
              <div class="numname">关注数</div>
              <div>{{ userStore.follows }}</div>
            </div>
            <div class="rightnum" @click="goFan">
              <div class="numname">粉丝数</div>
              <div>{{ userStore.fans }}</div>
            </div>
            <div class="rightnum">
              <div class="numname">获赞数</div>
              <div>{{ userStore.likes }}</div>
            </div>
            <div class="rightnum">
              <div class="numname">播放数</div>
              <div>{{ userStore.plays }}</div>
            </div>
          </div>
        </div>
      </el-card>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive,computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user';
import { reqEditSignature } from '@/api/user';
import { ElMessage } from 'element-plus';
import { useRouter,useRoute } from 'vue-router';
let userStore = useUserStore()
let $router=useRouter()
let elCardBodyStyle = reactive({
  'padding': 0,
})
let signature=userStore.signature
let $route = useRoute()
let activeIndex=computed(()=>{
  if($route.path=='/space/home'){
    return '1'
  }
  if($route.path=='/space/dynamic'){
    return '2'
  }
  if($route.path=='/space/tougao'){
    return '3'
  }
  if($route.path=='/space/collection'){
    return '4'
  }
  if($route.path=='/space/collector'){
    return '5'
  }
})
const handleSelect = (key: string) => {
  if(key=='1'){
    $router.push('/space/home')
  }
  if(key=='2'){
    $router.push('/space/dynamic')
  }
  if(key=='3'){
    $router.push('/space/tougao')
  }
  if(key=='4'){
    $router.push('/space/collection')
  }
  if(key=='5'){
    $router.push('/space/collect')
  }
}
const saveSignature=async (event:any)=>{
  if(event){
    event.target.blur()
  }
  try {
    await reqEditSignature(signature)
    ElMessage({
      type:'success',
      message:'修改成功'
    })
    userStore.userInfo()
  } catch (error) {
    ElMessage({
      type:'error',
      message:'修改失败'
    })
  }
}
const goFan=()=>{
  $router.push('/space/fans/fan')
}
const goFollow=()=>{
  $router.push('/space/fans/follow')
}
</script>

<style scoped lang="scss">
.space {
  .occupyspace {
    width: 100%;
    height: 64px;
  }

  .container {
    width: 1679px;
    margin: 0 auto;

    .header {
      padding: 0;
      margin-bottom: 10px;

      .top {
        height: 260px;
        background-position: 50%;
        background: url('./images/个人空间顶部图片.png') no-repeat;
        background-size: cover;

        .user {
          padding-top: 180px;
          margin-left: 20px;
          display: flex;
          align-items: center;

          .information {
            margin-left: 22px;
            color: white;

            .name {
              font-weight: 600;
              font-size: 18px;
              display: flex;
              align-items: center;
            }

            .signiture {
              margin-top: 10px;
              font-size: 12px;

              .input {
                background-color: transparent;
                border: 1px solid transparent;
                transition: all linear 0.2s;
                border-radius: 2px;
                width: 730px;

                &:hover {
                  border: 1px solid #ccc;
                  background-color: rgba($color: #ccc, $alpha: 0.2);
                }

                &:focus {
                  background-color: white;
                  color: black;
                }
              }
            }
          }
        }
      }

      .menu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;

        .left {
          display: flex;
          align-items: center;

          .el-menu-demo {
            width: 550px;
          }

          .search {
            width: 160px;
            height: 30px;
            border-radius: 30px;
          }
        }

        .right {
          display: flex;

          .rightnum {
            padding: 10px 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            cursor: pointer;
            &:hover{
              color: #00aeec;
              .numname{
                color: #00aeec;
              }
            }
            .numname {
              color: #888;
              margin-bottom: 5px;
            }
          }
        }
      }
    }

    .content {
      display: flex;
      width: 100%;  
    }
  }

}
</style>

<style scoped lang="scss">
@media (max-width: 1700px) {
  .space {
    .container {
      width: 1400px;

      .header {
        width: 1400px;
      }
    }
  }
}
</style>

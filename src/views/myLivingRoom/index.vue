<template>
  <div class="mylivingroom">
    <div class="space"></div>
    <div class="bg"></div>
    <div class="container">
      <div class="left">
        <div class="left-card">
          <div class="video"></div>
          <div class="bottom">
            <div class="bottom-left">
              <div class="avatar">
                <img :src="userStore.userImage" style="width: 65px;height: 65px;border-radius: 50%;margin-right: 20px;">
              </div>
              <div class="title">
                <div class="look" v-if="!isEdit">
                  <span>{{ title }}</span>
                  <img @click="goEdit" src="./images/编辑.png"
                    style="width: 20px;height: 20px;margin-left: 10px;cursor: pointer;">
                </div>
                <div class="input" v-if="isEdit">
                  <el-input maxlength="20" v-model="newtitle" style="width: 260px;" placeholder="最大限制20字"></el-input>
                  <el-button @click="confirm" color="#FA729A" style="color:white;">确认</el-button>
                  <el-button @click="cancel"
                    style="color:#FA729A;background-color: white;border: 1px solid #FA729A;">取消</el-button>
                </div>
                <div class="pushurl">推流地址：{{ pushUrl }}</div>
              </div>
            </div>
            <div class="bottom-right">
              <el-button v-if="!isLive" @click="onLive" color="#FA729A" style="color:white;"
                size="large">开始直播</el-button>
              <el-button v-if="isLive" @click="offLive" color="#FA729A" style="color:white;"
                size="large">关闭直播</el-button>
            </div>
          </div>
        </div>

      </div>
      <div class="right">
        <div class="coverimage">
          <div class="title">视频封面</div>
          <div class="con" style="display: flex;">
            <el-upload class="avatar-uploader" action="/api/video/img" :show-file-list="false"
              :on-success="handleImageSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
            <el-button :disabled="updateImageDisable" @click="updateImage" color="#FA729A"
              style="color:white;">确认</el-button>
          </div>

        </div>
        <div class="danmu">
          <div class="title">弹幕互动区</div>
          <div class="content"></div>
          <div class="input">
            <el-input maxlength="20" placeholder="和观众聊聊吧~"></el-input>
            <el-button color="#FA729A" style="color:white;">发送</el-button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, type UploadProps } from 'element-plus'
import { reqEditImage, reqEditName,  reqImage, reqOnLive, reqTitle ,reqOffLive} from '@/api/live';
import {  onLiveResponseData } from '@/api/live/type';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
let isEdit = ref<boolean>(false)
let title = ref<string>('标题')
let newtitle = ref<string>('')
let imageUrl = ref<string>('')
let isLive = ref<boolean>(false)
let cid = ref<string>('')
let pushUrl = ref<string>('')
let updateImageDisable = ref<boolean>(true)
onMounted(async () => {
  getImage()
  getTitle()
})
const goEdit = () => {
  isEdit.value = true
}
const goLook = () => {
  isEdit.value = false
}
const confirm = async () => {
  try {
    await updateTitle()
    title.value = newtitle.value
    goLook()
  } catch (error) {
    console.log(error);
  }
}
const cancel = () => {
  goLook()
}
const handleImageSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = response.data
  updateImageDisable.value = false
}
const onLive = async () => {
  let result: onLiveResponseData = await reqOnLive()
  if (result.code == 200) {
    pushUrl.value = result.data.pushUrl
    cid.value = result.data.cid
    isLive.value = true
  }
}
const offLive = async () => {
  let result: any = await reqOffLive()
  if (result.code == 200) {
    pushUrl.value=''
    isLive.value = false
  }
}
const getImage = async () => {
  let result: any = await reqImage()
  if (result.code == 200) {
    imageUrl.value = result.data
  }
}
const getTitle = async () => {
  let result: any = await reqTitle()
  if (result.code == 200) {
    title.value = result.data
  }
}
const updateImage = async () => {
  let result: any = await reqEditImage(imageUrl.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
    updateImageDisable.value = true
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败'
    })
    updateImageDisable.value = false
  }
}
const updateTitle = async () => {
  let result: any = await reqEditName(newtitle.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败'
    })
    return Promise.reject(new Error('1'))
  }
}
</script>

<style scoped lang="scss">
.mylivingroom {
  .space {
    width: 100%;
    height: 64px;
  }

  .bg {
    background: url('./images/我的直播间背景图.jpg') no-repeat;
    background-size: cover;
    height: 56.25vw;
    width: 100%;
    position: fixed;
    z-index: 0;
    bottom: 0;
  }

  .container {
    width: 1320px;
    margin: 20px auto;
    display: flex;

    .left {
      position: relative;
      margin-right: 10px;

      .left-card {
        width: 960px;

        .video {
          width: 100%;
          height: 540px;
          background-color: black;
        }

        .bottom {
          width: 100%;
          height: 106px;
          background-color: white;
          border-radius: 5px;
          padding: 10px;
          display: flex;
          justify-content: space-between;

          .bottom-left {
            display: flex;

            .look {
              display: flex;
              align-items: center;
            }

            .input {
              display: flex;
            }
          }

          .bottom-right {
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .right {
      position: relative;
      width: 100%;

      .coverimage {
        height: 240px;
        background-color: white;
        margin-bottom: 10px;
        padding: 10px;

        .title {
          font-size: 15px;
          padding-bottom: 10px;
        }
      }

      .danmu {
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        height: 396px;

        .title {
          font-size: 15px;
          padding-bottom: 10px;
        }

        .content {
          height: 100%;
        }

        .input {
          padding-top: 10px;
          display: flex;
        }
      }



    }
  }

}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
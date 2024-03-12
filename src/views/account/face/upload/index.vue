<template>
  <div class="container">
    <div class="content">
      <div class="left">
        <el-upload class="avatar-uploader" action="/api/video/img" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <el-button class="btn" type="info">选择本地图片</el-button>
        </el-upload>
      </div>
      <div class="right">
        <img :src="imageUrl" style="width: 80px;height: 80px;border-radius: 50%;margin-bottom: 20px;">
        <div style="font-size: 12px;color: #888;">当前头像</div>
      </div>
    </div>
    <div class="desc">
      请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M
    </div>
    <div class="button">
      <el-button class="btn" type="info" :disabled="!change" @click="updateUserImage">更新</el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref,onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { reqPostImg } from '@/api/user';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
let change = ref<boolean>(false)
const imageUrl = ref('')
onMounted(()=>{
  imageUrl.value=userStore.userImage
})
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  imageUrl.value = response.data
  change.value = true
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片必须是JPG/PNG格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片需小于2M!')
    return false
  }
  return true
}
const updateUserImage = async () => {
  try {
    await reqPostImg(imageUrl.value)
    ElMessage({
      type: 'success',
      message: '更新成功'
    })
    userStore.userInfo()
    userStore.getAccountInfo()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '更新失败'
    })
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    padding: 80px 20px 56px;
    display: flex;
    align-items: center;

    .left {
      padding-right: 30px;
      border-right: 1px solid #eee;

      .btn {
        width: 200px;
        height: 80px;
        background-color: #eee;
        color: #888;
        border: 0;

        &:hover {
          background-color: #ccc;
        }
      }
    }

    .right {
      padding-left: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .desc {
    font-size: 12px;
    color: #888;
    margin-bottom: 50px;
  }

  .button {
    .btn {
      width: 160px;
      height: 40px;
      background-color: #eee;
      color: #888;
      border: 0;

      &:hover {
        background-color: #ccc;
      }

      &:disabled {
        background-color: #f3f3f3;
        color: #ccc;
      }
    }
  }
}
</style>
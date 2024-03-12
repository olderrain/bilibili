<template>
  <div class="active3">
    <el-form class="form">
      <el-form-item label="昵称" label-width="80px">
        <el-input v-model="infoParams.userName" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="用户名" label-width="80px">
        <span style="color:#888">bili_{{ infoParams.userId }}</span>
      </el-form-item>
      <el-form-item label="我的签名" label-width="80px">
        <el-input v-model="infoParams.signature" style="width: 100%;margin-right: 30px;" :rows="4" type="textarea"
          placeholder="设置您的签名" />
      </el-form-item>
      <el-form-item label="性别" label-width="80px">
        <el-radio-group v-model="infoParams.sexType">
          <el-radio-button label="男" value="1" />
          <el-radio-button label="女" value="2" />
          <el-radio-button label="保密" value="3" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" label-width="80px">
        <el-date-picker v-model="infoParams.birthday" type="date" placeholder="选择日期" size="default" />
      </el-form-item>
      <el-form-item label="学校信息" label-width="80px">
        <span>{{ infoParams.school }}</span>
      </el-form-item>
    </el-form>
    <div class="btn" style="display: flex;justify-content: center;margin-top: 40px;">
      <el-button color="#00AEEC" style="color: white;width: 100px;" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive } from 'vue'
import { reqEditInfo } from '@/api/user/index.ts'
import type { userInfoData } from '@/api/user/type.ts'
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
let infoParams = reactive<userInfoData>({
  userName: '',
  userId: 0,
  signature: '',
  sexType: '',
  birthday: '',
  school: '',
})
onMounted(() => {
  setInfoParams()
})
const setInfoParams = () => {
  infoParams.userName = userStore.userName
  infoParams.userId = userStore.userId
  infoParams.signature = userStore.signature
  infoParams.sexType = userStore.sexType
  infoParams.birthday = userStore.birthday
  infoParams.school = userStore.school
}
const save = async () => {
  try {
    await reqEditInfo(infoParams)
    ElMessage({
      type: 'success',
      message: '保存成功'
    })
    userStore.userInfo()
    userStore.getAccountInfo()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '保存失败'
    })
  }
}
</script>

<style scoped lang="scss">
.active3 {
  padding: 20px;

  .form {
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
}
</style>
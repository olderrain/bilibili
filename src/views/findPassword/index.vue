<template>
  <div class="findpassword">
    <div class="space"></div>
    <div class="header">
      <div class="header-img"></div>
    </div>
    <div class="content">
      <div class="procedure1">
        <div class="denglu">
          <div class="denglu1">登录</div>
          <img src="./右.png" style="height: 14px;margin: 0 8px;">
        </div>
        <div class="wangjimima">忘记密码</div>
      </div>
      <div class="content2">
        <div class="procedure2">
          <img v-show="scene == 1" src="./找回密码流程1.png">
          <img v-show="scene == 2" src="./找回密码流程2.png">
          <img v-show="scene == 3" src="./找回密码流程3.png">
        </div>
        <div class="form">
          <div v-if="scene == 3" class="success">
            <img src="./流程三成功图片1.png">
            <div style="display: flex;justify-content: center;margin-bottom: 20px;">
              <div>重置密码成功~ </div>
              <div style="color:#aaa">({{ time }}秒后跳转首页)</div>
            </div>
          </div>


          <el-form>
            <el-form-item v-show="scene == 1" label="邮箱号" style="display: flex;align-items: center;">
              <el-input v-model="findPasswordParams.username" size="large" placeholder="请输入邮箱号"></el-input>
            </el-form-item>
            <el-form-item v-show="scene == 2" label="邮箱号" style="display: flex;align-items: center;">
              <el-input :disabled="true" v-model="findPasswordParams.username" size="large" placeholder="请输入邮箱号">
                <template #append>
                  <el-button text style="color: #00aeec"
                    @click="scene = 1; findPasswordParams.username = ''">修改</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item v-show="scene == 2" label="新密码" style="display: flex;align-items: center;">
              <el-input v-model="findPasswordParams.password" size="large" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item v-show="scene == 2" label="验证码" style="display: flex;align-items: center;">
              <el-input v-model="findPasswordParams.code" size="large" placeholder="请输入验证码">
                <template #append>
                  <el-button text style="color: #00aeec" @click="getCode">获取验证码</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button v-show="scene == 1" :disabled="findPasswordParams.username ? false : true" @click="scene = 2"
            color="#00AEEC" style="color:white;width: 100%;height: 40px;margin-top: 30px;">下一步</el-button>
          <el-button v-show="scene == 2"
            :disabled="findPasswordParams.username && findPasswordParams.password && findPasswordParams.code ? false : true"
            @click="findPassword" color="#00AEEC"
            style="color:white;width: 100%;height: 40px;margin-top: 30px;">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reqGetCode, reqFindPassword } from '@/api/user';
import { ElMessage } from 'element-plus';
import { LoginFormData } from '@/api/user/type';
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import useStyleStore from '@/store/modules/style';
let scene = ref<number>(1)
let findPasswordParams = ref<LoginFormData>({
  username: '',
  password: '',
  code: '',
})
let time = ref<number>(5)
let $router = useRouter()
let styleStore = useStyleStore()
const getCode = async () => {
  let result: any = await reqGetCode(findPasswordParams.value.username);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "发送成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "发送失败",
    });
  }
};
const findPassword = async () => {
  let result: any = await reqFindPassword(findPasswordParams.value);
  if (result.code == 200) {
    scene.value = 3
  } else {
    ElMessage({
      type: "error",
      message: "失败",
    });
  }
}
const setFiveSecondInterval = () => {
  let timer = setInterval(() => {
    time.value--
    if (time.value == 0) {
      $router.push('/home')
      styleStore.whiteTabbar = false
      clearInterval(timer)
    }
  }, 1000)
}
watch(() => scene.value, (newValue) => {
  if (newValue == 3) {
    setFiveSecondInterval()
  }
})
</script>

<style scoped lang="scss">
.findpassword {
  .space {
    width: 100%;
    height: 64px;
  }
  .header {
    width: 100%;
    height: 134px;
    background: url(./顶部图片色块.png) repeat-x;

    .header-img {
      width: 1231px;
      height: 134px;
      margin: 0 auto;
      background: url(./找回密码顶部图片.png) no-repeat;
    }
  }

  .content {
    margin: 26px auto;
    width: 952px;

    .procedure1 {
      display: flex;
      align-items: center;
      font-weight: 400;

      .denglu {
        display: flex;
        align-items: center;
      }

      .wangjimima {
        font-weight: 400;
      }
    }

    .content2 {
      width: 100%;
      margin: 40px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .procedure2 {
        img {
          width: 500px;
        }
      }

      .form {
        width: 500px;
        margin: 40px auto;
      }
    }
  }
}
</style>
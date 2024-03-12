<template>
  <div class="tabbar" :class="styleStore.whiteTabbar ? 'tabbar1' : ''">
    <div class="left">
      <el-button text class="btn" @click="goHome">
        <img v-show="!styleStore.whiteTabbar" src="./images/B站.png"
          style="width: 24px; height: 24px; margin-right: 5px" />
        <img v-show="styleStore.whiteTabbar" src="./images/bilibili (1).png" style="width: 50px; margin: 0 20px" />
        <span>首页</span>
      </el-button>
      <el-button text class="btn" :style="`padding:8px ${styleStore.show ? '15px' : '5px'}`">
        <span>番剧</span>
      </el-button>
      <el-button @click="goLive" text class="btn" :style="`padding:8px ${styleStore.show ? '15px' : '5px'}`">
        <span>直播</span>
      </el-button>
      <el-button text class="btn" :style="`padding:8px ${styleStore.show ? '15px' : '5px'}`">
        <span>游戏中心</span>
      </el-button>
      <el-button text class="btn" :style="`padding:8px ${styleStore.show ? '15px' : '5px'}`">
        <span>会员购</span>
      </el-button>
      <el-button text class="btn" :style="`padding:8px ${styleStore.show ? '15px' : '5px'}`">
        <span>漫画</span>
      </el-button>
      <el-button text class="btn" :style="`padding:8px ${styleStore.show ? '15px' : '5px'}`">
        <span>赛事</span>
      </el-button>
      <el-button text class="btn">
        <img v-show="!styleStore.whiteTabbar" src="./images/下载.png" alt=""
          style="width: 24px; height: 24px; margin-right: 5px" />
        <img v-show="styleStore.whiteTabbar" src="./images/下载 (1).png" alt=""
          style="width: 24px; height: 24px; margin-right: 5px" />
        <span style="font-weight: 900">下载客户端</span>
      </el-button>
    </div>
    <div class="search">
      <el-input size="large" placeholder="请输入搜索内容" v-model="keyword" :suffix-icon="Search"
        style="width: 380px; background: rgba(222, 224, 230, 0.5)"></el-input>
    </div>
    <div class="right">
      <el-popover placement="top-start" :width="userStore.userName ? 320 : 350" trigger="hover">
        <template #reference>
          <div v-if="!userStore.userName" class="avatar">
            <span>登录</span>
          </div>
          <div v-else="userStore.userName" class="avatar avatar1" @click="goSpace" @mouseenter="handleMouseEnter">
            <img :src="userStore.userImage" alt="" style="width: 38px;height: 38px;border-radius: 50%;">
          </div>
        </template>
        <div v-show="!userStore.userName" class="unLogin">
          <div class="title">登录后你可以：</div>
          <div class="function-list" style="
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-columns: repeat(2, 1fr);
          ">
            <div class="item" style="display: flex; align-items: center">
              <img src="./images/高清.png" alt="" style="width: 20px; height: 20px; margin: 5px 0" />
              <span>免费看高清视频</span>
            </div>
            <div class="item" style="display: flex; align-items: center">
              <img src="./images/历史记录.png" alt="" style="width: 20px; height: 20px; margin: 5px 0" />
              <span>多端同步播放记录</span>
            </div>
            <div class="item" style="display: flex; align-items: center">
              <img src="./images/弹幕 (1).png" alt="" style="width: 18px; height: 15px; margin: 5px 0" />
              <span>发表弹幕/评论</span>
            </div>
            <div class="item" style="display: flex; align-items: center">
              <img src="./images/视频 (1).png" alt="" style="width: 20px; height: 20px; margin: 5px 0" />
              <span>热门番剧影视看不停</span>
            </div>
          </div>
          <el-button size="large" @click="showDialog(true)" style="
            width: 100%;
            background-color: #00aeec;
            color: white;
            border-radius: 10px;
            margin: 10px 5px;
          ">立即登录</el-button>
          <div style="display: flex; justify-content: center; align-items: center">
            首次使用？<el-button text style="color: #00aeec" @click="showDialog(false)">点我注册</el-button>
          </div>
        </div>
        <div v-show="userStore.userName" class="Login"
          style="width: 100%;display: flex;flex-direction: column;align-items: center;">
          <div class="name" style="color:black;font-size: 18px;margin: 5px auto;">{{ userStore.accountInfo.userName }}
          </div>
          <div class="coin">硬币:{{ userStore.accountInfo.coins }}</div>
          <div class="level">
            <div class="line"></div>
            <div class="span">
              当前成长{{ userStore.accountInfo.exp }}，距离升级Lv.{{ userStore.accountInfo.level + 1 }}还需要{{
    userStore.accountInfo.nextExp - userStore.accountInfo.exp }}
            </div>
          </div>
          <div class="nums" style="padding: 10px 20px;width: 100%;display: flex;justify-content: space-between;">
            <el-button :style="btnStyle" @click="goFollow">
              <div class="item" style="display: flex;flex-direction: column;align-items: center;">
                <div class="num" style="font-weight: 900;">{{ userStore.accountInfo.follows }}</div>
                <div class="itemname">关注</div>
              </div>
            </el-button>
            <el-button :style="btnStyle" @click="goFan">
              <div class="item" style="display: flex; flex-direction: column; align-items: center;">
                <div class="num" style="font-weight: 900;">{{ userStore.accountInfo.fans }}</div>
                <div class="itemname">粉丝</div>
              </div>
            </el-button>
            <el-button :style="btnStyle" @click="goDynamic">
              <div class="item" style="display: flex;flex-direction: column;align-items: center;">
                <div class="num" style="font-weight: 900;">{{ userStore.accountInfo.dongtais }}</div>
                <div class="itemname">动态</div>
              </div>
            </el-button>
          </div>
          <div class="button" style="width: 100%;">
            <el-button text icon="ArrowRight" style="width: 100%;padding: 0;" @click="goAccount">
              <div class="container"
                style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
                <div class="left" style="width: 100%;display: flex;align-items: center;">
                  <img src="./images/个人中心.png" alt="" style="width: 20px;margin-right: 5px;">
                  个人中心
                </div>
                <el-icon>
                  <ArrowRight />
                </el-icon>
              </div>
            </el-button>
            <el-button text icon="ArrowRight" style="width: 100%;padding: 0;margin-left: 0;" @click="goVideoManager">
              <div class="container"
                style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
                <div class="left" style="width: 100%;display: flex;align-items: center;">
                  <img src="./images/投稿管理.png" alt="" style="width: 20px;margin-right: 5px;">
                  投稿管理
                </div>
                <el-icon>
                  <ArrowRight />
                </el-icon>
              </div>
            </el-button>
            <el-button @click="userStore.userLogout()" text icon="ArrowRight"
              style="width: 100%;padding: 0;margin-left: 0;">
              <div class="container"
                style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
                <div class="left" style="width: 100%;display: flex;align-items: center;">
                  <img src="./images/退出登录.png" alt="" style="width: 20px;margin-right: 5px;">
                  退出登录
                </div>
                <el-icon>
                  <ArrowRight />
                </el-icon>
              </div>
            </el-button>
          </div>
        </div>
      </el-popover>
      <div class="tabbar-right-btn">
        <el-button text class="btn" :style="`padding:8px ${styleStore.show ? '25px' : '1px'}`">
          <template style="display: flex;flex-direction: column;align-items: center;">
            <img v-show="!styleStore.whiteTabbar" src="./images/我的大会员.png" alt="" />
            <img v-show="styleStore.whiteTabbar" src="./images/我的大会员 (1).png" alt="" />
            <span v-show="styleStore.show" style="margin-top: 2px;">大会员</span>
          </template>
        </el-button>
      </div>
      <div class="tabbar-right-btn">
        <el-popover placement="top-start" :width="userStore.userName ? 150 : 300" trigger="hover">
          <template #reference>
            <el-button text class="btn" :style="`padding:8px ${styleStore.show ? '25px' : '1px'}`">
              <template style="display: flex;flex-direction: column;align-items: center;">
                <img v-show="!styleStore.whiteTabbar" src="./images/消息通知.png" alt="" />
                <img v-show="styleStore.whiteTabbar" src="./images/消息通知 (1).png" alt="" />
                <span v-show="styleStore.show" style="margin-top: 2px;">消息</span>
              </template>
            </el-button>
          </template>
          <div class="unloginpopover" v-show="!userStore.userName"
            style="display: flex;flex-direction: column;align-items: center;">
            <span style="margin: 16px auto;">登录即可查看消息记录</span>
            <el-button @click="dialogFormVisible = true" color="#00AEEC"
              style="color: white;width: 100%;">立即登录</el-button>
          </div>
          <div class="unloginpopover" v-show="userStore.userName"
            style="display: flex;flex-direction: column;align-items: center;">
            <el-button text @click="dialogFormVisible = true" style="color: #888;width: 100%;">回复我的</el-button>
            <el-button text @click="dialogFormVisible = true" style="color: #888;width: 100%;">@我的</el-button>
            <el-button text @click="dialogFormVisible = true" style="color: #888;width: 100%;">收到的赞</el-button>
          </div>
        </el-popover>
      </div>
      <div class="tabbar-right-btn">
        <el-popover placement="top-start" :width="300" trigger="hover">
          <template #reference>
            <el-button text class="btn" :style="`padding:8px ${styleStore.show ? '25px' : '1px'}`">
              <template style="display: flex;flex-direction: column;align-items: center;">
                <img v-show="!styleStore.whiteTabbar" src="./images/风车.png" alt="" />
                <img v-show="styleStore.whiteTabbar" src="./images/windmill.png" alt="" />
                <span v-show="styleStore.show" style="margin-top: 2px;">动态</span>
              </template>
            </el-button>
          </template>
          <div class="unloginpopover" v-show="!userStore.userName"
            style="display: flex;flex-direction: column;align-items: center;">
            <span style="margin: 16px auto;">登录即可查看关注动态</span>
            <el-button @click="dialogFormVisible = true" color="#00AEEC"
              style="color: white;width: 100%;">立即登录</el-button>
          </div>
          <div class="unloginpopover" v-show="userStore.userName"
            style="display: flex;flex-direction: column;align-items: center;">
            <div class="title">历史动态</div>
            <button
              style="width: 100%;height: auto;padding: 0;border:0;text-align: left;background-color: transparent;cursor: pointer;">
              <div class="item" style="width:100%;display: flex;">
                <div class="left" style="margin-right: 5px;">
                  <img src="./images/头像.jpg" alt="" style="width: 30px;height: 30px;border-radius: 50%;">
                </div>
                <div class="right"
                  style="width: 100%;display: flex;flex-direction: column;justify-content: space-between;">
                  <div class="top" style="width: 100%;">
                    <div class="name" style="font-size: 13px;">大树音乐屋</div>
                  </div>
                  <div class="bottom" style="width: 100%;display: flex;justify-content: space-between;">
                    <div class="bottom-left">
                      <div class="title" style="font-size: 14px;margin-bottom: 2px;color: black;">实力距详解</div>
                      <div class="time" style="font-size: 12px;">19分钟前</div>
                    </div>
                    <div class="bottom-right">
                      <img src="./images/头像.jpg" alt="" style="width:80px;height:45px;">
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </el-popover>
      </div>
      <div class="tabbar-right-btn">
        <el-popover placement="top-start" :width="userStore.userName ? 500 : 300" trigger="hover">

          <template #reference>
            <el-button text class="btn" :style="`padding:8px ${styleStore.show ? '25px' : '1px'}`">
              <template style="display: flex;flex-direction: column;align-items: center;">
                <img v-show="!styleStore.whiteTabbar" src="./images/收藏.png" alt="" />
                <img v-show="styleStore.whiteTabbar" src="./images/收藏 (1).png" alt="" />
                <span v-show="styleStore.show" style="margin-top: 2px;">收藏</span>
              </template>
            </el-button>
          </template>
          <div class="unloginpopover" v-show="!userStore.userName"
            style="display: flex;flex-direction: column;align-items: center;">
            <span style="margin: 16px auto;">登录即可查看我的收藏</span>
            <el-button @click="dialogFormVisible = true" color="#00AEEC"
              style="color: white;width: 100%;">立即登录</el-button>
          </div>
          <div class="unloginpopover" v-show="userStore.userName">
            <el-row>
              <el-col :span="6">
                <el-scrollbar max-height="400px">
                  <el-menu :default-active="shoucangactive" class="el-menu-demo" @select="handleSelect">
                    <el-menu-item index="1">默认收藏夹</el-menu-item>
                    <el-menu-item index="2">电影</el-menu-item>
                  </el-menu>
                </el-scrollbar>
              </el-col>
              <el-col :span="18">
                <div class="items">
                  <el-scrollbar max-height="400px">
                    <el-button text style="width: auto;height: auto;">
                      <div class="item" style="width: 320px;height: 80px;display: flex;">
                        <div class="left" style="width: 120px;margin-right: 10px;">
                          <img src="./images/头像.jpg" alt="" style="height: 100%;width: 100%;">
                        </div>
                        <div class="right" style="display: flex;flex-direction: column;justify-content: space-between;">
                          <div class="title" style="font-size: 14px;color: black;">情人节礼物❤你的女友</div>
                          <div class="bottom" style="display: flex;align-items: center;">
                            <img src="./images/UP主 (1).png" alt="" style="width: 16px;height: 16px;margin-right: 5px;">
                            <span style="font-size: 12px;">-阿猫_</span>
                          </div>
                        </div>
                      </div>
                    </el-button>
                  </el-scrollbar>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-popover>
      </div>
      <div class="tabbar-right-btn">
        <el-popover placement="top-start" :width="userStore.userName ? 380 : 300" trigger="hover">
          <template #reference>
            <el-button text class="btn" :style="`padding:8px ${styleStore.show ? '25px' : '1px'}`">
              <template style="display: flex;flex-direction: column;align-items: center;">
                <img v-show="!styleStore.whiteTabbar" src="./images/消息记录.png" alt="" />
                <img v-show="styleStore.whiteTabbar" src="./images/消息记录 (1).png" alt="" />
                <span v-show="styleStore.show" style="margin-top: 2px;">历史</span>
              </template>
            </el-button>
          </template>
          <div class="unloginpopover" v-show="!userStore.userName"
            style="display: flex;flex-direction: column;align-items: center;">
            <span style="margin: 16px auto;">登录即可查看历史记录</span>
            <el-button @click="dialogFormVisible = true" color="#00AEEC"
              style="color: white;width: 100%;">立即登录</el-button>
          </div>
          <div class="unloginpopover" v-show="userStore.userName">
            <div class="items">
              <el-scrollbar max-height="400px">
                <el-button text style="width: auto;height: auto;text-align: left;">
                  <div class="item" style="width: 320px;height: 80px;display: flex;">
                    <div class="left" style="width: 120px;margin-right: 10px;">
                      <img src="./images/头像.jpg" alt="" style="height: 100%;width: 100%;">
                    </div>
                    <div class="right" style="display: flex;flex-direction: column;justify-content: space-between;">
                      <div class="title" style="font-size: 14px;color: black;">情人节礼物❤你的女友</div>
                      <div class="bottom">
                        <div class="time">今天22:47</div>
                        <div class="bottom-bottom">
                          <img src="./images/UP主 (1).png" alt="" style="width: 16px;height: 16px;margin-right: 5px;">
                          <span style="font-size: 12px;">-阿猫_</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-button>
              </el-scrollbar>
            </div>
          </div>
        </el-popover>
      </div>
      <div class="tabbar-right-btn">
        <el-button @click="goPlatform" text class="btn" :style="`padding:8px ${styleStore.show ? '25px' : '1px'}`">
          <template style="display: flex;flex-direction: column;align-items: center;">
            <img v-show="!styleStore.whiteTabbar" src="./images/电灯泡.png" style="width: 28px;height: 28px;" />
            <img v-show="styleStore.whiteTabbar" src="./images/电灯泡 (1).png" style="width: 28px;height: 28px;" />
            <span v-show="styleStore.show">创作中心</span>
          </template>
        </el-button>
      </div>
      <div>
        <el-button v-if="!isLive" @click="goPlatform" class="tougaobtn" style="
            height: 35px;
            border: 0;
            background-color: #fb7299;
            margin-left: 10px;
            margin-right: 20px;
          ">
          <img src="./images/上传.png" alt="" style="width: 24px; height: 24px" />
          <span v-show="styleStore.show" style="color: white">投稿</span>
        </el-button>
        <el-button @click="goMyLivingRoom" v-if="isLive" class="tougaobtn" style="
            height: 35px;
            border: 0;
            background-color: #fb7299;
            margin-left: 10px;
            margin-right: 20px;
            width: 100px;
          ">
          <img src="./images/开播.png" alt="" style="width: 24px; height: 24px;margin-right: 4px;" />
          <span v-show="styleStore.show" style="color: white">我要开播</span>
        </el-button>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" width="500" :show-close="true">

    <template #header>
      <div class="dialog-header">
        <div class="dialog-header-btn1">
          <el-button text :disabled="showLogin" :style="`color:${showLogin ? '#00AEEC' : 'black'}`"
            @click="showLogin = true">密码登录</el-button>
        </div>
        <div class="dialog-header-btn2">
          <el-button text :disabled="!showLogin" :style="`color:${!showLogin ? '#00AEEC' : 'black'}`"
            @click="showLogin = false">邮箱注册</el-button>
        </div>
      </div>
    </template>
    <el-form ref="loginForm" :model="LoginParams" :rules="rules" style="height: 150px">
      <el-form-item v-if="!showLogin" label="邮箱号" label-width="80px" prop="username">
        <el-input placeholder="请输入邮箱号" v-model="LoginParams.username">

          <template #append>
            <el-button text style="color: #00aeec" @click="getCode">获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item v-if="showLogin" label="邮箱号" label-width="80px" prop="username">
        <el-input placeholder="请输入邮箱号" v-model="LoginParams.username"></el-input>
      </el-form-item>

      <el-form-item v-if="!showLogin" label="验证码" label-width="80px" prop="code">
        <el-input placeholder="请输入验证码" v-model="LoginParams.code"></el-input>
      </el-form-item>

      <el-form-item v-if="showLogin" label="密码" label-width="80px" prop="password">
        <el-input type="password" :prefix-icon="Lock" placeholder="请输入密码" show-password v-model="LoginParams.password">

          <template #append>
            <el-button text :disabled="!showLogin" style="color: #00aeec" @click="goFindPassword">找回密码</el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item v-if="!showLogin" label="密码" label-width="80px" prop="password">
        <el-input type="password" :prefix-icon="Lock" placeholder="请输入密码" show-password
          v-model="LoginParams.password"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <div v-show="showLogin" class="dialog-footer" style="display: flex; justify-content: center; align-items: center">
        <el-button style="width: 40%" @click="showLogin = false">注册</el-button>
        <el-button color="#00AEEC" style="width: 40%; color: white" @click="login(true)">
          登录
        </el-button>
      </div>
      <div v-show="!showLogin" class="dialog-footer"
        style="display: flex; justify-content: center; align-items: center">
        <el-button color="#00AEEC" style="width: 75%; color: white" @click="register">
          登录/注册
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { ref, nextTick, onMounted, watch } from "vue";
import useStyleStore from "@/store/modules/style";
import { Lock } from "@element-plus/icons-vue";
import type { LoginFormData } from "@/api/user/type.ts";
import { reqRegister, reqGetCode } from "@/api/user";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/modules/user.ts";
import { ArrowRight } from "@element-plus/icons-vue";
let keyword = ref<string>("");
let styleStore = useStyleStore();
let dialogFormVisible = ref<boolean>(false);
let LoginParams = ref<LoginFormData>({
  username: "1328422274@qq.com",
  password: "",
  code: "",
});
let loginForm = ref<any>();
let showLogin = ref<boolean>(true);
let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();
let shoucangactive = ref<string>('1')
let btnStyle = ref<any>({
  '--el-button-text-color': 'black',
  '--el-button-hover-text-color': '#00AEEC',
  '--el-button-hover-bg-color': 'transparent',
  'border': 0,
})
let isLive = ref<boolean>(false)
window.onresize = () => {
  if (window.innerWidth < 1580) {
    styleStore.show = false;
  } else {
    styleStore.show = true;
  }
};
onMounted(() => {
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
  if ($route.path == '/live') {
    isLive.value = true
  } else {
    isLive.value
  }
});
const showDialog = (isLogin: boolean) => {
  nextTick(() => {
    loginForm.value.clearValidate("username");
    loginForm.value.clearValidate("password");
    loginForm.value.clearValidate("code");
  });
  Object.assign(LoginParams.value, {
    userName: "",
    password: "",
    code: "",
  });
  showLogin.value = isLogin;
  dialogFormVisible.value = true;
};
const validateUserName = (rule: any, value: any, callback: any) => {
  const regex = /^\d{5,11}@(qq|163|gmail)\.com$/;
  if (regex.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确格式的邮箱号"));
  }
};
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码至少六位"));
  }
};
const validateCode = (rule: any, value: any, callback: any) => {
  if (value.length == 4) {
    callback();
  } else {
    callback(new Error("验证码为四位字母或数字组合"));
  }
};
const rules = {
  username: [{ required: true, trigger: "change", validator: validateUserName }],
  password: [{ required: true, trigger: "change", validator: validatePassword }],
  code: [{ required: true, trigger: "change", validator: validateCode }],
};
const login = async (validate: boolean = true) => {
  if (validate == true) {
    await loginForm.value.validate();
  }
  try {
    await userStore.userLogin(LoginParams.value);
    ElMessage({
      type: "success",
      message: "登录成功",
    });
    dialogFormVisible.value = false
    userStore.userInfo()
    userStore.getAccountInfo()
  } catch (error) {
    ElMessage({
      type: "error",
      message: "登录失败",
    });
  }
};
const register = async () => {
  await loginForm.value.validate();
  let result: any = await reqRegister(LoginParams.value);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "注册成功",
    });
    LoginParams.value.code = '';
    login(false);
  } else {
    ElMessage({
      type: "error",
      message: "注册失败",
    });
  }
};
const getCode = async () => {
  let result: any = await reqGetCode(LoginParams.value.username);
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
const goFindPassword = () => {
  $router.push("/findPassword");
  styleStore.whiteTabbar = true
  dialogFormVisible.value = false
};
const goHome = () => {
  $router.push('/home')
  styleStore.whiteTabbar = false
}
const handleSelect = (key: string) => {
  shoucangactive.value = key
}
const goAccount = () => {
  $router.push('/account')
  styleStore.whiteTabbar = true
}
const goSpace = () => {
  $router.push('/space')
  styleStore.whiteTabbar = true
}
const handleMouseEnter = () => {
  userStore.getAccountInfo()
}
const goPlatform = () => {
  $router.push('/platform')
  styleStore.whiteTabbar = true
}
const goVideoManager = () => {
  $router.push('/platform/video-manager')
  styleStore.whiteTabbar = true
}
const goFollow = () => {
  $router.push('/space/fans/follow')
  styleStore.whiteTabbar = true
}
const goFan = () => {
  $router.push('/space/fans/fan')
  styleStore.whiteTabbar = true
}
const goDynamic = () => {
  $router.push('/space/dynamic')
  styleStore.whiteTabbar = true
}
const goLive = () => {
  $router.push('/live')
  styleStore.whiteTabbar = true
}
const goMyLivingRoom = () => {
  $router.push('/mylivingroom')
  styleStore.whiteTabbar = true
}
watch(() => $route.path, (newValue: string) => {
  if (newValue == '/live') {
    isLive.value = true
  } else {
    isLive.value = false
  }
})
</script>

<script lang="ts">
export default {
  name: "Tabbar",
};
</script>

<style scoped lang="scss">
@media (min-width: 1400px) {
  .tabbar {
    .right {
      .btn {
        width: 28px;
      }

      .tougaobtn {
        width: 54px;
      }
    }
  }
}

@media (min-width: 1445px) {
  .tabbar {
    .right {
      .btn {
        width: 35px;
      }

      .tougaobtn {
        width: 61px;
      }
    }
  }
}

@media (min-width: 1490px) {
  .tabbar {
    .right {
      .btn {
        width: 42px;
      }

      .tougaobtn {
        width: 68px;
      }
    }
  }
}

@media (min-width: 1535) {
  .tabbar {
    .right {
      .btn {
        width: 49px;
      }

      .tougaobtn {
        width: 75px;
      }
    }
  }
}

@media (min-width: 1580) {
  .tabbar {
    .right {
      .btn {
        width: 56px;
      }

      .tougaobtn {
        width: 82px;
      }
    }
  }
}


.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  .btn {
    color: white;
    font-weight: 900;
    margin-left: 0;
    background-color: transparent;

    &:hover {
      background-color: transparent;
      color: #ccc;
    }

    &:focus {
      background-color: transparent;
    }
  }


  .left {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  .search {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;

    .avatar {
      line-height: 35px;
      text-align: center;
      width: 35px;
      height: 35px;
      border: 1px;
      border-radius: 50%;
      background-color: #00aeec;
      margin: 0 5px;
      cursor: pointer;

      span {
        color: white;
        font-weight: 900;
        font-size: 14px;
      }
    }

    .avatar1 {
      background-color: transparent;
    }


    .tabbar-right-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 900;
      color: white;

      &:hover {
        cursor: pointer;
        background-color: transparent;
        color: #ccc;
      }

      img {
        width: 24px;
        height: 24px;
      }

    }

  }
}

.tabbar1 {
  background-color: white;

  .btn {
    color: black;
    font-weight: 900;
    margin-left: 0;

    &:hover {
      background-color: transparent;
      color: #ccc;
    }
  }

  .right {
    .tabbar-right-btn {
      color: black;
    }
  }

}

.dialog-header {
  display: flex;
  justify-content: center;
  margin: 20px 0;

  .dialog-header-btn1 {
    padding-right: 20px;
    border-right: 1px #ccc solid;
  }

  .dialog-header-btn2 {
    padding-left: 20px;
  }
}

.findpassword {
  cursor: pointer;
}
</style>

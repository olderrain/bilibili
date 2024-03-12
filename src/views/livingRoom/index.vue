<template>
  <div class="livingroom">
    <div class="space"></div>
    <div class="bg"></div>
    <div class="container">
      <div class="left">
        <div class="header">
          <div class="header-left">
            <div class="avatar">
              <img :src="enterData.userImage" style="width: 60px;height: 60px;border-radius: 50%;">
            </div>
            <div class="userinfo">
              <div class="name">
                <span style="margin-right: 20px;">{{ enterData.userName }}</span>
                <el-button size="small" color="#FA729A" style="color:white;">关注</el-button>
                <el-button size="small" style="background-color: white;">已关注</el-button>
              </div>
              <div class="title">{{ enterData.name }}</div>
            </div>
          </div>
          <div class="header-right">
            <div class="watch">
              <img src="./images/观看.png" style="width: 16px;height: 16px;">
              {{peopleNum}}人看过
            </div>
          </div>
        </div>
        <div class="video" ref="mask">
          <video id="my-video" class="video-js vjs-big-play-centered" x-webkit-airplay="allow" webkit-playsinline
            controls preload="auto" data-setup="{}" style="width: 100%;height: 100%;"></video>
        </div>
      </div>
      <div class="right">
        <div class="content"></div>
        <div class="input">
          <textarea ref="contentInput" type="text" placeholder="发个弹幕呗" style="border: 1px solid #ccc;width: 100%;" v-model="content"></textarea>
          <el-button @click="sendDanmu" size="small" color="#23ADE5" style="width: 80px;color: white;float: right;">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reqEnterLive } from '@/api/live';
import { enterLiveData, enterLiveResponseData } from '@/api/live/type';
import { ref, onMounted, reactive } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
let userStore=useUserStore()
let $route = useRoute()
let $router = useRouter()
let cid = ref<string>('')
let enterData: enterLiveData = reactive({
  "userId": 0,
  "userImage": '',
  "userName": '',
  "fans": 0,
  "name": '',
  "httpPullUrl": '',
  "hlsPullUrl": '',
  "rtmpPullUrl": ''
})
let wsData:any=null
let content=ref<string>('')
let mask=ref<any>(null)
let contentInput=ref<any>(null)
let peopleNum=ref<number>(0)
onMounted(async () => {
  cid.value = $route.params.cid as string
  await getEnterLive()
  initPlayer()
  connectWS()
})
const connectWS = () => {
  let ws = new WebSocket(`ws://${location.host}/socket/live/${cid.value}/${userStore.userId}`)
  ws.onopen = () => {
    // Web Socket 已连接上，使用 send() 方法发送数据
    // ws.send('Holle')
    console.log('socket连接中...')
    wsData = ws //这里将socket对象存在data中，以便在其他function中调用发送数据
  }
  ws.onmessage = evt => {
    let data = JSON.parse(evt.data)
    // console.log(data);
    if(data.type==1){
      peopleNum.value=data.content
    }
    if(data.type==3){
      appendDanmu(data.content.content)
    }
  }
  ws.onclose = function () {
    // 关闭 websocket
    console.log('连接已关闭...')
  }
  // 路由跳转时结束websocket链接
  $router.afterEach(function () {
    ws.close()
  })
}
const getEnterLive = async () => {
  let result: enterLiveResponseData = await reqEnterLive(cid.value)
  if (result.code == 200) {
    enterData = result.data
  }
}
const initPlayer = () => {
  const options = {
    controls: true,
    autoplay: true,
    errMsg7: '拉流超时 | 直播已结束', //CND拉流超时场景下：播放器拉流超时是的UI报错内容
    streamTimeoutTime: 30, //设置拉流超时时间，缺省30s
    techOrder: ['html5', 'flvjs'],
    decoderPath: '',//CDN拉流场景下，H265解码库的url
  };

  //创建播放器实例
  const videoDomID = 'my-video' //页面上video标签的id，要求页面唯一
  const myPlayer = neplayer(videoDomID, options, function () {
    console.log('播放器初始化完成: ', myPlayer)
    myPlayer.resize(1100,510)
  })
  const data = {
    type: 'application/x-mpegURL', //拉流协议为HTTP-FLV，改值为: 'video/x-flv'；拉流协议为HTTP-HLS，改值为: 'application/x-mpegURL'；拉流协议为NERTC低延迟直播，改值为: 'nertc'
    // src: 'nertc://xxxxxx.live.126.net/live/627d576c92124c7aa8767ea9e29a7c16',
    src: enterData.hlsPullUrl,
    // streamTimeoutTime: 20,//仅NERTC低延迟直播场景下，允许动态设置拉流的超时时间
    // isLive: true
  }
  myPlayer.setDataSource(data)
}
const appendDanmu = (message: string) => {
  let div = document.createElement('div')
  mask.value.append(div)
  div.innerHTML = message
  content.value = ''
  contentInput.value.focus()
  const random = Math.random() * (mask.value.offsetHeight - div.offsetHeight)
  div.style.right = '0px'
  div.style.top = random + 'px'
  div.style.position = 'absolute'
  div.style.color = 'white'
  div.style.transition = 'transform 3s linear'
  div.style.transform = `translateX(-${mask.value.offsetWidth}px)`
}
const sendDanmu = () => {
  wsData.send(JSON.stringify({type:2,content:content.value}))
  // appendDanmu(content.value)
}
</script>

<style scoped lang="scss">
.livingroom {

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
    width: 1400px;
    margin: 0 auto;
    position: relative;
    margin-top: 20px;
    display: flex;

    .left {
      width: 1100px;
      margin-right: 10px;
      background-color: white;
      border-radius: 10px;

      .header {
        height: 100px;
        padding: 17px;
        display: flex;
        justify-content: space-between;

        .header-left {
          display: flex;

          .avatar {
            margin-right: 20px;
          }

          .userinfo {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .name {
              font-size: 15px;
            }

            .title {
              font-size: 15px;
              color: #555;
            }
          }
        }

        .header-right {
          .watch {
            font-size: 13px;
            color: #888;
            display: flex;
            align-items: center;
          }
        }
      }

      .video {
        width: 1100px;
        height: 510px;
        background-color: black;
        position: relative;
      }
    }

    .right {
      width: 300px;
      height: 610px;
      background-color: white;
      border-radius: 10px;
      padding: 10px;

      .content {
        height: 520px;
      }

      .input {
        font-size: 13px;
        width: 100%;
      }
    }
  }
}
</style>
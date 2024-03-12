<template>
  <div class="outer">
    <div class="space"></div>
    <div class="content">
      <div class="left">
        <div class="header">
          <div class="title">{{ videoData.title }}</div>
          <div class="info">
            <div class="play-num">
              <img src="./images/视频 (2).png" style="width: 18px;height: 14px;margin-right: 4px;">
              <div>{{ videoData.plays }}</div>
            </div>
            <div class="danmu-num">
              <img src="./images/弹幕 (2).png" style="width: 18px;height: 14px;margin-right: 4px;">
              <div>{{ videoData.danmus }}</div>
            </div>
            <div class="time">{{ videoData.releaseTime }}</div>
            <div class="stop">
              <img src="./images/禁止、错误.png" style="width: 14px;height: 14px;margin-right: 4px;">
              <div>未经作者授权，禁止转载</div>
            </div>
          </div>
        </div>
        <div class="video" ref="mask">
          <video ref="video" :src="videoData.videoInfos[0].videoLink" :controls="true"></video>
          <!-- <div class="text"></div> -->
        </div>
        <div class="senddanmu">
          <div>{{ peopleNum }}人正在看，已装填{{ videoData.danmus }}条弹幕</div>
          <div class="senddanmu-right">
            <span style="margin-right: 4px;">弹幕开关</span>
            <el-switch style="margin-right: 10px;" v-model="value3" inline-prompt active-text="是" inactive-text="否" />
            <input :disabled="!value3" ref="danmuInput" placeholder="发个友善的弹幕见证当下"
              style="width: 400px;height: 28px;border: 1px solid #aaa;border-radius: 5px;"
              v-model="danmuContent"></input>
            <el-button :disabled="!value3" color="#00aeec" style="color: white;height: 28px;"
              @click="sendDanmu">发送</el-button>
          </div>
        </div>
        <div class="bottombtn">
          <div class="like btn" :class="like ? 'likebtn' : ''" @click="likeOrUnlikeVideo">
            <i class="iconfont icon-zan btnicon"></i>
            {{ videoData.likes }}
          </div>
          <div class="coin btn" @click="dialogCoinsVisible = true">
            <i class="iconfont icon-toubi btnicon"></i>
            {{ videoData.coins }}
          </div>
          <el-dialog v-model="dialogCoinsVisible" width="400">
            <div class="container" style="display: flex;align-items: center;flex-direction: column;">
              <div class="title" style="text-align:center;font-size: 16px;color: black;vertical-align: bottom;">
                给UP主投上<span style="color: #00aeec;font-size: 30px;">1</span>枚硬币</div>
              <div class="mc" style="display: flex;">
                <div :class="coinCount == 1 ? 'one-on' : 'one'" @click="coinCount = 1">
                  <div class="header">1硬币</div>
                  <div class="run-box">
                    <img class="coin-run" src="./images/22-coin-ani.png">
                  </div>
                </div>
                <div :class="coinCount == 2 ? 'two-on' : 'two'" @click="coinCount = 2">
                  <div class="header">2硬币</div>
                  <div class="run-box">
                    <img class="coin-run" src="./images/33-coin-ani.png">
                  </div>
                </div>
              </div>
              <div class="btn" @click="giveCoin" style="width: auto;display: flex;flex-direction: column;">
                <el-button color="#00aeec" style="color: white;margin-bottom: 10px;">确定</el-button>
                <div style="font-size: 12px;color: #888;">经验值+10 (今日20/50)</div>
              </div>
            </div>
          </el-dialog>
          <div class="collect btn">
            <i class="iconfont icon-shoucang1 btnicon"></i>
            {{ videoData.collects }}
          </div>
          <div class="forward btn">
            <i class="iconfont icon-zhuanfa btnicon"></i>
            {{ videoData.forwards }}
          </div>
        </div>
        <div class="descandtag">
          <div class="desc">{{ videoData.description }}</div>
          <div class="tag">
            <el-tag color="#eee" style="border-radius: 10px;margin-right: 10px;color: #555;"
              v-for="(tag, index) of videoData.tags" :key="tag">{{ tag }}</el-tag>
          </div>
        </div>
        <div class="mark">
          <div class="mark-header">
            <div class="title">
              <div style="font-size: 18px;font-weight: 600;margin-right: 10px;">评论</div>
              <div style="font-size: 13px;color: #888;">{{ videoData.marks }}</div>
            </div>
            <div class="sort">
              <div class="hot" :class="heat ? 'active' : ''" @click="chooseHeat(true)">最热</div>
              <div class="new" :class="!heat ? 'active' : ''" @click="chooseHeat(false)">最新</div>
            </div>
          </div>
          <div class="input">
            <div class="avatar">
              <img :src="userStore.userImage" style="width: 40px;height: 40px;border-radius: 50%;">
            </div>
            <div class="textarea">
              <el-input type="textarea" placeholder="进来跟UP唠会嗑吧" v-model="content"></el-input>
              <el-button @click="publishMark" class="btn" color="#00aeec" style="color: white;">发布</el-button>
            </div>
          </div>
          <div class="marklist">
            <div class="item" v-for="(mark, index) of marklist" :key="mark.markId">
              <div class="avatar">
                <img :src="mark.userImage" style="width: 40px;height: 40px;border-radius: 50%;">
              </div>
              <div class="container">
                <div class="name">{{ mark.userName }} Lv.{{ mark.level }}</div>
                <div class="content">
                  {{ mark.content }}</div>
                <div class="bottom">
                  <div class="time">{{ mark.time }}</div>
                  <div class="like">
                    <img v-if="!mark.like" @click="likeMark(mark.markId)" src="./images/赞.png"
                      style="width: 16px;height: 16px;">
                    <img v-if="mark.like" @click="unLikeMark(mark.markId)" src="./images/赞2.png"
                      style="width: 18px;height: 18px;">
                    {{ mark.likes }}
                  </div>
                  <div class="replybtn">
                    回复
                  </div>
                </div>
                <div class="replylist">
                  <div class="replyitem" v-for="(reply, index) of mark.replys" :key="reply.replyId">
                    <div class="avatar1">
                      <img :src="reply.userImage" style="width: 30px;height: 30px;border-radius: 50%;">
                    </div>
                    <div class="container1">
                      <div class="name1">{{ reply.userName }} Lv.{{ reply.level }}</div>
                      <div class="content1">
                        {{ reply.content }}
                      </div>
                      <div class="bottom1">
                        <div class="time1">{{ reply.time }}</div>
                        <div class="like1">
                          <img v-if="!reply.like" @click="likeReply(mark.markId, reply.replyId)" src="./images/赞.png"
                            style="width: 16px;height: 16px;">
                          <img v-if="reply.like" @click="unLikeReply(mark.markId, reply.replyId)" src="./images/赞2.png"
                            style="width: 18px;height: 18px;">
                          {{ reply.likes }}
                        </div>
                        <div class="replybtn1">
                          回复
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="upinfo">
          <div class="avatar">
            <img :src="videoData.userImage" style="width: 50px;height: 50px;border-radius: 50%;">
          </div>
          <div class="info">
            <div class="name">{{ videoData.userName }}</div>
            <div class="signature">{{ videoData.signature }}</div>
            <div class="followbtn">
              <el-button v-if="follow" class="followbtn1" style="background-color: #eee;" @click="handleUnfollow">已关注 {{
            videoData.fans }}</el-button>
              <el-button v-if="!follow" class="followbtn2" @click="handleFollow">关注 {{ videoData.fans }}</el-button>
            </div>
          </div>
        </div>
        <div class="nextplay">
          <div class="title">接下来播放</div>
          <div class="nextplaylist">
            <div class="item" v-for="(nextVideo, index) of rightlist" :key="nextVideo.videoId">
              <div class="coverimage" style="margin-right: 10px;">
                <img :src="nextVideo.coverImageLink" style="width: 140px;height: 80px;">
                <span class="videolength">{{ nextVideo.totalHours == 0 ? '' : nextVideo.totalHours + ':' }}{{
            nextVideo.totalMinutes >= 10 ? nextVideo.totalMinutes : '0' + nextVideo.totalMinutes + ':' }}{{
            nextVideo.totalSeconds >= 10 ? nextVideo.totalSeconds : '0' + nextVideo.totalSeconds }}</span>
              </div>
              <div class="videoinfo">
                <div class="name">{{ nextVideo.title }}</div>
                <div class="author">
                  <img src="./images/UP主 (1).png" style="width: 18px;height: 16px;margin-right: 4px;">
                  <span>{{ nextVideo.name }}</span>
                </div>
                <div class="playanddanmu">
                  <div class="play">
                    <img src="./images/视频 (2).png" style="width: 18px;height: 16px;margin-right: 4px;">
                    <span>{{ nextVideo.plays }}</span>
                  </div>
                  <div class="danmu">
                    <img src="./images/弹幕 (2).png" style="width: 18px;height: 16px;margin-right: 4px;">
                    <span>{{ nextVideo.marks }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reqFollow, reqUnfollow } from '@/api/user';
import { reqGiveCoins, reqHomePageVideo, reqLike, reqUnLike, reqVideo } from '@/api/video';
import type { VideoData, VideoResponseData, outerVideoData, outerVideoResponseData } from '@/api/video/type';
import { reqPublishMark, reqMarks, reqLikeMark, reqUnLikeMark, reqLikeReply, reqUnLikeReply } from '@/api/dynamic'
import type { markData, markResponseData } from '@/api/dynamic/type'
import { ElMessage } from 'element-plus';
import { ref, onMounted, reactive, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
let value3 = ref<boolean>(false)
let heat = ref<boolean>(true)
let videoId = ref<string>('')
let $route = useRoute()
let follow = ref<boolean>(true)
let videoData = ref<VideoData>({
  "userId": 0,
  "userName": "",
  "userImage": "",
  "signature": "",
  "fans": 0,
  "isFollowed": true,
  "releaseTime": "",
  "plays": 0,
  "marks": 0,
  danmus: 0,
  "title": "",
  "videoInfos": [
    {
      videoItemId: '',
      "videoLink": "",
      "videoTitle": "",
      "hours": 0,
      "minutes": 0,
      "seconds": 0
    }
  ],
  "likes": 0,
  "coins": 0,
  "collects": 0,
  "forwards": 0,
  "tags": [],
  "description": "",
  isLike: false
})
let pageNum = ref<number>(1)
let pageSize = ref<number>(10)
let marklist = ref<markData[]>([])
let dialogCoinsVisible = ref<boolean>(false)
let coinCount = ref<number>(1)
let like = ref<boolean>(false)
let content = ref<string>('')
let rightlist = ref<outerVideoData[]>([])
let danmuContent = ref<string>('')
let mask = ref<any>(null)
let danmuInput = ref<any>(null)
let video = ref<any>(null)
let timer: any = null
let wsData: any = null
let peopleNum = ref<number>(0)
let wsParams = reactive({
  seconds: 0,
  type: 0,
  content: ''
})
let paused = ref<boolean>(true)
let $router = useRouter()
onMounted(async () => {
  videoId.value = $route.params.videoId as string
  await getVideo()
  getMarks()
  getRight()
  if (video.value) {
    timer = setInterval(() => {
      wsParams.seconds = video.value.currentTime;
      paused.value = video.value.paused
      console.log(wsParams);
    }, 1000)
  }
  connectWS()
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
watch(() => wsParams.seconds, (newValue, oldValue) => {
  if (newValue - oldValue >= 2 || newValue - oldValue < 0) {
    wsParams.type = 3
    wsData.send(JSON.stringify(wsParams))
  }
})
watch(() => paused.value, (newValue, oldValue) => {
  if (newValue == true) {
    wsParams.type = 1
    wsData.send(JSON.stringify(wsParams))
  } else {
    wsParams.type = 2
    wsData.send(JSON.stringify(wsParams))
  }
})
const connectWS = () => {
  let ws = new WebSocket(`ws://${location.host}/socket/video/danmu/${userStore.userId}/${videoData.value.videoInfos[0].videoItemId}`)
  ws.onopen = () => {
    // Web Socket 已连接上，使用 send() 方法发送数据
    // ws.send('Holle')
    console.log('socket连接中...')
    wsData = ws //这里将socket对象存在data中，以便在其他function中调用发送数据
  }
  ws.onmessage = evt => {
    let data = JSON.parse(evt.data)
    console.log(data);

    if (data.type == 2) {
      peopleNum.value = data.message
    }
    if (value3.value) {
      if (data.type == 1) {
        appendDanmu(data.message)
      }
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
const getVideo = async () => {
  let result: VideoResponseData = await reqVideo(videoId.value)
  if (result.code == 200) {
    videoData.value = result.data
    follow.value = result.data.isFollowed
    like.value = videoData.value.isLike
  }
}
const getMarks = async () => {
  let result: markResponseData = await reqMarks({ parentId: videoId.value, pageNum: pageNum.value, pageSize: pageSize.value, heat: heat.value })
  if (result.code == 200) {
    marklist.value = result.data.record
    marklist.value.forEach((mark: any) => {
      mark.like = mark.isLike
      if (mark.replys) {
        mark.replys.forEach((reply: any) => {
          reply.like = reply.isLike
        })
      }
    })
  }
}
const getRight = async () => {
  let result: outerVideoResponseData = await reqHomePageVideo(1, 20)
  if (result.code == 200) {
    rightlist.value = result.data.record
  }
}
const chooseHeat = (flag: boolean) => {
  heat.value = flag
  getMarks()
}
const publishMark = async () => {
  let result: any = await reqPublishMark({ parentId: videoId.value, authorId: videoData.value.userId, fromType: 2, content: content.value })
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '发表评论成功'
    })
    getMarks()
  } else {
    ElMessage({
      type: 'error',
      message: '发表评论失败'
    })
  }
}
const handleFollow = async () => {
  let result: any = await reqFollow(videoData.value.userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '关注成功'
    })
    follow.value = true
    videoData.value.fans++
  } else {
    ElMessage({
      type: 'success',
      message: '关注失败'
    })
  }
}
const handleUnfollow = async () => {
  let result: any = await reqUnfollow(videoData.value.userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '取关成功'
    })
    follow.value = false
    videoData.value.fans--
  } else {
    ElMessage({
      type: 'success',
      message: '取关失败'
    })
  }
}
const likeMark = async (markId: string) => {
  try {
    await reqLikeMark(markId)
    ElMessage({
      type: 'success',
      message: '点赞成功'
    })
    marklist.value.forEach((mark: any) => {
      if (mark.markId == markId) {
        mark.like = true
        mark.likes++
      }
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '点赞失败'
    })
  }
}
const unLikeMark = async (markId: string) => {
  try {
    await reqUnLikeMark(markId)
    ElMessage({
      type: 'success',
      message: '取消成功'
    })
    marklist.value.forEach((mark: any) => {
      if (mark.markId == markId) {
        mark.like = false
        mark.likes--
      }
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '取消失败'
    })
  }
}
const likeReply = async (markId: string, replyId: string) => {
  try {
    await reqLikeReply(replyId)
    ElMessage({
      type: 'success',
      message: '点赞成功'
    })
    marklist.value.forEach((mark: any) => {
      if (mark.markId == markId) {
        if (mark.replys) {
          mark.replys.forEach((reply: any) => {
            if (reply.replyId == replyId) {
              reply.like = true
              reply.likes++
            }
          })
        }
      }
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '点赞失败'
    })
  }
}
const unLikeReply = async (markId: string, replyId: string) => {
  try {
    await reqUnLikeReply(replyId)
    ElMessage({
      type: 'success',
      message: '取消成功'
    })
    marklist.value.forEach((mark: any) => {
      if (mark.markId == markId) {
        if (mark.replys) {
          mark.replys.forEach((reply: any) => {
            if (reply.replyId == replyId) {
              reply.like = false
              reply.likes--
            }
          })
        }
      }
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '取消失败'
    })
  }
}
const giveCoin = async () => {
  let result: any = await reqGiveCoins(videoId.value, coinCount.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '投币成功'
    })
    dialogCoinsVisible.value = false
    videoData.value.coins += coinCount.value
  } else {
    ElMessage({
      type: 'error',
      message: '投币失败'
    })
  }
}
const likeVideo = async () => {
  try {
    await reqLike(videoId.value)
    ElMessage({
      type: 'success',
      message: '点赞成功'
    })
    like.value = true
    videoData.value.likes++
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '点赞失败'
    })
  }
}
const unlikeVideo = async () => {
  try {
    await reqUnLike(videoId.value)
    ElMessage({
      type: 'success',
      message: '取消成功'
    })
    like.value = false
    videoData.value.likes--
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '取消失败'
    })
  }
}
const likeOrUnlikeVideo = () => {
  if (like.value == true) {
    unlikeVideo()
  } else {
    likeVideo()
  }
}
const appendDanmu = (message: string) => {
  let div = document.createElement('div')
  mask.value.append(div)
  div.innerHTML = message
  danmuContent.value = ''
  danmuInput.value.focus()
  const random = Math.random() * (mask.value.offsetHeight - div.offsetHeight)
  div.style.right = '0px'
  div.style.top = random + 'px'
  div.style.position = 'absolute'
  div.style.color = 'white'
  div.style.transition = 'transform 3s linear'
  div.style.transform = `translateX(-${mask.value.offsetWidth}px)`
}
const sendDanmu = () => {
  if (danmuContent.value.trim() == '') {
    return
  }
  wsParams.type = 4
  wsParams.content = danmuContent.value
  wsData.send(JSON.stringify(wsParams))
  appendDanmu(danmuContent.value)
}
</script>

<style scoped lang="scss">
.outer {
  .space {
    height: 64px;
    width: 100%;
  }

  .content {
    margin: 0 auto;
    width: 1400px;
    display: flex;

    .left {
      width: 1000px;

      .header {
        padding-bottom: 20px;

        .title {
          font-size: 18px;
          padding: 20px 0;
        }

        .info {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #888;

          .play-num {
            display: flex;
            align-items: center;
            margin-right: 20px;

          }

          .danmu-num {
            display: flex;
            align-items: center;
            margin-right: 20px;
          }

          .time {
            margin-right: 20px;
          }

          .stop {
            display: flex;
            align-items: center;
            margin-right: 20px;
          }
        }
      }

      .video {
        width: 1000px;
        height: 550px;
        position: relative;

        video {
          width: 100%;
          height: 100%;
        }
      }

      .senddanmu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        color: #555;
        height: 32px;
        border: 1px solid #eee;
        padding: 4px 10px;

        .senddanmu-right {
          display: flex;
          align-items: center;
        }
      }

      .bottombtn {
        display: flex;
        color: #555;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #eee;

        .btn {
          cursor: pointer;
          width: 100px;
          font-size: 13px;
          display: flex;
          align-items: center;

          .btnicon {
            font-size: 24px;
            margin-right: 6px;
          }

          &:hover {
            color: #00aeec;
          }

        }

        .likebtn {
          color: #00aeec;
        }

        .container {
          .mc {
            .one {
              cursor: pointer;
              margin: 30px 20px;
              width: 160px;
              height: 230px;
              border: 2px dashed #eee;

              background: url('./images/22-coin.png') no-repeat center;
              background-size: 120px;
              position: relative;

              .header {
                color: #888;
              }

              .run-box {
                .coin-run {
                  opacity: 0;
                }
              }
            }

            .one-on {
              cursor: pointer;
              margin: 30px 20px;
              width: 160px;
              height: 230px;
              border: 2px solid #00aeec;

              .header {
                color: #00aeec;
              }
            }

            .two {
              cursor: pointer;
              margin: 30px 20px;
              width: 160px;
              height: 230px;
              border: 2px dashed #eee;

              background: url('./images/33-coin.png') no-repeat center;
              background-size: 120px;
              position: relative;

              .run-box {
                .coin-run {
                  opacity: 0;
                }
              }
            }

            .two-on {
              cursor: pointer;
              margin: 30px 20px;
              width: 160px;
              height: 230px;
              border: 2px solid #00aeec;

              .header {
                color: #00aeec;
              }
            }

            .header {
              margin: 10px;
              margin-bottom: 0;
              padding-bottom: 0;
            }

            .run-box {
              overflow: hidden;
              width: 120px;
              margin: 0 auto;

              .coin-run {
                height: 193px;
                animation: coin-run-animation 2s steps(23) infinite;
              }
            }

          }
        }
      }

      .descandtag {
        padding: 10px 0;
        border-bottom: 1px solid #eee;

        .desc {
          padding-bottom: 10px;
        }

        .tag {
          padding-bottom: 10px;
        }
      }

      .mark {
        .mark-header {
          display: flex;
          padding: 20px 0;
          align-items: center;

          .title {
            display: flex;
            align-items: center;
            margin-right: 30px;
          }

          .sort {
            display: flex;
            align-items: center;
            font-size: 13px;
            color: #888;

            .hot {
              padding-right: 10px;
              border-right: 1px solid #aaa;
              cursor: pointer;

              &:hover {
                color: #00aeec;
              }
            }

            .new {
              padding-left: 10px;
              cursor: pointer;

              &:hover {
                color: #00aeec;
              }
            }

            .active {
              color: black;
            }
          }
        }

        .input {
          display: flex;

          .avatar {
            margin-right: 20px;
          }

          .textarea {
            width: 100%;

            .btn {
              margin-top: 10px;
              float: right;
            }
          }
        }

        .marklist {
          .item {
            display: flex;
            width: 100%;
            margin: 10px 0;

            .avatar {
              margin-right: 20px;
            }

            .container {
              padding: 10px 0;
              width: 100%;

              .name {
                font-size: 13px;
                padding-bottom: 20px;
              }

              .content {
                font-size: 15px;
                line-height: 20px;
                width: 100%;
              }

              .bottom {
                display: flex;
                align-items: center;
                height: 20px;
                font-size: 13px;
                color: #888;

                .time {
                  margin-right: 20px;
                }

                .like {
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  margin-right: 20px;
                }

                .replybtn {
                  cursor: pointer;

                  &:hover {
                    color: #00aeec;
                  }
                }
              }

              .replylist {
                .replyitem {
                  display: flex;
                  width: 100%;
                  margin: 5px 0;

                  .avatar1 {
                    margin-right: 10px;
                  }

                  .container1 {
                    padding: 10px 0;
                    width: 100%;

                    .name1 {
                      font-size: 13px;
                      padding-bottom: 20px;
                    }

                    .content1 {
                      font-size: 15px;
                      line-height: 20px;
                      width: 100%;
                    }

                    .bottom1 {
                      display: flex;
                      align-items: center;
                      height: 20px;
                      font-size: 13px;
                      color: #888;

                      .time1 {
                        margin-right: 20px;
                      }

                      .like1 {
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        margin-right: 20px;
                      }

                      .replybtn1 {
                        cursor: pointer;

                        &:hover {
                          color: #00aeec;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .right {
      margin-left: 20px;
      width: 100%;

      .upinfo {
        display: flex;

        .avatar {
          margin-right: 10px;
        }

        .info {
          width: 100%;

          .name {
            font-size: 15px;
            margin-bottom: 5px;
          }

          .signature {
            font-size: 13px;
            color: #888;
            margin-bottom: 5px;
          }

          .followbtn {
            width: 100%;

            .followbtn1 {
              width: 100%;
            }

            .followbtn2 {
              width: 100%;
            }
          }
        }
      }

      .nextplay {
        margin-top: 22px;

        .title {
          font-size: 15px;
        }

        .nextplaylist {
          .item {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #eee;

            .coverimage {
              position: relative;

              span {
                position: absolute;
                right: 5px;
                bottom: 10px;
                background-color: rgba(0, 0, 0, 0.4);
                padding: 1px 2px;
                color: white;
                font-size: 13px;
              }
            }

            .videoinfo {
              .name {
                font-size: 15px;
                margin-bottom: 5px;
              }

              .author {
                font-size: 13px;
                color: #888;
                display: flex;
                align-items: center;
                margin-bottom: 5px;
              }

              .playanddanmu {
                display: flex;
                align-items: center;
                font-size: 13px;
                color: #888;

                .play {
                  margin-right: 10px;
                  display: flex;
                  align-items: center;
                }

                .danmu {
                  display: flex;
                  align-items: center;
                }
              }
            }
          }
        }
      }
    }
  }
}

@keyframes coin-run-animation {
  from {
    transform: translate3d(0px, 0, 0);
  }

  to {
    transform: translate3d(-2767px, 0, 0);
  }
}
</style>
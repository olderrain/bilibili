import { defineStore } from 'pinia'
import { reqAccountInfo, reqLogin, reqUserInfo } from '@/api/user/index.ts'
import { loginResponseData, LoginFormData, userInfoReponseData, accountInfoResponseData, accountInfo } from '@/api/user/type'
import { UserStore } from './types'
// import {useRouter} from 'vue-router'
// let $router=useRouter()
const useUserStore = defineStore('user', {
  state: (): UserStore => {
    return {
      token: localStorage.getItem('token'), //用户唯一标识token
      username: '',
      userName: '',
      userId: 0,
      userImage: "",
      signature: "",
      sexType: '',
      birthday: "",
      school: "",
      level: 0,
      exp: 0,
      follows: 0,
      fans: 0,
      likes: 0,
      plays: 0,
      coins: 0,
      collects: 0,
      published: 0,
      dongtais:0,
      accountInfo: {
        "userName": '',
        "userImage": '',
        "level": 0,
        "exp": 0,
        "nextExp": 0,
        "coins": 0,
        "follows": 0,
        "fans": 0,
        "dongtais": 0
      },
      notice:'',
    }
  },
  actions: {
    async userLogin(data: LoginFormData) {
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data
        //本地存储持久化存储一份
        localStorage.setItem('token', result.data)
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      const result: userInfoReponseData = await reqUserInfo()
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.userName = (result.data.userName as string)
        this.userId = (result.data.userId as number)
        this.userImage = (result.data.userImage as string)
        this.signature = (result.data.signature as string)
        this.sexType = (result.data.sexType as string)
        this.birthday = (result.data.birthday as string)
        this.school = (result.data.school as string)
        this.level = (result.data.level as number)
        this.exp = (result.data.exp as number)
        this.follows = (result.data.follows as number)
        this.fans = (result.data.fans as number)
        this.likes = (result.data.likes as number)
        this.plays = (result.data.plays as number)
        this.coins = (result.data.coins as number)
        this.collects = (result.data.collects as number)
        this.published = (result.data.published as number)
        this.dongtais = (result.data.dongtais as number)
        this.notice=(result.data.notice as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    userLogout() {
      this.token = ''
      this.username = ''
      this.userName = ''
      this.userId = 0
      this.userImage = ''
      this.signature = ''
      this.sexType = ''
      this.birthday = ''
      this.school = ''
      this.level = 0
      this.exp = 0
      this.follows = 0
      this.fans = 0
      this.likes = 0
      this.plays = 0
      this.coins = 0
      this.collects = 0
      this.published = 0
      localStorage.removeItem('token')
      // $router.push('/home')
    },
    async getAccountInfo() {
      let result: any = await reqAccountInfo()
      if (result.code == 200) {
        this.accountInfo = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  }
})
export default useUserStore
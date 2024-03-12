import router from '@/router'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token数据,去判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)
//全局守卫:项目当中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  //获取token,去判断用户登录、还是未登录
  const token = userStore.token
  //获取用户名字
  const userName = userStore.userName
  //用户登录判断
  if (token) {
    //登录成功访问其余六个路由(登录排除)
    //有用户信息
    if (userName) {
      //放行
      next()
    } else {
      //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
      try {
        //获取用户信息
        await userStore.userInfo()
        //放行
        //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
        next({ ...to })
      } catch (error) {
        //token过期:获取不到用户信息了
        //用户手动修改本地存储token
        //退出登录->用户相关的数据清空
        userStore.userLogout()
        next('/home')
      }
    }
  } else {
    userStore.userLogout()
    if (to.path == '/account/home') {
      next('/home')
    } else {
      next()
    }
  }
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})

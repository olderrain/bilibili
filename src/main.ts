import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/styles/index.scss'
import router from './router';
import pinia from './store';
import './permission.ts'
import '@/iconfont/font_4459883_w7bcvjlzt2e/iconfont.css'
import '@/iconfont/font_4459883_0i6ye7uktxc/iconfont.css'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)
app.use(pinia)

app.mount('#app')

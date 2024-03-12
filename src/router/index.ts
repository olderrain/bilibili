import {createRouter,createWebHistory} from 'vue-router'
import route from './route'
const router=createRouter({
  history:createWebHistory(),
  routes:route,
  scrollBehavior(){
    return {
      left:0,
      top:0
    }
  }
})
export default router
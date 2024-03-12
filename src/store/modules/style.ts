import {defineStore} from 'pinia'
import type { StyleStore } from './types'
const useStyleStore=defineStore('style',{
  state:():StyleStore=>{
    return {
      show:(window.innerWidth < 1580 ? false : true),
      whiteTabbar:false,
      isBottom:false,
    }
  },
  actions:{

  }
})
export default useStyleStore
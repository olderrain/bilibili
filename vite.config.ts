import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    }
  },
  //代理跨域
  server: {
    proxy: {
      '/api': {
        //获取数据的服务器地址设置
        target: 'http://4c703243.r18.cpolar.top',
        //需要代理跨域
        changeOrigin: true,
        //路径重写
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/socket': {
        //获取数据的服务器地址设置
        target: 'http://4c703243.r18.cpolar.top',
        ws:true,
        //需要代理跨域
        changeOrigin: true,
        //路径重写
        rewrite: (path) => path.replace(/^\/socket/, ''),
      },

    }
  }
})

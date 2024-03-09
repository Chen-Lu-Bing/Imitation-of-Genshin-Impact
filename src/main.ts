// 引入组件
import { createApp } from 'vue'
import ElementPlus from 'element-plus'//引入ui组件库
import zhCN from "element-plus/dist/locale/zh-cn.mjs" //引入中文
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'//引入icons组件库
import App from './App.vue'
import { createPinia } from 'pinia';//引入pinia
import router from './router/index'// router
import axios from 'axios'//引入axios
import './api/mock.ts'//引入mock数据
import * as echarts from 'echarts';
 
// 声明组件
const app = createApp(App)
app.config.warnHandler = () => null//关闭vue的警告提示
app.config.globalProperties.$echarts = echarts//把rcharts嵌入全局
const pinia = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 安装组件
app.use(pinia)
app.use(ElementPlus, {locale:zhCN})
app.use(router)
app.mount('#app')

// 创建一个路由器，并暴露出去

// 第一步：引入createRouter
import { createRouter, createWebHistory } from "vue-router";
// 引入可能要呈现组件
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import MallManage from "../views/MallManage.vue";
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";


// 第二步：创建路由器
const router = createRouter({
  history: createWebHistory(), //路由器的工作模式（稍后讲解）
  routes: [
    //一个一个的路由规则
    // 主路由
    {
      path: "/",
      component: Main,
      redirect: "/home",
      children: [
        { path: "home", component: Home },//首页
        { path: "user", component: User },//用户
        { path: "mall", component: MallManage },//商品管理
        { path: "page1", component: PageOne },//子页面1
        { path: "page2", component: PageTwo },//子页面2

      ],
    },
  ],
});

// 暴露出去router
export default router;
